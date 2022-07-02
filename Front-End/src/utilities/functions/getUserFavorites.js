import axios from "axios"
import { getUserToken } from "./getUserToken"

export const getUserFavorites = async () => {
    try {
        const { data } = await axios.get(
            "http://localhost:8080/api/v1/user/favorites",
            {
                headers: {
                    authorization: getUserToken(),
                },
            }
        )
        if (!("error" in data)) return data
        return {
            error: data.error.message,
        }
    } catch (error) {
        return {
            error: "something went wrong",
        }
    }
}
