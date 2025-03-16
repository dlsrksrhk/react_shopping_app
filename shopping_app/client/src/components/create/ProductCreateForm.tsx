// ProductCreateForm.tsx

import { useState } from "react";
import { ProductType } from "../../types";
import { Button, Container, TextField, Typography } from "@mui/material";

const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  }

  const handleExplanationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExplanation(e.target.value);
  }

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Omit<ProductType, "id"> = {
      name,
      explanation,
      price
    };

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
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          상품 생성
        </Typography>
        <form onSubmit={handleCreate}>
          <TextField label="상품명" fullWidth value={name} margin="normal" onChange={handleNameChange} />
          <TextField label="상품 가격" fullWidth value={price} margin="normal" onChange={handlePriceChange} />
          <TextField label="상품 설명" fullWidth multiline rows={4} value={explanation} margin="normal" onChange={handleExplanationChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 6 }}>생성</Button>
        </form>
      </Container>
    </>
  );
}

export default ProductCreateForm;