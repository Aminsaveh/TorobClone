import axios from "axios"

export const getProductById = async ({ id }) => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/product/getById", {
            id,
        })
        if (!("error" in data)) return data
        return {
            error: data.error.message
        }
    } catch (error) {
        return {
            error: "something went wrong"
        }
    }
}