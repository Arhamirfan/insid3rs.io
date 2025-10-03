import React, { useState, useEffect } from "react";
import AuthApi from "../../api/auth";
import Actions from "../../store/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import { connectMetakeep } from "../../services/blockChain/metakeepConnection"
import metaMaskIcon from "../../../public/assets/images/icons/MetaKeep-1.png";
import toast, { Toaster } from "react-hot-toast";
let LoginWithMetaKeep = (props) => {
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    const [connected, setConnect] = useState(false);


    let connectMetaKeep = async (network, autoConnect) => {
        if (wallet.address == "") {
            props.setConnecting(true)
            let toastId = toast.loading("Waiting to connect...");
            let result = await connectMetakeep();
            console.log(result);
            if (result?.connected) {
                if (result.connected) {
                    dispatch(Actions.updateWallet({ address: result.account, balance: result.balance, profile: result.profile }));
                    localStorage.setItem("token", result.profile.token);
                    localStorage.setItem("profileId", result.profile._id);
                    localStorage.setItem("profile", JSON.stringify(result.profile)); 
                    localStorage.setItem("walletType", "METAKEEP");
                }
                toast.success(result.messages, {
                    id: toastId,
                });
            } else {
                toast.error("Login failed", {
                    id: toastId,
                });
            }
            props.setConnecting(false)
        }
    };
    const logOut = () => {
        console.log("logout successfully")
        localStorage.removeItem("token");
        dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
    };

    return (
        <>
            <div className="">
                {wallet.address != "" ? (
                    <>
                        {wallet?.profile?.account_type == "METAKEEP" && (
                            <div className="connectionContainer" onClick={logOut}>
                                <div>
                                    <img src={metaMaskIcon.src} alt="" style={{ height: "17px" }} />
                                </div>
                                <div>
                                    Logout from MetaKeep
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="connectionContainer" onClick={connectMetaKeep}>
                        <div>
                            <img src={metaMaskIcon.src} alt="" style={{ height: "17px" }} />
                        </div>
                        <div>
                            Connect with MetaKeep
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default LoginWithMetaKeep