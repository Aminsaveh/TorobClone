import axios from "axios"
import { getUserToken } from "./getUserToken"

export const getUserRecentProducts = async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/user/latest", {
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