import axios from "axios"

export const signUserIn = async ({ phone, password }) => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/auth/login", { phone, password })
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