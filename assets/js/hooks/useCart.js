import { useEffect, useMemo } from "react"
import { useQuery } from "react-query"
import * as $ from 'jquery';


const getCart =  _ =>  fetch("/api/storefront/carts?include=lineItems.physicalItems.options").then(res => res.json()).then(data => data[0])

const useCart = () => {

    const response = useQuery("cart", getCart, {
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        const $body = $('body');

        $body.on('cart-quantity-update', (event, quantity) => {
            response.refetch()
        })
        
        return () => {
            $body.off("cart-quantity-update", () => {
                response.refetch()
            })
        }
    }, [])

    return useMemo(
        () => 
            Object.create(response, {
                isEmpty: {
                    get() {
                        if (!response.data){
                            return true
                        }
                        return false
                    }
                }
            }),
            [response]
    )
}

export default useCart;
