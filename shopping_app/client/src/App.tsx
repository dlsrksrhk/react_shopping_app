// App.tsx

import { useState } from "react";

interface ProductType {
  id: number
  name: string;
  explanation: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "키보드",
      explanation: "이것은 키보드입니다.",
      price: 10000
    }
  ]);

  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  console.log(products);

  return (
    <>
      <form onSubmit={
        (event) => {
          event.preventDefault();
          console.log(name, explanation, price);
          setProducts([
            ...products,
            {
              id: products.length,
              name: name,
              explanation: explanation,
              price: price
            }
          ]);
        }
      }>
        <input type="text" placeholder="상품명" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="상품설명" onChange={(e) => setExplanation(e.target.value)} />
        <input type="number" placeholder="상품가격" onChange={(e) => setPrice(parseInt(e.target.value)} />
        <button type="submit">상품 만들기</button>
      </form>

      {products.map((product) => (
        <div key={product.id}>
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.explanation}</div>
        </div>
      ))}
    </>
  );
}

export default App;
