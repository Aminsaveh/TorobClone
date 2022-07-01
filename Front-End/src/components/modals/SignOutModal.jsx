import React from "react"
import { Modal } from "react-bootstrap"
import { useApp } from "../../providers/AppProvider"
import { clearUserToken } from "../../utilities/functions/clearUserToken"

const SignOutModal = ({ isOpen, closeModal }) => {
    const { isAuthenticated, setIsAuthenticated } = useApp()
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>خروج</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>آیا از خروج اطمینان دارید ؟</div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <button
                    className="btn btn-success w-25"
                    onClick={() => {
                        setIsAuthenticated(false)
                        clearUserToken()
                        closeModal()
                    }}
                >
                    تأیید
                </button>
                <button className="btn btn-secondary w-25" onClick={closeModal}>
                    بازگشت
                </button>{" "}
            </Modal.Footer>
        </Modal>
    )
}

export default SignOutModal
