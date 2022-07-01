import axios from "axios"
import { getUserToken } from "./getUserToken"

export const getUser = async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/user", {
            headers: {
                "authorization": getUserToken()
            }
        })
        if (!("error" in data)) return data.user[0]
        return {
            error: data?.error?.message
        }

    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }
}