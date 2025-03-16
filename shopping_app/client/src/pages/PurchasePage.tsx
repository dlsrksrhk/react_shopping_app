// PurchasePage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { API_SERVER_DOMAIN } from "../contents";
import { ProductType } from "../types";
import { PurchaseForm } from "../components/purchase";

type ParamsType = {
  productId: string;
}

function PurchasePage() {
  const navigate = useNavigate();
  const { productId } = useParams<ParamsType>();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [productId]);

  if (!product) {
    return <h1>존재하지 않는 상품입니다.</h1>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        구매하기
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ display: 'flex', marginBottom: 2 }}>
            {product?.thumbnail && <CardMedia image={`${API_SERVER_DOMAIN}/${product?.thumbnail}`} sx={{ height: 100, width: 100, marginRight: 2 }} title="Product" />}
            <CardContent>
              <Typography variant="h6">{product?.name}</Typography>
            </CardContent>
          </Card>
          <PurchaseForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default PurchasePage;
