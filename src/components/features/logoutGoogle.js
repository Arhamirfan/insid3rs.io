import React, { useState, useEffect } from "react";
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { gapi } from 'gapi-script';
import Actions from "../../store/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";
let GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

let LogoutGoogle = () => {
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    // useEffect(() => {
    //     setTimeout(() => {
    //         googleActive()
    //     }, 5000);
    // }, []);

    // const googleActive = async () => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: GOOGLE_CLIENT_ID,
    //             scope: ''
    //         });
    //         gapi.load('client:auth2', initClient);
    //     };
    // }

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
        console.log("logout successfully")
    };

    return (
        <>
            <div className="">
                {wallet.address != "" ? (
                    <>
                        {/* <GoogleLogout clientId={GOOGLE_CLIENT_ID} buttonText="Log out" onLogoutSuccess={logOut} render={renderProps => (
                                <p className="mb-0" onClick={renderProps.onClick}>
                                    Log Out
                                </p>
                            )} /> */}
                        {wallet?.profile?.account_type == "GOOGLE" && (
                            <p>Log out</p>
                        )}
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
        </>
    )
}

export default LogoutGoogle