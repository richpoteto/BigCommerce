import { useCallback } from "react"
import { useMutation } from "react-query"
import { useCart } from ".."
import { fetch } from "../../utils"

const fetcher = ({
    input: {
        firstName,
        lastName,
        email,
        company,
        address1,
        city,
        stateOrProvinceCode,
        countryCode,
        postalCode,
        checkoutId,
        lineItems
    }
}) => {
    return fetch({
        url: `/api/storefront/checkouts/${checkoutId}/consignments`,
        method: "POST",
        body: [
            {
                shippingAddress: {
                    firstName,
                    lastName,
                    email,
                    company,
                    address1,
                    city,
                    stateOrProvinceCode,
                    countryCode,
                    postalCode
                },
                lineItems
            }
        ]
    })
}

const useCreateConsignment = (
    ctx = {}
) => {
    const { data: cart } = useCart()
    
    const { mutate, error } = useMutation(
        ({input, options}) => fetcher({
            input,
            options
        })
    )

    if (cart) {
        const createConsignment = useCallback(
            (input) => {
                const data = mutate({
                    input: {
                        ...input,
                        checkoutId: cart.id,
                        lineItems: 
                        ["customItems", "digitalItems", "giftCertificates", "physicalItems"]
                        .flatMap(key =>
                            cart.lineItems[key].map(item => ({
                                itemId: item.id,
                                quantity: item.quantity
                            }))    
                        )
                    }
                })

                return data;
            },
            [mutate, cart]
        )

        return {
            createConsignment,
            error
        }
    }
}

export default useCreateConsignment;
