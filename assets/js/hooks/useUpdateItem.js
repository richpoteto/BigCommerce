import { useCallback, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useCart } from "."
import { fetch } from '../utils'
import { fetcher as removeFetcher } from "./useRemoveItem"

const fetcher = ({
    input: { itemId, item, cartId },
    options,
}) => {
    if (Number.isInteger(item.quantity)) {
        if (item.quantity < 1){
            return removeFetcher({
                input: {
                    itemId,
                    cartId
                }
            })
        }
    } else if (item.quantity) {
        throw new Error("Item quantity has to be valid")
    }


    return fetch({
        url: `/api/storefront/carts/${cartId}/items/${itemId}?include=lineItems.physicalItems.options`,
        method: "PUT",
        body: {
            lineItem: {
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity
            }
        },
        options
    })
}

const useUpdateItem = (
    ctx = {}
) => {
    const queryClient = useQueryClient()
    const { item } = ctx;
    const { data: cart } = useCart()


    const { mutate, error } = useMutation(({input, options}) => fetcher({
        input,
        options
    }), {
        onSuccess: data => {
            queryClient.refetchQueries("cart")
        }
    })

    
    if (cart) {
        const updateItem = useCallback(
            (input) => {
                const itemId = input.id ?? item?.id
                const productId = input.productId ?? item?.productId
                const variantId = input.productId ?? item?.variantId
    
                if (!itemId || !productId || !variantId) {
                    throw new Error('Invalid input used for this operation')
                }
    
                const data = mutate({
                    input: {
                        itemId,
                        item: { productId, variantId, quantity: input.quantity },
                        cartId: cart.id
                    }
                })
    
                return data;
    
            },
            [mutate]
        )
    
        return {
            updateItem,
            error: error
        }
    }
}


export default useUpdateItem;
