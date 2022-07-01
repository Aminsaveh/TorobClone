import React from "react"
import { Accordion } from "react-bootstrap"
import NumberFormat from "react-number-format"
import { useApp } from "../../providers/AppProvider"
import { ArrowDown } from "../../utilities/ImageImports"

const SideMenu = () => {
    const {
        stockFilter,
        setStockFilter,
        fromPriceFilter,
        setFromPriceFilter,
        toPriceFilter,
        setToPriceFilter,
        brandsFilterExpand,
        setBrandsFilterExpand,
        brandsFilterSearch,
        setBrandsFilterSearch,
    } = useApp()

    const filteredBrands = brands.filter(brand => {
        return (
            brand.enTitle
                .toLowerCase()
                .includes(brandsFilterSearch.toLowerCase()) ||
            brand.faTitle.includes(brandsFilterSearch)
        )
    })

    return (
        <Accordion defaultActiveKey="0" flush alwaysOpen>
            <Accordion.Item eventKey="0" className="py-2">
                <Accordion.Header className="fw-bold">
                    <div className="fs-16px">انتخاب برند</div>
                </Accordion.Header>
                <Accordion.Body className="w-100">
                    <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text bg-white text-secondary border-end-0">
                            <i className="bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="جستجوی برند"
                            value={brandsFilterSearch}
                            onChange={e => {
                                setBrandsFilterSearch(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        {filteredBrands.map((brand, index) => {
                            if (index < 8 || brandsFilterExpand) {
                                return (
                                    <button className="btn w-100 d-flex justify-content-between px-2 py-1 mb-2 hover-bg-gray">
                                        <div className="text-secondary fs-14px">
                                            {brand.faTitle}
                                        </div>
                                        <div className="text-secondary fs-14px">
                                            {brand.enTitle}
                                        </div>
                                    </button>
                                )
                            }
                        })}

                        {filteredBrands.length > 8 && (
                            <button
                                className="btn w-100 d-flex justify-content-start p-0 align-items-center"
                                onClick={() => {
                                    setBrandsFilterExpand(!brandsFilterExpand)
                                }}
                            >
                                <div className="me-3">نمایش سایر برندها</div>
                                <img
                                    src={ArrowDown}
                                    alt="expand"
                                    className={`w-16px transition-transform-200 ${
                                        brandsFilterExpand && "y-flip"
                                    }`}
                                />
                            </button>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="py-2">
                <Accordion.Header className="fw-bold">
                    <div className="fs-16px">دسته‌های مشابه</div>
                </Accordion.Header>
                <Accordion.Body className="w-100">فیلترها</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="py-2">
                <Accordion.Header>
                    <div className="fs-16px">قیمت (تومان)</div>
                </Accordion.Header>
                <Accordion.Body className="w-100">
                    <div className="d-flex w-100 flex-column">
                        <div className="d-flex pb-3">
                            <div className="d-flex flex-fill border text-secondary fs-14px py-2 px-2 me-2 rounded">
                                <div className="w-25">از</div>
                                <NumberFormat
                                    value={fromPriceFilter}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                    renderText={value => (
                                        <input
                                            type="text"
                                            dir="ltr"
                                            className="form-control p-0 w-75 border-0 fs-12px"
                                            value={value}
                                            onChange={e => {
                                                setFromPriceFilter(
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className="d-flex flex-fill border text-secondary fs-14px py-2 px-2 ms-2 rounded">
                                <div className="w-25">تا</div>
                                <NumberFormat
                                    value={toPriceFilter}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                    renderText={value => (
                                        <input
                                            type="text"
                                            dir="ltr"
                                            className="form-control p-0 w-75 border-0 fs-12px"
                                            value={value}
                                            onChange={e => {
                                                setToPriceFilter(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <button className="btn btn-secondary">
                            اعمال فیلتر قیمت
                        </button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="py-2">
                <Accordion.Header>
                    <div className="fs-16px">موجودی</div>
                </Accordion.Header>
                <Accordion.Body className="w-100">
                    <div className="btn d-flex align-items-center form-check m-0 p-0">
                        <input
                            id="termsOfService"
                            type="checkbox"
                            className="form-check-input custom-checkbox m-0 fs-24px"
                            checked={stockFilter}
                            onChange={() => {
                                setStockFilter(!stockFilter)
                            }}
                        />
                        <label
                            for="termsOfService"
                            className="form-check-label text-secondary fs-16px ps-2"
                        >
                            نمایش محصولات موجود
                        </label>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default SideMenu

const brands = [
    { faTitle: "ایسوس", enTitle: "ASUS" },
    { faTitle: "ال جی", enTitle: "LG" },
    { faTitle: "سامسونگ", enTitle: "Samsung" },
    { faTitle: "بنکیو", enTitle: "BenQ" },
    { faTitle: "دل", enTitle: "Dell" },
    { faTitle: "اچ پی", enTitle: "HP" },
    { faTitle: "ایسر", enTitle: "Acer" },
    { faTitle: "لنوو", enTitle: "Lenovo" },
    { faTitle: "فیلیپس", enTitle: "Philips" },
    { faTitle: "جی پلاس", enTitle: "GPlus" },
    { faTitle: "ام اس آی", enTitle: "MSI" },
    { faTitle: "پاناسونیک", enTitle: "Panasonic" },
    { faTitle: "هوآوی", enTitle: "Huawei" },
    { faTitle: "ایسوس", enTitle: "ASUS" },
    { faTitle: "ال جی", enTitle: "LG" },
    { faTitle: "سامسونگ", enTitle: "Samsung" },
    { faTitle: "بنکیو", enTitle: "BenQ" },
    { faTitle: "دل", enTitle: "Dell" },
    { faTitle: "اچ پی", enTitle: "HP" },
    { faTitle: "ایسر", enTitle: "Acer" },
    { faTitle: "لنوو", enTitle: "Lenovo" },
    { faTitle: "فیلیپس", enTitle: "Philips" },
    { faTitle: "جی پلاس", enTitle: "GPlus" },
    { faTitle: "ام اس آی", enTitle: "MSI" },
    { faTitle: "پاناسونیک", enTitle: "Panasonic" },
    { faTitle: "هوآوی", enTitle: "Huawei" },
]
