import React from "react"
import { Offcanvas } from "react-bootstrap"
import gamingDesk from "../images/gaming-desk.jpg"
import { useApp } from "../providers/AppProvider"
import Product from "../components/template/Product"
import Layout from "../components/template/Layout"
import SideMenu from "../components/Profile/SideMenu"

const testProduct = {
    name: "میز گیمینگ استارت گیم Gamin Desk StartGame RGB",
    price: 4200000,
    stores: [
        { id: 1, name: "فروشگاه لیون" },
        { id: 2, name: "فروشگاه لمپاف" },
    ],
    image: gamingDesk,
}

const Profile = () => {
    const { offcanvasMenuShow, setOffcanvasMenuShow, profileSideMenuSelected } =
        useApp()

    return (
        <Layout>
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
                            {[0, 1].map(item => {
                                return (
                                    <div
                                        className="col-12 col-sm-6 col-md-4 col-lg-4 px-2 pb-4 px-lg-1 pb-lg-2"
                                        key={item}
                                    >
                                        <Product
                                            name={testProduct.name}
                                            price={testProduct.price}
                                            stores={testProduct.stores}
                                            image={testProduct.image}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Profile
