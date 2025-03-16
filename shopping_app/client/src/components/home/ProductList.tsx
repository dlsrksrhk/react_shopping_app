// ProductList.tsx

import { useEffect, useState } from "react";
import { ProductType } from "../../types";
import { ProductItem } from ".";
import { CircularProgress } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    fetch(`/product/${id}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };

  const handleUpdate = (updateProduct: ProductType) => {
    fetch(`/product/${updateProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateProduct)
    }).then((res) => {
      if (res.ok) {
        setProducts(products.map(
          (product) => {
            if (product.id === updateProduct.id) {
              return updateProduct;
            }

            return product;
          }
        ));
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);

    fetch("/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate} />
      ))}
    </ul>
  );
};

export default ProductList;