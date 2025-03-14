// App.tsx

import { useRef, useState } from "react";

interface ProductType {
  id: number
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

function ProductItem({
  product,
  onDelete,
  onUpdate
}: ProductItemProps) {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editExplanation, setEditExplanation] = useState(explanation);
  const [editPrice, setEditPrice] = useState(price);

  return (
    <div key={id}>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>
      <button
        type="button"
        onClick={() => onDelete(id)}
      >
        삭제하기
      </button>
      <button
        type="button"
        onClick={() => setIsEditMode((prev) => !prev)}
      >
        수정하기
      </button>

      {isEditMode && (
        <form onSubmit={
          (event) => {
            event.preventDefault();
            onUpdate({
              id,
              name: editName,
              explanation: editExplanation,
              price: editPrice
            });
            setIsEditMode(false);
          }
        }>
          <input type="text" placeholder="변경 상품 이름" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input type="text" placeholder="변경 상품 설명" value={editExplanation} onChange={(e) => setEditExplanation(e.target.value)} />
          <input type="number" placeholder="변경 상품 가격" value={editPrice} onChange={(e) => setEditPrice(parseInt(e.target.value))} />
          <button type="submit">수정 완료</button>
        </form>
      )}
    </div>
  );
}

function HomePage() {
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

  const fakeId = useRef(0);
  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    setProducts([
      ...products,
      {
        ...newProduct,
        id: fakeId.current
      }
    ]);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdate = (updateProduct: {
    id: number;
    name: string;
    explanation: string;
    price: number;
  }) => {
    setProducts(products.map((product) => {
      if (product.id === updateProduct.id) {
        return updateProduct;
      }

      return product;
    }));
  };

  return (
    <>
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

      {products.map((product) => (
        <ProductItem key={product.id} product={product} onDelete={handleDelete} onUpdate={handleUpdate} />
      ))}
    </>
  );
}

export default HomePage;
