// ProductCreateForm.tsx

import { useState } from "react";
import { ProductType } from "../../types";

const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fetch(`/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form onSubmit={
      (event) => {
        event.preventDefault();
        console.log(name, explanation, price);
        handleCreate({ name, explanation, price });
      }
    }>
      <input type="text" placeholder="상품명" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="상품설명" onChange={(e) => setExplanation(e.target.value)} />
      <input type="number" placeholder="상품가격" onChange={(e) => setPrice(parseInt(e.target.value))} />
      <button type="submit">상품 만들기</button>
    </form>
  );
}

export default ProductCreateForm;