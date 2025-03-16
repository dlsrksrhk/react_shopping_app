// ProductList.tsx

import { useEffect, useState } from "react";
import { ProductType } from "../../types";
import { Link } from "react-router-dom";

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
      {product.thumbnail && (<img src={product.thumbnail} />)}
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

export default ProductItem;