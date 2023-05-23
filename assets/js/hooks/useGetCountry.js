import { useQuery } from "react-query"
import { fetch } from "../utils"


const getCountry = (name) => fetch({
    url: `remote/v1/country-states/${name}`,
    method: "GET"
})

const useGetCountry = (name) => {

    const { data, error, isLoading } = useQuery(["country", name], () => getCountry(name))

    return {
        data: data ? data?.data : null,
        error,
        isLoading
    }
}

export default useGetCountry;
