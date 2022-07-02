import React from "react"
import { useApp } from "../../providers/AppProvider"

const SideMenu = () => {
    const { profileSideMenuSelected, setProfileSideMenuSelected } = useApp()

    return (
        <div className="p-3">
            <button
                className={`btn hover-danger ${
                    profileSideMenuSelected === "favorites" &&
                    "profile-side-menu-active"
                }`}
                onClick={() => {
                    setProfileSideMenuSelected("favorites")
                }}
            >
                <div className="d-flex align-items-center">
                    <div>
                        <svg
                            className="hover-danger me-2 heart-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                    <div className="fs-18px">محبوب‌ها</div>
                </div>
            </button>
            <br />
            <button
                className={`btn hover-danger ${
                    profileSideMenuSelected === "recent" &&
                    "profile-side-menu-active"
                }`}
                onClick={() => {
                    setProfileSideMenuSelected("recent")
                }}
            >
                <div className="d-flex align-items-center">
                    <div>
                        <svg
                            className="hover-danger me-2 heart-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="fs-18px">محصولات اخیر</div>
                </div>
            </button>
        </div>
    )
}

export default SideMenu
