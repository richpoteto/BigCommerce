import { useQuery } from "react-query"
import { fetch } from '../utils'


const getCustomer = (token) => fetch({
    url: "/graphql",
    headers: {
        'Authorization': `Bearer ${token}`
    },
    method: "POST",
    body: {
        query: `
        query {
            customer{
              email
              entityId
            }
          }
        `
    }
})

const useCustomer = (token) => {

    const { isLoading, error, data, refetch } = useQuery(["customer", token], () => getCustomer(token))

    return {
        data: data ? data?.data?.customer : null,
        isLoading,
        error,
        refetch
    }
}

export default useCustomer;
