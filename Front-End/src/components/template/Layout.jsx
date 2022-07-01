import React, { useEffect } from "react"
import Header from "./Header"
const Layout = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            {children}
            {/* <Footer /> */}
        </>
    )
}
export default Layout
