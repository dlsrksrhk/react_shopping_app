// ProductPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { API_SERVER_DOMAIN } from "../contents";
import { Delete, Edit } from "@mui/icons-material";

type ProductType = {
  id: string;
  name: string;
  explanation: string;
  price: number;
  thumbnail?: string;
}

function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const handlePushPurchasePage = () => {
    navigate(`/purchase/${productId}`);
  };

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [productId]);

  if (!product) {
    return <h1>존재하지 않는 상품입니다.</h1>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {product?.thumbnail && <img src={`${API_SERVER_DOMAIN}/${product?.thumbnail}`} alt={product?.name} style={{ width: "100%", maxWidth: 400 }} />}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {product?.name}
        </Typography>
        <ButtonGroup orientation="horizontal">
          <Button variant="text" color="error" onClick={() => null}>
            <Delete />
          </Button>
          <Button variant="text" color="info" onClick={() => null}>
            <Edit />
          </Button>
        </ButtonGroup>
      </Box >

      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        {product?.price.toLocaleString('KO-kr')}원
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        {product?.explanation}
      </Typography>

      <ButtonGroup orientation="vertical" fullWidth>
        <Button variant="outlined">
          장바구니 담기기
        </Button>
        <Button variant="contained" onClick={handlePushPurchasePage}>
           구매하기
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ProductPage;
