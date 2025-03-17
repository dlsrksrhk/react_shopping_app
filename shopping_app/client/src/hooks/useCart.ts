import { useCookies } from "react-cookie";
import { ProductType } from "../types";
import { useEffect, useMemo, useState } from "react";

const COOKIE_KEY = 'cart';
const useCart = () => {
    const [cookies, setCookies] = useCookies([COOKIE_KEY]);
    const [carts, setCarts] = useState<ProductType[]>([]);
    const productIds = useMemo(() => (cookies[COOKIE_KEY] as string[]) ?? [], [cookies]);

    const addCarts = (id: string) => {
        const nextCartIds = [...productIds, id];
        setCookies(COOKIE_KEY, nextCartIds, { path: '/' });
    }

    const getProductById = (id: string) => {
        return fetch(`/product/${id}`)
            .then((res) => res.json());
    }

    useEffect(() => {
        if (productIds && productIds.length > 0) {
            const requestList: Array<Promise<any>> = [];
            productIds.forEach((id) => {
                requestList.push(getProductById(id));
            });

            Promise
                .all(requestList)
                .then((res) => {
                    const cartList: ProductType[] = res.map((item) => item.product);
                    setCarts(cartList);
                });
        }
    }, [productIds]);

    return { carts, addCarts };
}

export default useCart;