import { useCallback } from "react"
import { useMutation, useQueryClient } from "react-query"
import { fetch } from '../utils'

const fetcher = ({
    input: { firstName, lastName, email, password },
    options
}) => {
    
    if (!(email && password)) {
        throw new Error("Credentials must be provided")
    }

    return fetch({
        url: "/api/storefront/customers",
        method: "POST",
        body: {
            firstName,
            lastName,
            email,
            password
        }

    })

}

const useSignUp = () => {

    const queryClient = useQueryClient()
    const { error, isLoading, mutate } = useMutation(
        ({input, options}) => fetcher({input, options}), {
            onSuccess: (data) => {
                queryClient.invalidateQueries("customer")
            }
        }
    )

    const signup = useCallback(
        (input) => {
            const data = mutate({
                input
            })

            return data;
        },
        [fetcher, mutate]
    )

    return {
        signup,
        error,
        isLoading
        
    }
}

export default useSignUp;
