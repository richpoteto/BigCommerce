const fetcher = ({
    url,
    method = "GET",
    body,
    options,
    headers
}) => {
    
    if ((method !== "GET" && method !== "DELETE") && !body){
        throw new Error("Body must be provided")
    }

    return fetch(url, {
        method,
        ...(body && {
            body: JSON.stringify(body)
        }),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        ...options
    }).then(
        (res) => {
            if (!res.ok){
                if (res.body){
                    return res.json().then(
                        (error) => {
                            if (error.title){
                                throw new Error(error.title)
                            }
                            throw new Error("An error has occurred")
                        }
                    )
                }
            }

            return method === "DELETE" ? null : res.body ? res.json() : res
        }
    )
}

export default fetcher;
