import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import AuthApi from "../../api/auth";
import Actions from "../../store/Actions/Actions";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { connectEmail } from "../../services/blockChain/contractMethods";
import { getAccountBalance } from "../../services/blockChain/metaMaskConnection"
import GoogleLogoutImage from "../../../public/assets/images/icons/googleButton.svg"
let LoginWithGoogle = (props) => {
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    const onSuccess = (res) => {
        try {
            let data = { token: res.credential }
            props.setConnecting(true);
            AuthApi.authWithGoogle(data).then(res => {
                data.address = res.data.data.address;
                AuthApi.loginWithGoogle(data).then(async res => {
                    if (res.status == 200) {
                        let profile = res.data.data;
                        let balance = await getAccountBalance(profile.address, profile?.email, 'METAKEEP');
                        let resData = await connectEmail(profile, "GOOGLE");
                        console.log('profileResult:', resData)
                        if (resData?.connected) {
                            toast.success('Successfully logged in.');
                            dispatch(Actions.updateWallet({ address: profile.address, balance, profile }));
                        } else {
                            toast.error(resData?.messages);
                            localStorage.setItem("walletType", "");
                            localStorage.removeItem("token");
                            dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
                        }
                        props.setConnecting(false);
                        props.handleClose();
                    }
                }).catch(error => {
                    console.log('loginErrorAfterApi', error)
                    toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                    props.setConnecting(false)
                    localStorage.setItem("walletType", "");
                    localStorage.removeItem("token");
                    dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
                })




            }).catch(error => {
                console.log("🚀 ~ file: buyTicketModalData.js:49 ~ ticketApi.googleAuth ~ error:", error)
                toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                props.setConnecting(false)
            })

        } catch (error) {
            console.log('loginErrorGoogleSuccess', error)
            props.setConnecting(false)
        }
    };
    const onFailure = () => {
        toast.error('Google login failed.')
        props.setConnecting(false)
    };
    const logOut = () => {
        // setGoogleLogin(false);
        props.setConnecting(false)
        localStorage.removeItem("token");
        dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
        console.log("logout successfully")
    };

    return (
        <>
            <div className="d-flex flex-row justify-content-center font">
                {wallet.address != "" ? (
                    <>
                        {wallet?.profile?.account_type == "GOOGLE" && (
                            <div className="walletConnect pointer" onClick={logOut}  >
                                <div className="d-flex flex-row justify-content-start align-items-center  p-3">
                                    <img src={GoogleLogoutImage.src} alt="" className="imageHeight" />
                                    <div className="semibold flex-grow-1 text-center me-5">    Log out </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>

                        <GoogleLogin
                            shape="pill"
                            logo_alignment="left"
                            width="250"
                            onSuccess={credentialResponse => { onSuccess(credentialResponse) }}
                            onError={() => { onFailure(); }}
                        />
                    </>
                )}
            </div>

        </>
    )
}

export default LoginWithGoogle