import React, { useEffect } from "react"
import { useState } from "react"
import Layout from "../components/template/Layout"
import { Icons } from "../utilities/Icons"
import { useParams } from "react-router-dom"
import { getProductById } from "../utilities/functions/getProductById"
import { addProductToUserRecent } from "../utilities/functions/addProductToUserRecent"

const Product = () => {
    // States and Hooks
    const { id } = useParams()
    const [favorite, setFavorite] = useState(false)
    const [notify, setNotify] = useState(false)
    const [report, setReport] = useState(false)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)

    const addThousandsSeparator = num =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    // Methods
    const fetchProductById = async () => {
        setLoading(true)
        const response = await getProductById({ id: Number(id) })
        setProduct(response.product)
        setLoading(false)
    }

    const addToRecent = async () => {
        await addProductToUserRecent({ id })
    }

    useEffect(() => {
        fetchProductById()
        addToRecent()
    }, [])

    // Render
    return (
        <Layout>
            {loading ? (
                "loading"
            ) : (
                <div className="row m-0">
                    <div className="col-12 px-4">
                        <div className="mt-4 bg-white rounded p-2">
                            <div className="row m-0 align-items-center">
                                <div className="col-12 col-sm-4 col-md-3 p-2 text-center">
                                    <img
                                        src={product.imageUrl}
                                        alt="product-image"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-12 col-sm-8 col-md-9">
                                    <div className="row m-0">
                                        <div className="col-12 fs-18px mb-2 mb-md-4 text-center text-sm-start">
                                            {product.name}
                                        </div>

                                        <div className="col-12 text-danger mb-2 text-center text-sm-start">
                                            از{" "}
                                            {addThousandsSeparator(
                                                product.price
                                            )}{" "}
                                            تومان
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
            )}
        </Layout>
    )
}

export default Product
