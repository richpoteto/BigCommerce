import { useQuery } from "react-query";
import { useUI } from "../components/UI/UIContext";
import { fetch } from "../utils";

const getSearch = ({
    token,
    searchTerm,
}) => fetch({
    url: "/graphql",
    method: "POST",
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: {
        query: `
            query {
                site {
                    search {
                        searchProducts (filters: {
                            searchTerm: "${searchTerm}"
                        }) {
                            products {
                                edges {
                                    node {
                                        name
                                        path
                                        entityId
                                        defaultImage{
                                            url(width: 100, height: 100)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    }
})

const useSearch = (searchTerm, condition) => {
    const { token } = useUI();

    const { data, error, isLoading } = useQuery(["search", searchTerm, condition], () => {
        if (condition) {
            return getSearch({
                token,
                searchTerm
            })
        }
    })

    return {
        data: data ? normalizeData(data) : null,
        error,
        isLoading
    }
}

const normalizeData = ({ data }) => {
    const products = data?.site?.search?.searchProducts?.products?.edges

    return products.map(({node}) => node)
}

export default useSearch;
