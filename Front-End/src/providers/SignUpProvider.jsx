import React, { useContext, useState } from "react"

export const SignUpContext = React.createContext()
export const useSignUp = () => useContext(SignUpContext)

const SignUpProvider = ({ children }) => {
    // States
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

    // Methods

    // UseEffects

    // Binding
    const valueObject = {
        // States
        isSignUpModalOpen,
        setIsSignUpModalOpen,
        // Methods
    }

    // Render
    return (
        <SignUpContext.Provider value={valueObject}>
            {children}
        </SignUpContext.Provider>
    )
}

export default SignUpProvider
