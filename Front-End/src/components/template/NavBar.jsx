import React, { useState } from "react"
import { AppRoutes } from "../../utilities/AppRoutes"
import { Navbar, Dropdown } from "react-bootstrap"
import { HeaderItems } from "../../utilities/StaticData"
import { useApp } from "../../providers/AppProvider"
import { useSignIn } from "../../providers/SignInProvider"
import { useSignUp } from "../../providers/SignUpProvider"
import { useSignOut } from "../../providers/SignOutProvider"
import SignInModal from "../modals/SignInModal"
import SignUpModal from "../modals/SignUpModal"
import SignOutModal from "../modals/SignOutModal"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { searchProductsByName } from "../../utilities/functions/searchProductsByName"
import { getAllProducts } from "../../utilities/functions/getAllProducts"

const NavBar = () => {
    const location = useLocation()
    const { isAuthenticated, menuParentItemId, setMenuParentItemId, user } =
        useApp()
    const { setProducts } = useApp()
    const { isSignInModalOpen, setIsSignInModalOpen } = useSignIn()
    const { isSignUpModalOpen, setIsSignUpModalOpen } = useSignUp()
    const { isSignOutModalOpen, setIsSignOutModalOpen } = useSignOut()
    const [searchInputValue, setSearchInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()

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
        setLoading(false)
        navigator(AppRoutes.products)
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="border-bottom">
                <div className="w-100 px-4">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="w-100 d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
                            {HeaderItems.map(headerItem => {
                                return (
                                    <button
                                        className="btn text-secondary hover-dark shadow-none border-0 bg-light px-0 me-4"
                                        onClick={() => {
                                            menuParentItemId === headerItem.id
                                                ? setMenuParentItemId(null)
                                                : setMenuParentItemId(
                                                      headerItem.id
                                                  )
                                        }}
                                    >
                                        {headerItem.title}
                                    </button>
                                )
                            })}

                            {location.pathname !== AppRoutes.home && (
                                <div className="input-group header-search mb-2 mb-lg-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="نام کالا را وارد کنید"
                                        value={searchInputValue}
                                        onChange={e =>
                                            setSearchInputValue(e.target.value)
                                        }
                                    />
                                    <button
                                        className="btn btn-success shadow-none"
                                        type="button"
                                        id="button-addon1"
                                        onClick={onSearchButtonClick}
                                    >
                                        {loading ? (
                                            "Loading"
                                        ) : (
                                            <i className="bi-search"></i>
                                        )}
                                    </button>
                                </div>
                            )}

                            {isAuthenticated && (
                                <div className="ms-0 ms-lg-auto">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success">
                                            {user?.phone ?? "---"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item href="#">
                                                <Link to={AppRoutes.profile}>
                                                    پروفایل
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                href="#"
                                                onClick={() => {
                                                    setIsSignOutModalOpen(true)
                                                }}
                                            >
                                                خروج
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )}

                            {!isAuthenticated && (
                                <div className="ms-0 ms-lg-auto">
                                    <button
                                        className="btn btn-white text-secondary border shadow-none px-4 hover-white hover-bg-success"
                                        onClick={() => {
                                            !isAuthenticated &&
                                                setIsSignInModalOpen(true)
                                        }}
                                    >
                                        ورود / ثبت نام
                                    </button>
                                </div>
                            )}
                        </div>

                        {menuParentItemId && (
                            <div className="position-absolute top-100 header-menu bg-light border border-1 rounded mt-2 mt-lg-3 p-2 p-lg-3">
                                <div className="row m-0 w-100">
                                    {HeaderItems.filter(headerItem => {
                                        return (
                                            headerItem.id === menuParentItemId
                                        )
                                    })[0].subItemsCategory.map(
                                        subItemCategory => {
                                            return (
                                                <div className="col-6 col-sm-4 col-md-3 col-lg-2 p-0 text-dark">
                                                    <div className="fw-bold">
                                                        <Link
                                                            to={
                                                                subItemCategory.link
                                                            }
                                                        >
                                                            {
                                                                subItemCategory.title
                                                            }
                                                        </Link>
                                                    </div>
                                                    {subItemCategory.subItems.map(
                                                        subItem => {
                                                            return (
                                                                <div className="text-secondary hover-dark py-1">
                                                                    <Link
                                                                        to={
                                                                            subItem.link
                                                                        }
                                                                    >
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </Navbar.Collapse>
                </div>
            </Navbar>

            {isSignInModalOpen && (
                <SignInModal
                    isOpen={isSignInModalOpen}
                    closeModal={() => {
                        setIsSignInModalOpen(false)
                    }}
                />
            )}

            {isSignUpModalOpen && (
                <SignUpModal
                    isOpen={isSignUpModalOpen}
                    closeModal={() => {
                        setIsSignUpModalOpen(false)
                    }}
                />
            )}

            {isSignOutModalOpen && (
                <SignOutModal
                    isOpen={isSignOutModalOpen}
                    closeModal={() => {
                        setIsSignOutModalOpen(false)
                    }}
                />
            )}
        </>
    )
}

export default NavBar
