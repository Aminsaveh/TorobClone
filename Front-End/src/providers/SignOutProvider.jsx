import React, { useContext, useState } from "react"

export const SignOutContext = React.createContext()
export const useSignOut = () => useContext(SignOutContext)

const SignOutProvider = ({ children }) => {
    // States
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false)

    // Methods

    // UseEffects

    // Binding
    const valueObject = {
        // States
        isSignOutModalOpen,
        setIsSignOutModalOpen,
        // Methods
    }

    // Render
    return (
        <SignOutContext.Provider value={valueObject}>
            {children}
        </SignOutContext.Provider>
    )
}

export default SignOutProvider
