import { useCookies } from "react-cookie";
import { ProductType } from "../types";

const COOKIE_KEY = 'cart';
const useCart = () => {
    const [cookies, setCookies] = useCookies([COOKIE_KEY]);
    const cart = cookies.cart as ProductType[] ?? [];

    const addCart = (newCart: ProductType | ProductType[]) => {
        const nextCart = newCart instanceof Array ? [...cart, newCart] : [newCart];

        setCookies(COOKIE_KEY, nextCart, { path: '/' });
    }

    return { cart, addCart };
}

export default useCart;