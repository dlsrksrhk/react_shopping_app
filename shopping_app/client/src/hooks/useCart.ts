import { useCookies } from "react-cookie";
import { ProductType } from "../types";
import { useEffect, useMemo, useState } from "react";

type CartType = ProductType & { count: number };

const COOKIE_KEY = 'cart';
const useCart = () => {
    const [cookies, setCookies] = useCookies([COOKIE_KEY]);
    const [carts, setCarts] = useState<CartType[]>([]);
    const productIds = useMemo(() => (cookies[COOKIE_KEY] as string[]) ?? [], [cookies]);


    const changeCount = (productId: string, mode: "increase" | "decrease") => {
        const index = productIds.indexOf(productId);
        if (index === -1) {
            return;
        }

        if (mode === "decrease") {
            const tempArr = [...productIds];
            tempArr.splice(index, 1);

            //1개 미만으로 떨어지지 않게 하기위한 방어코드드
            if (!tempArr.includes(productId)) {
                return;
            }

            setCookies(COOKIE_KEY, tempArr, { path: '/' });
        }

        if (mode === "increase") {
            setCookies(COOKIE_KEY, [...productIds, productId], { path: '/' });
        }
    }

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

    return { carts, addCarts, changeCount };
}

export default useCart;