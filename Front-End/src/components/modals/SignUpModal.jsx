import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { useApp } from "../../providers/AppProvider"
import { signUserUp } from "../../utilities/functions/signUserUp"
import { storeUserToken } from "../../utilities/functions/storeUserToken"

const SignUpModal = ({ isOpen, closeModal }) => {
    // States and Hooks
    const { setIsAuthenticated } = useApp()
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // Methods
    const onSignUpButtonClick = async () => {
        setError("")

        if (!name || !phone || !password)
            return setError("Name, Phone or Password cannot be left empty")

        setLoading(true)
        const response = await signUserUp({
            name,
            phone,
            password,
        })
        setLoading(false)

        if ("error" in response) return setError(response.error)

        setIsAuthenticated(true)
        storeUserToken(response.token)
        closeModal()
    }

    // Render
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>ثبت نام</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="text-danger"> {error}</div>}
                <div className="row m-0 mb-2 align-items-center">
                    <div className="col-3 p-0">نام</div>
                    <div className="col-9 p-0">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="لطفاً نام خود را وارد کنید"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row m-0 mb-2 align-items-center">
                    <div className="col-3 p-0">موبایل</div>
                    <div className="col-9 p-0">
                        <input
                            type="phone"
                            className="form-control"
                            placeholder="لطفاً ایمیل خود را وارد کنید"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row m-0 mb-3 align-items-center">
                    <div className="col-3 p-0">رمز عبور</div>
                    <div className="col-9 p-0">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="لطفاً رمز عبور را وارد کنید"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        className="btn btn-success w-25"
                        onClick={onSignUpButtonClick}
                    >
                        {loading ? "loading" : "ثبت نام"}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal
