// ProductCreateForm.tsx

import { useState } from "react";
import { ProductType } from "../../types";
import { Button, Container, TextField, Typography } from "@mui/material";
import ThumbnailUploader from "./ThumbnailUploader";

const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  }

  const handleExplanationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExplanation(e.target.value);
  }

  const uploadThumbnailRequest = (productId: string, thumbnail: File) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    return fetch(`/product/thumbnail/${productId}`, {
      method: "PATCH",
      body: formData
    });
  };

  const createProductRequest = (newProduct: Omit<ProductType, "id">) => {
    return fetch(`/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await createProductRequest({
      name,
      explanation,
      price
    });

    const data = await response.json();

    if (thumbnail) {
      await uploadThumbnailRequest(data.product.id, thumbnail);
    }

  };

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          상품 생성
        </Typography>
        <form onSubmit={handleCreateProduct}>
          <TextField label="상품명" fullWidth value={name} margin="normal" onChange={handleNameChange} />
          <TextField label="상품 가격" fullWidth value={price} margin="normal" onChange={handlePriceChange} />
          <TextField label="상품 설명" fullWidth multiline rows={4} value={explanation} margin="normal" onChange={handleExplanationChange} />
          <ThumbnailUploader value={thumbnail} onChange={(file) => setThumbnail(file)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 6 }}>생성</Button>
        </form>
      </Container>
    </>
  );
}

export default ProductCreateForm;