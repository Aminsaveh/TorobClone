import React from "react"

const Footer = () => {
    return (
        <div className="d-flex justify-content-between flex-column flex-xl-row px-2">
            <div className="w-100 w-xl-50 d-flex flex-column flex-sm-row justify-content-center justify-content-xl-start">
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark footer-link">
                    راهنمای خرید امن
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    پیگیری سفارش
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    تماس با ما
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    درباره ما
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    تخفیف‌ها
                </div>
            </div>
            <div className="w-100 w-xl-50 d-flex flex-column flex-sm-row justify-content-center justify-content-xl-end">
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    لیست فروشگاه‌ها
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    ثبت نام فروشگاه‌ها
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    پنل فروشگاه‌ها
                </div>
                <div className="btn p-0 py-1 py-sm-0 px-3 text-secondary hover-dark">
                    فرصت‌های شغلی
                </div>
            </div>
        </div>
    )
}

export default Footer
