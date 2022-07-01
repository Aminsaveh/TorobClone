import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Profile from "./pages/Profile"
import AppProvider from "./providers/AppProvider"
import { AppRoutes } from "./utilities/AppRoutes"

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path={AppRoutes.home} element={<Home />} />
                    <Route path={AppRoutes.products} element={<Products />} />
                    <Route path={AppRoutes.product} element={<Product />} />
                    <Route path={AppRoutes.profile} element={<Profile />} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    )
}

export default App
