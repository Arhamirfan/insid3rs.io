import React, { useState, useEffect } from 'react'
import appApi from '../../api/app';
import toast, { Toaster } from "react-hot-toast";
import TicketResellerDetailCard from "../../components/Cards/resellerTicketDetailCard";
import Spinner from '../../components/spinner/Index';
let MyPurchasedPackages = () => {
    let [purchasedTicketData, setPurchasedTicketData] = useState([]);
    let [apiLoading, setApiLoading] = useState(true);
    useEffect(() => {
        getPurchasedTicketData();
    }, []);

    let getPurchasedTicketData = async () => {

        appApi.getMyPurchasedPackages()
            .then((result) => {
                if (result && result.status == 200) {
                    setPurchasedTicketData(result.data.data);
                }
                setApiLoading(false);
            })
            .catch((error) => {
                console.log("🚀 ~ file: purchasedPackages.js:25 ~ getPurchasedTickets ~ error", error)
                if (error?.response?.data?.msg) {
                    toast.error(error?.response?.data?.msg);
                } else {
                    toast.error(error.message);
                }
                setApiLoading(false);
            });

    };
    return (
        <>
            {apiLoading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    {purchasedTicketData && purchasedTicketData.length > 0 ? (
                        <>
                            <div className='mobileCentered'>
                                <h4>Purchased Tickets from RESELLER</h4>
                            </div>
                            <div className="mt-5 mb-5 row ">
                                {purchasedTicketData?.map((data, index) => {
                                    return (
                                        <>
                                            <div
                                                className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                                                key={index}
                                            >
                                                <TicketResellerDetailCard eventData={data} index={index} />
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </>
                    ) :
                        <>
                            {/* <div className="d-flex m-3 justify-content-center">
                                <h3>No Package Found.</h3>
                            </div> */}

                        </>
                    }
                </>
            )
            }
        </>
    )
}

export default MyPurchasedPackages