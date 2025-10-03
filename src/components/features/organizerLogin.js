import React, { useState, useEffect } from "react";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import AuthApi from "../../api/auth";
import toast, { Toaster } from 'react-hot-toast';
import Actions from "../../store/Actions/Actions";
import Modal from 'react-bootstrap/Modal';
import QrReader from 'modern-react-qr-reader'
import { useRouter } from "next/router";
import EventApi from "../../api/eventApi";
import Moment from "../../utils/date";
import getExtension from "../../utils/extension";
import { dates } from "../../constants/staticData";
import Error from "/public/assets/images/icons/error.png";
import GoogleLogoutImage from "/public/assets/images/icons/googleButton.svg"
let GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

let OrganizerLogin = (props) => {
    let router = useRouter();
    const [connected, setConnect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [eventLoading, setEventLoading] = useState(false);
    const [scan, setScan] = useState(false);
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorShow, setErrorShow] = useState(false);
    let [eventData, setEventData] = useState();
    const [ticketDetails, setTicketDetails] = useState({});
    const [googleToken, setGoogleToken] = useState(false);
    let id = router.query.id;
    // useEffect(() => {
    //     googleActive()
    // }, []);


    useEffect(() => {
        if (id) {
            getEventById();
        }
    }, [id]);

    let getEventById = async () => {
        try {
            setEventLoading(true);
            EventApi.getEventByDbId(id)
                .then((result) => {
                    if (result && result.status == 201) {
                        console.log("EventData:", result.data.data);
                        setEventData(result.data.data);
                    } else {
                        console.log('else:', result);
                    }
                    setEventLoading(false);
                })
                .catch((error) => {
                    setEventLoading(false);
                    //toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                    setErrorShow(true);
                    setErrorMessage(error?.response?.data?.msg ? error?.response?.data?.msg : error?.message)
                    console.log("🚀 ~ file: organizerLogin.js:48 ~ getEventById ~ error", error)
                });
        } catch (error) {
            setEventLoading(false);
            //toast.error(error.message);
            setErrorShow(true);
            setErrorMessage(error?.message)
            console.log("🚀 ~ file: organizerLogin.js:51 ~ getEventById ~ error", error)
        }
    };

    // const googleActive = async () => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: GOOGLE_CLIENT_ID,
    //             scope: ''
    //         });
    //         gapi.load('client:auth2', initClient);
    //     };
    // }

    const onSuccess = (res) => {
        try {
            if (!loading) {
                let data = {
                    token: res.credential,
                    event_id: id
                }
                setGoogleToken(res.credential)
                console.log("success", data)
                AuthApi.scanLogin(data).then(async res => {
                    console.log(res)
                    setConnect(true);
                    if (res.status == 200) {
                        setLoading(false);
                        setScan(true);
                        if (res?.data?.msg) {
                            toast.success(res?.data?.msg);
                        }
                    }
                }).catch(error => {
                    console.log(error)
                    setLoading(false);
                    setErrorShow(true);
                    setErrorMessage(error?.response?.data?.msg ? error?.response?.data?.msg : 'Login failed.')
                    setScan(false);
                })
            }
        } catch (error) {
            setScan(false);
            console.log(error)
            setLoading(false);
        }
    };
    const onFailure = (err) => {
        toast.error("Google login failed.");
        setLoading(false);
    };
    const logOut = () => {
        setScan(false);
    };

    const login = useGoogleLogin({
        onSuccess: codeResponse => onSuccess(codeResponse),
        onError: () => onFailure()
    });
    const previewStyle = {
        height: 240,
        width: 320,
        margin: 'auto'
    }
    let handleScan = (data) => {
        console.log("success", data);
        if (data && !show) {
            let apiData = {
                token: googleToken,
                event_id: id,
                scan_records: data?.toString().split(','),
            }
            console.log(apiData);
            setLoading(true);
            AuthApi.scanTicketBarCode(apiData).then(async res => {
                console.log(res)
                if (res.status == 200) {
                    setLoading(false);
                    if (res?.data?.msg) {
                        toast.success(res?.data?.msg);
                        setShow(true);
                        let purchasedEventDetails = res?.data?.data?.purchasedEventDetails
                        purchasedEventDetails.ticket = purchasedEventDetails?.tickets.filter(data => data?.ticketId?._id == apiData?.scan_records[1])[0];
                        console.log(purchasedEventDetails);
                        setTicketDetails(purchasedEventDetails)
                    }
                }
            }).catch(error => {
                console.log(error)
                setLoading(false);
                setErrorShow(true);
                setErrorMessage(error?.response?.data?.msg ? error?.response?.data?.msg : "Login failed.")
            })
        }
    }
    let handleError = (err) => {
        alert("can not access your camera.")
    }
    return (
        <>
            {loading ? (
                <div className="OrganizerLoginLoader">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden font">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {scan ? (
                        <>
                            <br />
                            <br />
                            <br />
                            <h4 className="text-center font darkGreyColor extrabold">Scan QR Code</h4>
                            <br />
                            <div className="scanContainer">
                                <QrReader
                                    facingMode={"environment"}
                                    delay={1000}
                                    style={previewStyle}
                                    onError={handleError}
                                    onScan={handleScan}
                                />

                            </div>
                            <br />
                            <br />
                            <br />
                            <br />

                            <div className="d-flex flex-row justify-content-center">
                                <div className="walletConnect pointer" onClick={logOut}  >
                                    <div className="d-flex flex-row justify-content-start align-items-center  p-1">
                                        <img src={GoogleLogoutImage.src} alt="" className="imageHeight ms-2" />
                                        <div className="semibold flex-grow-1 text-center me-2">Log out from Google</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="darkGreyBackground">
                                <div className="organizerLoginScreen font">
                                    <div className="organizerLoginBoxScreen px-1 px-md-2">
                                        <div className="py-3">
                                            <div className="text-center pt-3 pt-md-5">
                                                <h3 className="darkGreyColor extrabold">Welcome Team!</h3>
                                                <p className=" mb-3 darkGreyColor">Ready to get started? Sign in below to begin<br /> scanning tickets.</p>
                                            </div>
                                            {!eventLoading ? <>
                                                {eventData?._id ? <>
                                                    <div className="pt-3 organizerEventImage px-3">
                                                        {eventData?.image && getExtension(eventData?.image) !== 'mp4' ?
                                                            <img src={eventData?.image} layout="responsive" className="coverImg" /> :
                                                            <>
                                                                <video src={eventData?.image} loop muted autoPlay className="coverImg" />
                                                            </>
                                                        }
                                                    </div>
                                                    <div className="px-3">
                                                        <div className="d-flex flex-column justify-content-start pt-3">
                                                            <small className="descriptionColor">Event Name</small>
                                                            <p className="pintFont semibold">{eventData?.eventName}</p>
                                                            <small className="descriptionColor">Location</small>
                                                            <p className="pintFont semibold">{eventData?.location}</p>
                                                            <small className="descriptionColor">Dates</small>
                                                            <p className="pintFont semibold">{Moment(eventData?.startDate, dates.MMDDYYYY)} - {Moment(eventData?.endDate, dates.MMDDYYYY)} </p>
                                                            <small className="descriptionColor">Description</small>
                                                            <p className="pintFont darkGreyColor">{eventData?.description}</p>
                                                        </div>
                                                    </div>
                                                </> : <div className="text-center ">
                                                    <p className="redColor semiBold">Error getting event data.</p>
                                                </div>}

                                            </> : <>
                                                <div className="container my-5 py-5 ">
                                                    <div className="d-flex justify-content-center">
                                                        <div className="spinner-border spinner" role="status"></div>
                                                    </div>
                                                </div>
                                            </>}

                                            <div className="d-flex flex-row justify-content-center pt-4 ">
                                                <GoogleLogin
                                                    shape="pill"
                                                    logo_alignment="left"
                                                    width="250"
                                                    onSuccess={credentialResponse => { onSuccess(credentialResponse) }}
                                                    onError={() => { onFailure(); }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    )}
                </>
            )}
            <div className="font">
                {/* ticket verified modal */}
                <Modal show={show} onHide={() => {
                    setShow(false);
                }}>
                    <Modal.Body className="noPaddingModal">
                        {/* <div className="organizerEventImage">
                        <img src={ticketDetails?.ticket?.ticketId?.image} layout="responsive" className="coverImg" />
                    </div> */}
                        <div className="topContainer">
                            {ticketDetails?.ticket?.ticketId?.image && getExtension(ticketDetails?.ticket?.ticketId?.image) !== 'mp4' ?
                                <img src={ticketDetails?.ticket?.ticketId?.image} alt="ticket_image" className="coverImg" /> :
                                <>
                                    <video src={ticketDetails?.ticket?.ticketId?.image} loop muted autoPlay className="coverImg" />
                                </>
                            }
                            <div className="centered">
                                <h6 className="mb-0 semiBold">{ticketDetails?.ticket?.ticketId?.ticketTitle}</h6>
                                <small className="mb-0">{Moment(new Date(), dates.MMMDDYYYY)} . {ticketDetails?.event_id?.location}</small>
                            </div>
                        </div>
                        <div className="container font  mt-3">
                            <div className="row justify-content-start align-items-start">
                                <div className="col-6">
                                    <p className="grayFont xsText mb-0">Ticket Name</p>
                                    <p className="pintFont">{ticketDetails?.ticket?.ticketId?.ticketTitle}</p>
                                </div>
                                <div className="col-6">
                                    <p className="grayFont xsText mb-0">Event Name</p>
                                    <p className="pintFont">{ticketDetails?.event_id?.eventName}</p>
                                </div>
                            </div>
                            <p className="grayFont xsText mb-0">Status</p>
                            <p className="pintFont">Checked in</p>
                        </div>

                        {/* <button  onClick={() => { setShow(false);}} className="btn text-white  ticketVerificationButton pinkBackground xsCircularRadius w-100">Close modal</button> */}
                        <div className="greenBackground text-center success-padding-modal text-white py-2  mt-2">
                            <p className="mb-0">Ticket Verified!</p>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* error modal */}
                <Modal show={errorShow} onHide={() => {
                    setErrorShow(false);
                }}>
                    <Modal.Body  >
                        <div className="container pb-3">
                            <div className="d-flex flex-column align-items-center mt-5 gap-3">
                                <img src={Error.src} height="100" width={"100"} />
                                <h5>{errorMessage}</h5>
                                <div className="mt-3">
                                    <button type="button" className="btn purpleButton" onClick={() => setErrorShow(false)}>Got it</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>


        </>
    )
}

export default OrganizerLogin