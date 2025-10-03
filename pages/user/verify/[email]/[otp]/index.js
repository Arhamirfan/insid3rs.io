import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import RoutePaths from "../../../../../src/routes/path";
import toast from "react-hot-toast";
import authApi from "../../../../../src/api/auth";
let VerifyOtp = () => {
    let router = useRouter();
    let { email, otp } = router.query;
    let [message, setMessage] = useState("");
    let [verified, setVerified] = useState("");
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    useEffect(() => {
        console.log(email, otp);
        if (email && otp) {
            verifyUser();
        }
    }, [email]);
    let verifyUser = () => {
        let values = { email, otp };
        console.log(values);
        authApi.verifyOtp(values).then((result) => {
            if (result && (result.status == 200)) {
                // toast.success('OTP verified.')
                let toastId = toast.loading("updating account status...");
                authApi.verifyAccount(values).then((result) => {
                    if (result && (result.status == 200)) {
                        toast.success('Successfully verified account.', { id: toastId, });
                        setMessage("Successfully verified account.");
                        setVerified(true);
                        // console.log(result);
                    }
                }).catch((error) => {
                    console.log("🚀 ~ file: index.js:37 ~ authApi.verifyAccount ~ error", error)
                    setMessage(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                    toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message, { id: toastId, });
                });
            }
        }).catch((error) => {
            console.log("🚀 ~ file: index.js:27 ~ verifyUser ~ error", error)
            setMessage(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
        });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center quarterFullScreenHome  ">

                <div className="font text-center">
                    <div className="  extrabold xlBoldText">{verified ? 'Email Verified !' : 'Confirming OTP'}</div>
                    {verified ? <>
                        <h4>Your email address has been successfully verified.</h4>
                        <button className="btn filledButton mt-4" onClick={() => { router.push(RoutePaths.events) }}>Return to home</button>
                    </> : <>
                        {message == "" ? <>
                            <div className="container my-5 py-5 ">
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border spinner" role="status"></div>
                                </div>
                            </div>
                        </> : <>
                            <p className="redColor">{message}</p>
                        </>}
                    </>}
                </div>
            </div>

        </>
    )
}

export default VerifyOtp