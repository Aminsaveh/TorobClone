import React from "react"
import { useState } from "react"
import Layout from "../components/template/Layout"
import { AppRoutes } from "../utilities/AppRoutes"
import gamingDesk from "../images/gaming-desk.jpg"
import { Icons } from "../utilities/Icons"

const Product = () => {
    const [favorite, setFavorite] = useState(false)
    const [notify, setNotify] = useState(false)
    const [report, setReport] = useState(false)

    return (
        <Layout>
            <div className="row m-0">
                <div className="col-12 px-4">
                    <div className="d-none d-sm-flex flex-wrap align-items-center text-secondary py-3 px-0 fs-12px">
                        {rootHistory.map((root, idx) => {
                            return (
                                <>
                                    <a href={root.link}>{root.title}</a>
                                    {idx !== rootHistory.length - 1 && (
                                        <span className="px-2">/</span>
                                    )}
                                </>
                            )
                        })}
                    </div>

                    <div className="mt-4 mt-sm-0 bg-white rounded p-2">
                        <div className="row m-0 align-items-center">
                            <div className="col-12 col-sm-4 col-md-3 p-2 text-center">
                                <img
                                    src={gamingDesk}
                                    alt="product-image"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-12 col-sm-8 col-md-9">
                                <div className="row m-0">
                                    <div className="col-12 fs-18px mb-2 mb-md-4 text-center text-sm-start">
                                        میز گیمینگ Eureka مدل Gaming General
                                        Series
                                    </div>

                                    <div className="col-12 text-danger mb-2 text-center text-sm-start">
                                        از 9,300,000 تومان تا 15,500,000 تومان
                                    </div>

                                    <button className="col-12 col-md-6 col-lg-4 btn btn-danger text-white px-2 mb-2 mb-md-0">
                                        خرید از ارزانترین فروشنده
                                    </button>

                                    <div className="col-12 col-md-6 col-lg-8 text-center text-md-start">
                                        <button
                                            className="btn p-0 me-3"
                                            onClick={() => {
                                                setNotify(!notify)
                                            }}
                                        >
                                            {!notify && (
                                                <span className="text-secondary">
                                                    {Icons.bell}
                                                </span>
                                            )}
                                            {notify && (
                                                <span className="text-danger">
                                                    {Icons.bellFill}
                                                </span>
                                            )}
                                        </button>

                                        <button
                                            className="btn p-0 me-3"
                                            onClick={() => {
                                                setFavorite(!favorite)
                                            }}
                                        >
                                            {!favorite && (
                                                <span className="text-secondary">
                                                    {Icons.heart}
                                                </span>
                                            )}
                                            {favorite && (
                                                <span className="text-danger">
                                                    {Icons.heartFill}
                                                </span>
                                            )}
                                        </button>

                                        <button className="btn p-0 me-3">
                                            <i className="text-secondary">
                                                {Icons.share}
                                            </i>
                                        </button>

                                        <button
                                            className="btn bg-light rounded rounded-pill py-1 px-2"
                                            onClick={() => {
                                                setReport(!report)
                                            }}
                                        >
                                            {!report && (
                                                <span className="text-secondary">
                                                    {Icons.flag}
                                                </span>
                                            )}
                                            {report && (
                                                <span className="text-danger">
                                                    {Icons.flagFill}
                                                </span>
                                            )}
                                            <span className="ms-2 fs-12px">
                                                گزارش
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product

const rootHistory = [
    { title: "همه دسته‌ها", link: AppRoutes.home },
    { title: "لوازم خانگی", link: AppRoutes.home },
    { title: "مبلمان و صنایع چوب", link: AppRoutes.home },
    { title: "میز", link: AppRoutes.home },
    { title: "میز گیمینگ", link: AppRoutes.home },
]
