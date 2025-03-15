// ProductPage.tsx
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductContext } from "./ProductContext";

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [products] = useProductContext();
  const foundProduct = products.find((product) => product.id === parseInt(productId!, 10));

  if (!foundProduct) {
    return <h1>상품을 찾을 수 없습니다.</h1>;
  }

  return (
    <div>
      <h1>{foundProduct?.name}</h1>
      <p>{foundProduct?.explanation}</p>
      <span>{foundProduct?.price}</span>
    </div>
  );
}

export default ProductPage;
