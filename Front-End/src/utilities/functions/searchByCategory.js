import axios from "axios"

export const searchByCategory = async ({ category }) => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/product/getByCategory", {
            category,
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