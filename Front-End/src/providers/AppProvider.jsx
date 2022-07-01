import React, { useContext, useEffect, useState } from "react"
import { getUser } from "../utilities/functions/getUser"
import { getUserToken } from "../utilities/functions/getUserToken"

export const AppContext = React.createContext()
export const useApp = () => useContext(AppContext)

const AppProvider = ({ children }) => {
    // States
    const [isAuthenticated, setIsAuthenticated] = useState(
        getUserToken() !== null
    )
    const [products, setProducts] = useState([])
    const [user, setUser] = useState()
    const [menuParentItemId, setMenuParentItemId] = useState(null)
    const [stockFilter, setStockFilter] = useState(false)
    const [offcanvasMenuShow, setOffcanvasMenuShow] = useState(false)
    const [fromPriceFilter, setFromPriceFilter] = useState(0)
    const [toPriceFilter, setToPriceFilter] = useState(0)
    const [brandsFilterExpand, setBrandsFilterExpand] = useState(false)
    const [brandsFilterSearch, setBrandsFilterSearch] = useState("")
    const [profileSideMenuSelected, setProfileSideMenuSelected] = useState("")

    // Methods
    const updateCurrentUser = async () => {
        const result = await getUser()
        if ("error" in result) return
        console.log(result)
        return setUser(result)
    }
    // UseEffects
    useEffect(() => {
        if (isAuthenticated) updateCurrentUser()
    }, [isAuthenticated])

    // Binding
    const valueObject = {
        // States
        isAuthenticated,
        setIsAuthenticated,
        menuParentItemId,
        setMenuParentItemId,
        stockFilter,
        setStockFilter,
        offcanvasMenuShow,
        setOffcanvasMenuShow,
        fromPriceFilter,
        setFromPriceFilter,
        toPriceFilter,
        setToPriceFilter,
        brandsFilterExpand,
        setBrandsFilterExpand,
        brandsFilterSearch,
        setBrandsFilterSearch,
        profileSideMenuSelected,
        setProfileSideMenuSelected,
        products,
        setProducts,
        user,
        setUser,
        // Methods
    }

    // Render
    return (
        <AppContext.Provider value={valueObject}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
