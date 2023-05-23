import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useCart } from ".";
import { fetch } from '../utils'

export const fetcher = ({
    input: { itemId, cartId },
    options
}) => {
    return fetch({
        url: `/api/storefront/carts/${cartId}/items/${itemId}?include=lineItems.physicalItems.options`,
        method: "DELETE",
        options
    })
}

const useRemoveItem = (
    ctx = {}
) => {
    const { item } = ctx;
    const queryClient = useQueryClient()
    const { data: cart } = useCart()

    const removeItemFromCart = useMutation(({ input, options }) => fetcher({
        input,
        options
    }), {
        onSuccess: data => {
            queryClient.invalidateQueries("cart")
        }
    })

    if (cart) {
        const removeItem = useCallback(
            (input) => {
                const itemId = input?.id ?? item?.id
    
                if (!itemId) {
                    throw new Error('Invalid input used for this operation')
                }
    
                const data = removeItemFromCart.mutate({
                    input: {
                        itemId,
                        cartId: cart.id
                    }
                })
                return data
            },
            [removeItemFromCart]
        )

        return {
            removeItem,
            error: removeItemFromCart.error
        }
    }
}

export default useRemoveItem;
