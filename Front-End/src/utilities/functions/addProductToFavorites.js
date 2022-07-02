import axios from "axios"
import { getUserToken } from "./getUserToken"

export const addProductToFavorites = async ({ id }) => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/user/favorite", {
            id,
        }, {
            headers: {
                "authorization": getUserToken()
            }
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