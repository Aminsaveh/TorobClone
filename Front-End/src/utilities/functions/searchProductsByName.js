import axios from "axios"

export const searchProductsByName = async ({ name }) => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/product/search", { name, })
        if (!("error" in data)) return data
        return {
            error: data?.error?.message
        }

    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }
}