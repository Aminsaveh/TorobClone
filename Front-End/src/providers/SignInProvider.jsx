import React, { useContext, useState } from "react"

export const SignInContext = React.createContext()
export const useSignIn = () => useContext(SignInContext)

const SignInProvider = ({ children }) => {
    // States
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

    // Methods

    // UseEffects

    // Binding
    const valueObject = {
        // States
        isSignInModalOpen,
        setIsSignInModalOpen,
        // Methods
    }

    // Render
    return (
        <SignInContext.Provider value={valueObject}>
            {children}
        </SignInContext.Provider>
    )
}

export default SignInProvider
