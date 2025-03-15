// ProductPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";

type ProductType = {
  id: string;
  name: string;
  explanation: string;
  price: number;
}

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
   }, [productId]);

   if(!product) {
      return <h1>존재하지 않는 상품입니다.</h1>;
    }

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.explanation}</p>
      <span>{product?.price}</span>
    </div>
  );
}

export default ProductPage;
