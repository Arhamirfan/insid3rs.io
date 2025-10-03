import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Confetti from "react-confetti"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RoutePaths from "../../routes/path";
import Modal from "react-bootstrap/Modal";
//images 
import dynamic from "next/dynamic"
import { connectMetakeep } from "../../services/blockChain/metakeepConnection"
import insiderLogo2 from "../../../public/assets/images/insidersAboutTopLogo.svg";
import insiderLogoBlack from "../../../public/assets/images/icons/insidersLogo.svg";
import metaMaskIcon from "../../../public/assets/images/icons/metamask-icon.png";
import metaKeepIcon from "../../../public/assets/images/icons/MetaKeep-1.png";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../store/Actions/Actions";
import { connectEmail } from "../../services/blockChain/contractMethods";
import { connectMetaMask } from "../../services/blockChain/metaMaskConnection";
import { getAccountBalance } from "../../services/blockChain/metakeepConnection";
import ProfileDropdown from "../header/ProfileDropdown";
import LoginWithEmail from "../features/loginWithEmail";
import SignUpWithEmail from "../features/signUpWithEmail";
import LoginWithGoogle from "../features/loginWithGoogle";
// let LoginWithGoogle = dynamic(() => import("../features/loginWithGoogle"), {
//   ssr: false,
// })



let LoginModal = ({ show, setShow, autoCall }) => {
    let [connecting, setConnecting] = useState(false);
    //   let [show, setShow] = useState(false);
    let [signUpTab, setSignUpTab] = useState(false);
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    let router = useRouter();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logOut = () => {
        console.log("logout successfully")
        localStorage.removeItem("token");
        dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
    };
    useEffect(() => {
        if (autoCall)
            initializeConnection();
    }, [])

    let initializeConnection = () => {
        let token = localStorage.getItem("token");
        if (token) {
            if (wallet.address == "") {
                let walletType = localStorage.getItem("walletType");
                if (walletType == "METAMASK") {
                    walletConnection("", true);
                } else if (walletType == "METAKEEP") {
                    connectMetaKeepFun(true)
                } else if (walletType == "EMAIL") {
                    emailConnection("EMAIL");
                } else if (walletType == "GOOGLE") {
                    emailConnection("GOOGLE");
                }
            }
        }
    }

    let emailConnection = async (walletType) => {
        if (wallet.address == "" && !connecting) {
            setConnecting(true)
            let toastId = toast.loading(`Waiting to connect with ${walletType.toLowerCase()}...`);
            try {
                let profile = JSON.parse(localStorage.getItem("profile"))
                console.log('profile', profile);
                let balance = await getAccountBalance(profile.address, profile?.email, 'METAKEEP');
                let resData = await connectEmail(profile, walletType);
                console.log('profileResult:', resData)
                if (resData?.connected) {
                    toast.success('Successfully logged in.', { id: toastId });
                    dispatch(Actions.updateWallet({ address: profile.address, balance, profile }));
                } else {
                    toast.error(resData?.messages, { id: toastId });
                    localStorage.setItem("walletType", "");
                    localStorage.removeItem("token");
                    dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
                }
                setConnecting(false)
            } catch (error) {
                toast.error(error.message, { id: toastId });
                setConnecting(false)
            }
        }
    }
    let walletConnection = async (network, autoConnect) => {
        if (wallet.address == "") {
            setConnecting(true)
            let toastId = toast.loading("Waiting to connect metamask...");
            let result = await connectMetaMask(network, autoConnect);
            console.log(result);
            if (result?.connected) {
                if (result.connected) {
                    dispatch(Actions.updateWallet({ address: result.account, balance: result.balance, profile: result.profile }));
                    localStorage.setItem("token", result.profile.token);
                    localStorage.setItem("profileId", result.profile._id);
                    localStorage.setItem("profile", JSON.stringify(result.profile));
                    localStorage.setItem("walletType", "METAMASK");
                    setShow(false)
                }
                toast.success(result.messages, {
                    id: toastId,
                });
            } else {
                toast.error(result.messages, {
                    id: toastId,
                });
            }
            setConnecting(false)
        }
    };
    // *********************************meta keep login


    let connectMetaKeepFun = async (autoConnect) => {
        if (wallet.address == "" && !connecting) {
            setConnecting(true)
            let toastId = toast.loading("Waiting to connect meta keep...");
            let result = await connectMetakeep(autoConnect);
            console.log(result);
            if (result?.connected) {
                if (result.connected) {
                    dispatch(Actions.updateWallet({ address: result.account, balance: result.balance, profile: result.profile }));
                    localStorage.setItem("token", result.profile.token);
                    localStorage.setItem("profileId", result.profile._id);
                    localStorage.setItem("profile", JSON.stringify(result.profile));
                    localStorage.setItem("walletType", "METAKEEP");
                    toast.success(result.messages, { id: toastId, });
                    setShow(false)
                }
            } else {
                toast.error("Login failed", { id: toastId });
                localStorage.setItem("walletType", "");
                localStorage.removeItem("token");
                dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
            }
            setConnecting(false)
        }
    };


    return (
        <>
            <Modal show={show} onHide={() => { handleClose(); setSignUpTab(false) }} className="profileModal">
                <Modal.Header closeButton>
                    <Modal.Title ><div className="text-center"><img src={insiderLogoBlack.src} /></div><div className="d-flex justify-content-center mt-3"><div className="semibold mLargeBoldText text-center font">Login / Create your profile</div> </div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {connecting ? (
                        <div className="connectionLoader">
                            <div className="spinner-border text-secondary metaMaskConnectionLoader" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="container pb-sm-1 font">
                            {!signUpTab ? <>
                                {wallet.address == "" ? (
                                    <>

                                        {/* <div className="text-center mb-3">
                    <small >Your Wallet is where all of your tickets, memories, and rewards will be stored. </small>
                    <small>Think of it like a digital safe.</small>
                  </div> */}
                                        <div className="pb-4">
                                            <LoginWithGoogle handleClose={handleClose} setConnecting={setConnecting} />
                                        </div>

                                        <div className="d-flex flex-row justify-content-center ">
                                            <div className="walletConnect pointer" onClick={walletConnection}  >
                                                <div className="d-flex flex-row justify-content-start align-items-center  ps-2">
                                                    <img src={metaMaskIcon.src} alt="" className="imageHeight" />
                                                    <div className="semibold xsText flex-grow-1 text-center mx-2">    Connect with Metamask </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </>
                                ) : (
                                    <>
                                        {wallet?.profile?.account_type == "METAMASK" && (
                                            <>
                                                <div className="connectionContainer " onClick={logOut} >
                                                    <div>
                                                        <img src={metaMaskIcon.src} alt="" />
                                                    </div>
                                                    <div>
                                                        Logout Metamask
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}


                                {wallet.address != "" ? (
                                    <>
                                        {wallet?.profile?.account_type == "METAKEEP" && (
                                            <div className="connectionContainer" onClick={logOut}>
                                                <div>
                                                    <img src={metaKeepIcon.src} alt="" style={{ height: "17px" }} />
                                                </div>
                                                <div>
                                                    Logout from MetaKeep
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="d-flex flex-row justify-content-center ">
                                            <div className="walletConnect pointer" id="metaKeep" onClick={() => connectMetaKeepFun(false)}   >
                                                <div className="d-flex flex-row justify-content-start align-items-center  ps-2">
                                                    <img src={metaKeepIcon.src} alt="" style={{ height: "12px", margin: "10px" }} />
                                                    <div className="semibold xsText flex-grow-1 text-center me-2">    Connect with Metakeep </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                )}
                                {wallet.address == "" ? (
                                    <>
                                        <div className="pt-4"></div>
                                        <p className="text-center textHrTagMiddle">OR</p>
                                        <LoginWithEmail handleClose={handleClose} setConnecting={setConnecting} />
                                        <div className="text-center darkGreyColor pt-2 pt-md-5">
                                            Don&apos;t have an account? <span className="purpleColor medium pointer" onClick={() => setSignUpTab(true)}>Sign up</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {wallet?.profile?.account_type == "EMAIL" && (
                                            <>
                                                <div className="connectionContainer " onClick={() => console.log('logout')} >
                                                    <div>
                                                        {/* <img src={metaMaskIcon.src} alt="" /> */}
                                                    </div>
                                                    <div>
                                                        Logout from EMAIL
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </> : <>
                                <SignUpWithEmail handleClose={handleClose} setConnecting={setConnecting} setSignUpTab={setSignUpTab} walletConnection={walletConnection} connectMetaKeepFun={connectMetaKeepFun} />
                            </>}

                        </div>
                    )}
                </Modal.Body>
            </Modal>


        </>
    );
};

export default LoginModal;
