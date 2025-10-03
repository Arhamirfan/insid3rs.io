import React, { useEffect, useState } from "react";
import Moment from '../../../../../src/utils/date';
import Spinner from "../../../../../src/components/spinner/Index";
import ticketApi from "../../../../../src/api/ticketApi";
import { dates } from "../../../../../src//constants/staticData";
import User from "/public/assets/images/icons/user.png";
let RentersTab = ({ id, data }) => {
    let [rentersData, setRentersData] = useState([]);
    let [apiLoading, setApiLoading] = useState(true);
    useEffect(() => {
        if (id) {
            getRentersById(id);
        }
    }, [data]);

    let getRentersById = async (id) => {
        // try {
        //     setApiLoading(true);
        //     ticketApi.getAllPurchasedTickets(id)
        //         .then((result) => {
        //             console.log('result', result);
        //             if (result && result.status == 200) {
        //                 console.log("RentersData:", result.data.data);
        //                 setRentersData(result.data.data);
        //             } else {
        //                 console.log(result);
        //             }
        //             setApiLoading(false);
        //         })
        //         .catch((error) => {
        //             setApiLoading(false);
        //         });
        // } catch (error) {
        //     setApiLoading(false);
        // }
        setApiLoading(false);
    };
    return (
        <>
            <div className="darkPurpleBackground purchasers circularRadius mt-1 px-3">
                {!apiLoading ?
                    <>
                        <div className="pt-3 px-5">
                            {rentersData?.length > 0 ? <>
                                {rentersData?.map((purchasedTicket, index) => {
                                    return (
                                        <div className="d-flex align-items-center gap-3 mb-3" key={index}>
                                            <img src={purchasedTicket?.address?.photo ? purchasedTicket?.address?.photo : User.src} className="circularRadiusLg" width={"40px"} height={"40px"} />
                                            <div>
                                                <p className="descriptionColor m-0 pt-1 ps-3">by {purchasedTicket?.address?.name}, {Moment(purchasedTicket?.updatedAt, dates.MMDDYYYYHHMM)}</p>
                                                <p className="descriptionColor m-0 ps-3">Count: {purchasedTicket?.tickets?.filter((data => data.ticketId == id))[0]?.count}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </> : <>
                                <div className="d-flex m-3 py-5 justify-content-center">
                                    <div className="mLargeBoldText smallFont">No renters</div>
                                </div>
                            </>}


                        </div>
                    </> : <>
                        <Spinner />
                    </>
                }

            </div>
        </>
    );
};

export default RentersTab;
