import React, { useState } from "react"
import Product from "../components/template/Product"
import Layout from "../components/template/Layout"
import SideMenu from "../components/Products/SideMenu"
import { Offcanvas } from "react-bootstrap"
import gamingDesk from "../images/gaming-desk.jpg"
import { useApp } from "../providers/AppProvider"
import { useNavigate } from "react-router-dom"

const Products = () => {
    const {
        stockFilter,
        setStockFilter,
        offcanvasMenuShow,
        setOffcanvasMenuShow,
        products,
    } = useApp()

    const navigator = useNavigate()

    const [filter, setFilter] = useState(2)
    const filteredProducts =
        filter === 3
            ? products.sort((a, b) => b.price - a.price)
            : filter === 4
            ? products.sort((a, b) => a.price - b.price)
            : products

    return (
        <Layout>
            <div className="row m-0">
                <div className="d-none d-lg-block col-lg-3 bg-white">
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
                    <div className="row mx-3 d-none d-sm-flex m-0 border-bottom border-1 py-3 align-items-center">
                        <div className="col-9 d-flex flex-wrap align-items-center text-secondary px-0 fs-12px"></div>
                        <div className="col-3 d-flex justify-content-end p-0">
                            <select
                                className="form-select w-auto border-0 shadow-none fs-14px"
                                value={filter}
                                onChange={e =>
                                    setFilter(Number(e.target.value))
                                }
                            >
                                <option selected>مرتب سازی</option>
                                <option value="1">محبوب‌ترین</option>
                                <option value="2">جدید‌ترین</option>
                                <option value="3">گران‌ترین</option>
                                <option value="4">ارزان‌ترین</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex py-3 mx-2 align-items-center">
                        <button
                            className="btn p-0 d-flex d-lg-none align-items-center me-3"
                            onClick={() => {
                                setOffcanvasMenuShow(true)
                            }}
                        >
                            <i className="bi bi-funnel fs-16px pe-1"></i>
                            <span className="fs-14px">فیلترها</span>
                        </button>
                        {stockFilter && (
                            <div className="d-flex align-items-center border rounded rounded-pill bg-white fs-12px px-2 me-2">
                                <span>نمایش کالاهای موجود</span>
                                <button
                                    className="btn p-0 bg-white"
                                    onClick={() => {
                                        setStockFilter(false)
                                    }}
                                >
                                    <i className="btn p-0 bi bi-x fs-20px"></i>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="row m-0 pt-2">
                        {filteredProducts.map(item => {
                            return (
                                <div
                                    className="col-12 col-sm-6 col-md-4 col-lg-4 px-2 pb-4 px-lg-1 pb-lg-2"
                                    key={item}
                                >
                                    <Product
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
                    <div>
                        {filteredProducts.length === 0 && (
                            <div className="fw-bold text-center">
                                چیزی برای نمایش وجود ندارد
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products

const testProduct = {
    name: "میز گیمینگ استارت گیم Gamin Desk StartGame RGB",
    price: 4200000,
    stores: [
        { id: 1, name: "فروشگاه لیون" },
        { id: 2, name: "فروشگاه لمپاف" },
    ],
    image: gamingDesk,
}
