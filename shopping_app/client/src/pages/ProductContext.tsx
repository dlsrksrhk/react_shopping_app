import { createContext, useContext, useState } from "react";

interface ProductType {
  id: number
  name: string;
  explanation: string;
  price: number;
}

type ProductContextType = [
  ProductType[],
  React.Dispatch<React.SetStateAction<ProductType[]>>
];


const ProductContext = createContext<ProductContextType | null>(null);

const initialValue: ProductType[] = [
  {
    id: 0,
    name: "키보드",
    explanation: "이것은 키보드입니다.",
    price: 10000
  }
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const productState = useState<ProductType[]>(initialValue);

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );

}

export function useProductContext() {
  return useContext(ProductContext) as ProductContextType;
}