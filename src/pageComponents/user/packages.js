import React, { useState, useEffect } from 'react'
import appApi from '../../api/app';
import toast, { Toaster } from "react-hot-toast";
import TicketResellerDetailCard from "../../components/Cards/resellerTicketDetailCard";
import Spinner from '../../components/spinner/Index';
const MyPackages = ({ ticketDataPrevious }) => {
    let [ticketData, setTicketData] = useState([]);
    let [apiLoading, setApiLoading] = useState(true);
    useEffect(() => {
        if (ticketDataPrevious) {
            console.log('purchasedTicketRecalled')
            getPurchasedTickets();
        }
    }, [ticketDataPrevious]);

    let getPurchasedTickets = async () => {

        appApi.getMyPackages()
            .then((result) => {
                if (result && result.status == 200) {
                    console.log("myPackagesData:", result.data.data);
                    setTicketData(result.data.data);
                }
                setApiLoading(false);
            })
            .catch((error) => {
                console.log("🚀 ~ file: packages.js:24 ~ getPurchasedTickets ~ error", error)
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

                    {ticketData && ticketData.length > 0 ? (
                        <>
                            <h4 className="mobileCentered" >On Sale Tickets </h4>
                            <div className="mt-5 mb-5 row ">
                                {ticketData?.map((data, index) => {
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

export default MyPackages