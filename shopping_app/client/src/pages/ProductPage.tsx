// ProductPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { API_SERVER_DOMAIN } from "../contents";
import { Delete, Edit } from "@mui/icons-material";
import { ProductType } from "../types";
import { useCookies } from "react-cookie";


function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [cookies, setCookies] = useCookies(['cart']);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const cartItems = cookies.cart as ProductType[];

  const handleAddCart = () => {
    const nextValue = cartItems ? [...cartItems, product] : [product];
    setCookies("cart", nextValue, { path: "/" });
    setIsCartModalOpen(true);
  }

  const handlePushCartPage = () => {
    navigate('/cart');
  }


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
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          {product?.thumbnail && <img src={`${API_SERVER_DOMAIN}/${product?.thumbnail}`} alt={product?.name} style={{ width: "100%", maxWidth: 400 }} />}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {product?.name}
          </Typography>
          <ButtonGroup orientation="horizontal">
            <Button variant="text" color="error" onClick={() => setIsDeleteModalOpen(true)}>
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
          <Button variant="outlined" onClick={handleAddCart}>
            장바구니 담기
          </Button>
          <Button variant="contained" onClick={handlePushPurchasePage}>
            구매하기
          </Button>
        </ButtonGroup>
      </Container>

      {/* 상품 삭제 모달 */}
      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          상품 정말로 삭제하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>
            아니요
          </Button>
          <Button autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>

      {/* 장바구니 모달 */}
      <Dialog open={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          장바구니에 성공적으로 추가했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            장바구니 페이지로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCartModalOpen(false)}>
            아니요
          </Button>
          <Button autoFocus onClick={handlePushCartPage}>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductPage;
