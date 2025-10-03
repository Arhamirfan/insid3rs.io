import React from 'react'
import Modal from "react-bootstrap/Modal";
import Snap from "../../../public/assets/images/icons/snap.png"
const DisconnectModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="lg" className="font"
                aria-labelledby="contained-modal-title-vcenter" backdrop="static" keyboard={false}
            >
                <Modal.Body>
                    <div className="d-flex font justify-content-center text-center">
                        <div className="d-flex flex-column mb-3">
                            <div className="p-2">
                                <img src={Snap.src} />
                            </div>
                            <h2 className="pt-4">Oh snap!</h2>
                            <div className="p-2">Internet Disconnected.</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DisconnectModal