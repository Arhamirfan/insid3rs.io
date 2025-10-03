import React, { useEffect, useState } from "react";
//images
import CreditCard from "../../../../public/assets/images/icons/creditCard.png";
import Polygon from "../../../../public/assets/images/icons/polygon.png";
import CreatePackageFixedPrice from "../../../components/forms/createPackageFixedPrice";

let SellTicketModalData = ({ data }) => {
    let [tab, setTab] = useState(2);
    let [tickets, setTickets] = useState([]);
    let [transactionHash, setTransactionHash] = useState("");
    useEffect(() => {
        let list = data?.tickets?.map(data => {
            return { ...data, selectedCount: 0 }
        });
        setTickets(list)
    }, [])
    return (
        <>
            {transactionHash != "" ? (
                <div className="d-flex font justify-content-center text-center">
                    <div className="d-flex flex-column mb-3">
                        <div className="p-2">
                            <h2 className="xxlBoldText boldText">Yay!</h2>
                        </div>
                        <div className="pb-n5 mb-4">
                            <h4 className="pt-4 text-success">Ticket Successfully Listed for Sale!</h4>
                            <span className="purpleColor ">
                            </span>
                        </div>
                        <p>Verification link. <a href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_URL}/tx/${transactionHash}`} target="_blank" rel="noreferrer">Click</a> </p>

                    </div>
                </div>
            ) : (
                <>
                    <div className="container d-flex mb-4">
                        <div className="container-fluid greyBackground">
                            <div className="row gap-3  p-1">
                                <div className={`col xsCircularRadius hoverEffect ${tab == 2 ? "activeCard" : "bg-white "}`} onClick={() => setTab(2)}>
                                    <div className="container-fluid">
                                        <div className="row flex-column py-2 text-center justify-content-center align-items-center">
                                            <div className="col pt-3">
                                                <img src={Polygon.src} height="30" width={"32"} />
                                            </div>
                                            <div className="col boldText pt-1">Fixed Price</div>
                                            <div className="col pb-2 smallText">Enter price to allow users instantly purchase your ticket</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col  xsCircularRadius hoverEffect ${tab == 1 ? "activeCard" : "bg-white "}`} onClick={() => {
                                    setTab(1)
                                    // toast("Coming soon...")

                                }}>
                                    <div className="container-fluid">
                                        <div className="row flex-column py-2 text-center justify-content-center align-items-center">
                                            <div className="col pt-3">
                                                <img src={CreditCard.src} height="30" width={"32"} />
                                            </div>
                                            <div className="col boldText pt-1">Timed Auction</div>
                                            <div className="col pb-2 smallText">Set a period of time for which buyers can place bids</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tickets?.length && (
                        <CreatePackageFixedPrice auction={tab == 1 ? true : false} setTransactionHash={setTransactionHash} tickets={tickets} eventId={data?.event_id?._id} blockChainEventId={data?.event_id?.blockchainId} eventStartDate={data?.event_id?.startDate} eventEndDate={data?.event_id?.endDate} />
                    )}
                </>
            )}
        </>
    );
};

export default SellTicketModalData;
