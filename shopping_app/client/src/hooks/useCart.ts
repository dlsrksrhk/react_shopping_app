import { useCookies } from "react-cookie";
import { ProductType } from "../types";
import { useEffect, useMemo, useState } from "react";
import { count } from "console";

type CartType = ProductType & { count: number };

const COOKIE_KEY = 'cart';
const useCart = () => {
    const [cookies, setCookies] = useCookies([COOKIE_KEY]);
    const [carts, setCarts] = useState<CartType[]>([]);
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
            const requestIds = productIds.reduce((val, curr) => {
                var countByProductId = (val.get(curr) || 0) + 1;
                return val.set(curr, countByProductId);
            }, new Map<string, number>);

            Array.from(requestIds.keys()).forEach((id) => {
                requestList.push(getProductById(id));
            });

            Promise
                .all(requestList)
                .then((resList) => {
                    const cartsData: CartType[] = resList.map((res) => {
                        return {
                            ...res.product,
                            count: requestIds.get(res.product.id)
                        };
                    });
                    setCarts(cartsData);
                });
        }
    }, [productIds]);

    return { carts, addCarts };
}

export default useCart;