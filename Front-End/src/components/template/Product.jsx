import React from "react"
import { useState } from "react"

const Product = ({ name, price, stores, image }) => {
    const [inform, setInform] = useState(false)
    const [like, setLike] = useState(false)

    const addThousandsSeparator = num =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
        <div className="bg-white rounded rounded-1 pt-2 pb-3">
            <div className="d-flex flex-column justify-content-between btn">
                <img src={image} alt={name} />
                <div className="product-title pb-2 pb-sm-3 pb-md-4 pb-lg-5 text-start">
                    {name}
                </div>
                <div className="product-price fw-bold text-start pb-2">
                    {stores.length === 1
                        ? `${addThousandsSeparator(price)} تومان`
                        : `از ${addThousandsSeparator(price)} تومان`}
                </div>
                <div className="product-store text-secondary text-start pb-3">
                    {stores.length === 1
                        ? `در ${stores[0].name}`
                        : `در ${stores.length} فروشگاه`}
                </div>
            </div>
            <div className="d-flex justify-content-evenly">
                <button
                    className="btn p-0 shadow-none"
                    onClick={() => setLike(!like)}
                >
                    <i
                        className={`product-button bi ${
                            like
                                ? "bi-heart-fill text-danger"
                                : "bi-heart text-secondary"
                        }`}
                    ></i>
                </button>
                <button
                    className="btn p-0 shadow-none"
                    onClick={() => setInform(!inform)}
                >
                    <i
                        className={`product-button bi ${
                            inform
                                ? "bi-bell-fill text-primary"
                                : "bi-bell text-secondary"
                        }`}
                    ></i>
                </button>
            </div>
        </div>
    )
}

export default Product
