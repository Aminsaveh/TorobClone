import React from "react"
import Search from "../components/Home/Search"
import Header from "../components/template/Header"
import Footer from "../components/template/Footer"

const Home = () => {
    return (
        <>
            <Header />
            <Search />
            <div className="position-absolute bottom-0 w-100 py-2 bg-light">
                <Footer />
            </div>
        </>
    )
}

export default Home
