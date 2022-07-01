import axios from "axios"

export const signUserUp = async ({ name, phone, password }) => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/auth/signup", { name, phone, password, userType: "normal", })
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