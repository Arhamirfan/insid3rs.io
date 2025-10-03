import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import SellTicketModalData from "../../pageComponents/tickets/data/sellTicketModalData";
import { useSelector, useDispatch } from "react-redux";
import Snap from "../../../public/assets/images/icons/snap.png";
import { dropSiteStatus, eventStatus } from "../../services/blockChain/contractMethods"
let SellTicketModal = (props) => {
    let wallet = useSelector((state) => state.wallet);
    let [loader, setLoader] = useState(true);
    let [dropSiteStatusValue, setDropSiteStatus] = useState(false);
    let [eventPaused, setEventPaused] = useState(false);
    // useEffect(() => {
    //     if (props.data.event_id.blockchainId) {
    //         checkEventStatus()
    //     }
    // }, [props.data.event_id.blockchainId])

    return (
        <Modal
            {...props}
            size="lg" className="font"
            aria-labelledby="contained-modal-title-vcenter" backdrop="static" keyboard={false}
        // centered
        >
            <Modal.Header closeButton className="px-4" >
                <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">Sell a ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {wallet.address == "" ? (
                    <>
                        <div className="d-flex font justify-content-center text-center">
                            <div className="d-flex flex-column mb-3">
                                <div className="p-2">
                                    <img src={Snap.src} />
                                </div>
                                <h2 className="pt-4">Oh snap!</h2>
                                <div className="p-2">Wallet not connected </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <SellTicketModalData data={props.data} />
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default SellTicketModal;
