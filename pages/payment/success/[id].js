import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AddEmailModal from "../../../src/components/Modal/addEmailModal";
import { useSelector, useDispatch } from "react-redux";
import Success from "../../../public/assets/images/icons/success.png";
import payment from "../../../src/api/payment";
import RoutePaths from "../../../src/routes/path";
import toast, { Toaster } from "react-hot-toast";
import ticketApi from "../../../src/api/ticketApi";
import saveEarning from "../../../src/pageComponents/event/earnings";
let Index = () => {
    let router = useRouter();
    let id = router.query.id;
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let [emailModal, setEmailModal] = useState(false);
    let [purchasingData, setPurchasingData] = useState();
    let [profile, setProfile] = useState();
    let [earningData, setEarningData] = useState();
    let [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (id) {
            getPaymentDetail();
        }
    }, [id]);

    let getPaymentDetail = async () => {
        setLoading(true);
        setErrorMessage("")
        payment.getPaymentDetails(id).then(async (result) => {
            if (result && result.status == 200) {
                console.log('getPaymentDetail result:', result?.data.data);
                try {
                    // if (result?.data?.data?.payment_status == "unpaid") {
                    //     setErrorMessage("Payment unsuccessful.");
                    // }
                    console.log(`${result?.data?.data?.payment_status == "unpaid" ? "contract listener failed to listen. payment status: unpaid" : result?.data?.data?.blockChain_error ? result?.data?.data?.blockchain_raw : 'payment success'}`)
                    let localProfile = JSON.parse(localStorage.getItem("profile"));
                    setProfile(localProfile)
                    setData(result.data.data);
                    let earnedData = { id: result?.data?.data?.ticket_id?.event_id?._id, earningFor: 'event', earningType: 'stripe', amount: result?.data?.data?.amount, serviceFee: parseFloat((result?.data?.data?.count * (result?.data?.data?.ticket_id?.event_id?.transactionFee / 100) * result?.data?.data?.ticket_id?.stripeAmount).toFixed(2)), royaltyFee: 0 }
                    setEarningData(earnedData)
                    let apiData = {
                        ticket_id: result?.data?.data?.ticket_id?.ticketId,
                        count: result?.data?.data?.count,
                        // success: result?.data?.data?.payment_status == 'unpaid' ? false : result?.data?.data?.blockChain_error ? false : true,
                        // errorMessage: result?.data?.data?.payment_status == 'unpaid' ? 'payment status unpaid.' : result?.data?.data?.blockChain_error ? result?.data?.data?.blockchain_raw : '',
                        success: true,
                        errorMessage: '',
                        paymentType: 'USD'
                    }
                    setPurchasingData(apiData);
                    if (localProfile?.email) {
                        ticketApi.buyTicketsMail(apiData).then(res => {
                            console.log(res.data);
                        }).catch(error => {
                            toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                        })
                    } else {
                        setEmailModal(true);
                    }
                    await saveEarning(result?.data?.data?.ticket_id?.event_id?._id, 'event', 'stripe', result?.data?.data?.amount, parseFloat((result?.data?.data?.count * (result?.data?.data?.ticket_id?.event_id?.transactionFee / 100) * result?.data?.data?.ticket_id?.stripeAmount).toFixed(2)), 0)
                    // if (result?.data?.data?.blockChain_error) {
                    //     setErrorMessage(result?.data?.data?.blockchain_raw)
                    //     toast.error(result?.data?.data?.blockchain_raw);
                    // } else {
                    //     if (result?.data?.data?.payment_status == "paid")
                    //         await saveEarning(result?.data?.data?.ticket_id?.event_id?._id, 'event', 'stripe', result?.data?.data?.amount, parseFloat((result?.data?.data?.count * (result?.data?.data?.ticket_id?.event_id?.transactionFee / 100) * result?.data?.data?.ticket_id?.stripeAmount).toFixed(2)), 0)
                    // }
                    setLoading(false);
                } catch (error) {
                    console.log("🚀 ~ file: [id].js:74 ~ payment.getPaymentDetails ~ error:", error)
                    // setErrorMessage(error.message);
                }

            }
        })
            .catch((err) => {
                setLoading(false);
                setErrorMessage(err?.response?.data?.msg ? err?.response?.data?.msg : err.message)
                toast.error(err?.response?.data?.msg ? err?.response?.data?.msg : err.message);
            });

    };
    let mintAgainAfterBlockchainError = async () => {
        setLoading(true);
        setErrorMessage("")
        payment.mintTicketAfterPayment(id).then(async (result) => {
            console.log('mintTicketResult', result.data.data)
            if (result && result.status == 200) {
                // toast.success('Minted ticket successfully')
                if (result?.data?.data?.payment_status == "unpaid") {
                    setErrorMessage("Payment unsuccessful.");
                }
                let localProfile = JSON.parse(localStorage.getItem("profile"));
                //await saveEarning(earningData.id, earningData.earningFor, earningData.earningType, earningData.amount, earningData.serviceFee, earningData.royaltyFee)
                let apiData = {
                    ticket_id: result?.data?.data?.ticket_id,
                    count: result?.data?.data?.count,
                    success: result?.data?.data?.payment_status == 'unpaid' ? false : result?.data?.data?.blockChain_error ? false : true,
                    errorMessage: result?.data?.data?.payment_status == 'unpaid' ? 'payment status unpaid.' : result?.data?.data?.blockChain_error ? result?.data?.data?.blockchain_raw : '',
                    paymentType: 'USD'
                }
                setPurchasingData(apiData);
                if (localProfile?.email) {
                    ticketApi.buyTicketsMail(apiData).then(res => {
                        console.log(res.data);
                    }).catch(error => {
                        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                    })
                } else {
                    setEmailModal(true);
                }
                if (result?.data?.data?.blockChain_error) {
                    setErrorMessage(result?.data?.data?.blockchain_raw)
                    toast.error(result?.data?.data?.blockchain_raw);
                } else {
                    await saveEarning(earningData.id, earningData.earningFor, earningData.earningType, earningData.amount, earningData.serviceFee, earningData.royaltyFee);
                }
                // setPurchasingData(apiData);
                // setEmailModal(true);
                setData(result.data.data);
            }
            setLoading(false);
        }).catch((err) => {
            toast.error(err?.response?.data?.msg ? err?.response?.data?.msg : err.message);
            setErrorMessage(err?.response?.data?.msg ? err?.response?.data?.msg : err.message)
            setLoading(false);
        })

    };

    return (
        <>
            <div className="container mainScreen">
                <div className="d-flex flex-column justify-content-center align-items-center fullScreenHome">
                    {!loading ? <>
                        {errorMessage == "" ?
                            <>
                                <img className="pt-5" src={Success.src} />
                                <h4 className="pt-5 greenColor">Payment Successful!</h4>
                                <h5 className="  descriptionColor text-center">Transaction number: {data._id}</h5>
                                <small className="pb-5 descriptionColor">Please note that if the ticket is not displayed, kindly wait for 24 hours or contact the administrative support team for further assistance.</small>
                                <div className="shadowBorderOutline halfScreen py-2" >
                                    <div className=" d-flex px-2 justify-content-between ">
                                        <div className="descriptionColor">Amount Paid:</div>
                                        <div className="text-end boldText">${(data?.amount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    </div>
                                    <div className=" d-flex px-2 justify-content-between  ">
                                        <div className="descriptionColor">Total Tickets:</div>
                                        <div className="text-end boldText">{data?.count}</div>
                                    </div>
                                </div>
                                {!data?.iframeCall &&
                                    <Link href={data?.ticket_id?.event_id?.slug ? RoutePaths.events + "/" + data?.ticket_id?.event_id?.slug : RoutePaths.events}>
                                        <a className="btn filledButton my-5" >Back to website</a>
                                    </Link>}
                                {console.log('profileEmail', profile)}
                                {!profile?.email ? <>
                                    <AddEmailModal show={emailModal} setShow={setEmailModal} data={purchasingData} profile={profile} />
                                </> : <></>}
                            </>
                            : <>
                                <h4 className="pt-5 redColor">Minting ticket error: {errorMessage}</h4>
                                <button className="btn filledButton my-5" onClick={mintAgainAfterBlockchainError}>Retry</button>
                                <Link href={data?.ticket_id?.event_id?.slug ? RoutePaths.events + "/" + data?.ticket_id?.event_id?.slug : RoutePaths.events}>
                                    <a className="btn filledButton " >Back to website</a>
                                </Link>
                            </>

                        }
                    </> : <>
                        <div className="spinner-grow spinner text-success" role="status"></div>
                    </>}


                </div>
            </div>
        </>
    )
}

export default Index;