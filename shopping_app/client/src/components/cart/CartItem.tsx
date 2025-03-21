// CartItem.tsx
import { ProductType } from "../../types";
import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { API_SERVER_DOMAIN } from "../../contents";
import { grey } from "@mui/material/colors";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useCart } from "../../hooks";

type Props = {
  cart: ProductType & { count: number };
}

function CartItem({ cart }: Props) {
  const {changeCount} = useCart();

  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      {cart.thumbnail && (<CardMedia image={`${API_SERVER_DOMAIN}/${cart.thumbnail?.replace(/\\/g, "/")}`} sx={{ width:120 }} title={cart.name} />)}

      <CardContent sx={{ width: '100%' }}>
        <Typography variant="h6">
          {cart.name}
        </Typography>
        <Typography variant="h6" fontSize={14} color={grey[600]}>
          {cart.price.toLocaleString('ko-KR')}원
        </Typography>

        <Grid container justifyContent="space-between">
          <Grid item>
            <IconButton onClick={() => changeCount(cart.id, "decrease")}><Remove /></IconButton>
            {cart.count}
            <IconButton onClick={() => changeCount(cart.id, "increase")}><Add /></IconButton>
          </Grid>
          <Grid item>
            <IconButton><Delete /></IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CartItem;