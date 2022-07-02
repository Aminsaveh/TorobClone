import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../../providers/AppProvider"
import { AppRoutes } from "../../utilities/AppRoutes"
import { getAllProducts } from "../../utilities/functions/getAllProducts"
import { searchProductsByName } from "../../utilities/functions/searchProductsByName"

const Search = () => {
    // States and Hooks
    const navigator = useNavigate()
    const { setProducts } = useApp()
    const [loading, setLoading] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState("")

    // Methods
    const onSearchButtonClick = async () => {
        setLoading(true)

        if (searchInputValue) {
            const response = await searchProductsByName({
                name: searchInputValue,
            })
            setProducts(response.products)
        } else {
            const response = await getAllProducts()
            setProducts(response.products)
        }

        navigator(AppRoutes.products)
        setLoading(false)
    }

    // Render
    return (
        <div className="w-100 position-absolute search-input">
            <div className="row justify-content-center m-0">
                <div className="col-11 col-sm-8 col-lg-6 p-0">
                    <div className="input-group flex-nowrap">
                        <input
                            type="text"
                            value={searchInputValue}
                            onChange={e => setSearchInputValue(e.target.value)}
                            className="form-control"
                            placeholder="نام کالا را وارد کنید"
                        />
                        <button
                            onClick={onSearchButtonClick}
                            className="btn btn-outline-secondary btn-lg input-group-text"
                        >
                            {loading ? "Loading..." : "Search"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
