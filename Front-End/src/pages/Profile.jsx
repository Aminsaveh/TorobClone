import React, { useEffect, useState } from "react"
import { Offcanvas } from "react-bootstrap"
import { useApp } from "../providers/AppProvider"
import Product from "../components/template/Product"
import Layout from "../components/template/Layout"
import SideMenu from "../components/Profile/SideMenu"
import { getUserFavorites } from "../utilities/functions/getUserFavorites"
import { getUserRecentProducts } from "../utilities/functions/getUserRecentProducts"

const Profile = () => {
    // States and Hooks
    const [favorites, setFavorites] = useState([])
    const [recent, setRecent] = useState([])
    const [loading, setLoading] = useState(true)
    const { offcanvasMenuShow, setOffcanvasMenuShow, profileSideMenuSelected } =
        useApp()

    // Methods
    const fetchFavorites = async () => {
        setLoading(true)
        const response = await getUserFavorites()
        setFavorites(response.favorites)
        setLoading(false)
    }

    const fetchRecent = async () => {
        setLoading(true)
        const response = await getUserRecentProducts()
        setRecent(response.latest)
        setLoading(false)
    }

    useEffect(() => {
        fetchFavorites()
        fetchRecent()
    }, [])

    // Render
    return (
        <Layout>
            {loading ? (
                "loading"
            ) : (
                <div className="row m-0">
                    <div className="d-none d-lg-block col-lg-3 bg-white side-menu">
                        <SideMenu />
                    </div>
                    <Offcanvas
                        show={offcanvasMenuShow}
                        onHide={() => {
                            setOffcanvasMenuShow(false)
                        }}
                    >
                        <Offcanvas.Body>
                            <SideMenu />
                        </Offcanvas.Body>
                    </Offcanvas>

                    <div className="col-12 col-lg-9 px-4">
                        <div className="d-flex ps-2 my-3">
                            <button
                                className="btn p-0 d-flex d-lg-none align-items-center me-3"
                                onClick={() => {
                                    setOffcanvasMenuShow(true)
                                }}
                            >
                                <i className="bi bi-person fs-16px pe-1"></i>
                                <span className="fs-14px">منوی کاربری</span>
                            </button>
                        </div>

                        {profileSideMenuSelected === "favorites" && (
                            <div className="row m-0 pt-2">
                                {favorites.map(item => {
                                    return (
                                        <div
                                            className="col-12 col-sm-6 col-md-4 col-lg-4 px-2 pb-4 px-lg-1 pb-lg-2"
                                            key={item}
                                        >
                                            <Product
                                                favorite={true}
                                                id={item.id}
                                                name={item.name}
                                                price={item.price}
                                                stores={item.stores}
                                                image={item.imageUrl}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {profileSideMenuSelected === "recent" && (
                            <div className="row m-0 pt-2">
                                {recent.map(item => {
                                    return (
                                        <div
                                            className="col-12 col-sm-6 col-md-4 col-lg-4 px-2 pb-4 px-lg-1 pb-lg-2"
                                            key={item}
                                        >
                                            <Product
                                                favorite={true}
                                                id={item.id}
                                                name={item.name}
                                                price={item.price}
                                                stores={item.stores}
                                                image={item.imageUrl}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default Profile
