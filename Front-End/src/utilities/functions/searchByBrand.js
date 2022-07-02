import axios from "axios"

export const searchByBrand = async ({ brand }) => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/product/getByBrand", {
            brand,
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