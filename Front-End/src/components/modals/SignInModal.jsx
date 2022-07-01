import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { useApp } from "../../providers/AppProvider"
import { useSignUp } from "../../providers/SignUpProvider"
import { signUserIn } from "../../utilities/functions/signUserIn"
import { storeUserToken } from "../../utilities/functions/storeUserToken"

const SignInModal = ({ isOpen, closeModal }) => {
    // States and Hooks
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")
    const { setIsAuthenticated } = useApp()
    const [password, setPassword] = useState("")
    const { setIsSignUpModalOpen } = useSignUp()
    const [loading, setLoading] = useState(false)

    const onLoginButtonClick = async () => {
        setError(false)
        if (!phone || !password)
            return setError("Phone or password cannot be left empty")

        setLoading(true)
        const response = await signUserIn({
            phone,
            password,
        })

        if (!("error" in response)) {
            setIsAuthenticated(true)
            storeUserToken(response.token)
            return closeModal()
        }

        setError(response.error)
        return setLoading(false)
    }
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>ورود</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="text-danger">{error}</div>}
                <div className="row m-0 mb-2 align-items-center">
                    <div className="col-3 p-0">شماره موبایل</div>
                    <div className="col-9 p-0">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="لطفاً شماره موبایل خود را وارد کنید"
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
                        onClick={onLoginButtonClick}
                    >
                        {loading ? "Loading" : "ورود"}
                    </button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn p-0 text-decoration-underline text-primary mx-auto"
                    onClick={() => {
                        closeModal()
                        setIsSignUpModalOpen(true)
                    }}
                >
                    ثبت نام
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignInModal
