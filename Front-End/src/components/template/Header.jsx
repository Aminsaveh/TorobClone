import React from "react"
import NavBar from "./NavBar"
import SignInProvider from "../../providers/SignInProvider"
import SignUpProvider from "../../providers/SignUpProvider"
import SignOutProvider from "../../providers/SignOutProvider"

const Header = () => {
    return (
        <SignUpProvider>
            <SignInProvider>
                <SignOutProvider>
                    <NavBar />
                </SignOutProvider>
            </SignInProvider>
        </SignUpProvider>
    )
}

export default Header
