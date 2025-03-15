// App.tsx

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


interface ProductType {
  id: string;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: string) => void;
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
    <div>
      <div>{id}</div>
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
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
  const [products, setProducts] = useState<ProductType[]>([]);

  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  console.log(products);

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
        setProducts((prevArray) => [...prevArray, data.product]);
      });
  };

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

    setProducts(products.map((product) => {
      if (product.id === updateProduct.id) {
        return updateProduct;
      }

      return product;
    }));
  };

  useEffect(() => {
    fetch("/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

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
