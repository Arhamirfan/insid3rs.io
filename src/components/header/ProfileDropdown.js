import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import RoutePaths from "../../routes/path";
import Actions from "../../store/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import toast from 'react-hot-toast';
import dynamic from "next/dynamic"
//images 
import User from "../../../public/assets/images/icons/user.png";
import PurpleUser from "../../../public/assets/images/icons/user2.png";
import Logout from "../../../public/assets/images/icons/logout.png";
import TicketIcon from "../../../public/assets/images/icons/ticket.png";
import Ethereum from "../../../public/assets/images/icons/Ethereum.png";
import Copy from "../../../public/assets/images/icons/copy.png";
// let LogoutGoogle = dynamic(() => import("../features/logoutGoogle"), {
//     ssr: false,
// })
let ProfileDropdown = () => {
    let dispatch = useDispatch()
    let wallet = useSelector(state => state.wallet);
    let handleLogout = async () => {
        localStorage.removeItem("token");
        dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
    }
    let copyText = () => {
        if (wallet.address) {
            navigator.clipboard.writeText(wallet.address);
            toast.success('Address Copied.');
        } else {
            toast.error('Address not found.');
        }
    }
    return (
        <>
            <Dropdown className="pe-2 ps-1 " align={'bottom'} drop={'bottom'}>
                <Dropdown.Toggle variant="transparent" className="d-flex align-items-center border-0" >
                    <div className={`profilePictureContainer  ${wallet?.profile?.photo != "" ? "" : "border-0"}`}>
                        {wallet?.profile?.photo != "" ? (
                            <img src={wallet?.profile?.photo} className="profilePhoto" />
                        ) : (
                            <img src={User.src} style={{ height: "20px" }} />
                        )}
                    </div>

                </Dropdown.Toggle>
                <Dropdown.Menu variant="white">
                    <div className="profileDropDown p-3 d-flex flex-column dropdownBox ">
                        <p className="boldText m-0">{wallet?.profile?.name ? wallet?.profile?.name : "User"}</p>
                        <div className="d-flex direction-row justify-content-start align-items-start">
                            <p className="smallText descriptionColor m-0">{wallet?.address.slice(0, 4) + "..." + wallet?.address.slice(-4)}</p>
                            <img src={Copy.src} className="pb-1 ps-2 hoverEffect" onClick={copyText} />
                        </div>
                        <div className="backgroundColor p-3 mt-2 circularRadiusTop">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <div className="circularBackground ps-1">
                                    <img src={Ethereum.src} />
                                </div>
                                <div className="row align-items-center">
                                    <div className="col "><p className="text-white zeroMargin xsText">Balance</p></div>
                                    <div className="col  "><p className="text-white zeroMargin smallText"><span className="purpleColor smallText boldText">{wallet?.balance} MATIC</span> </p></div>
                                </div>
                            </div>
                        </div>
                        <Dropdown.Item className="dropdowns mt-3 zeroPadding">
                            <img src={PurpleUser.src} className="pe-2" />
                            <Link className=" " href={RoutePaths.myProfile}>My Profile</Link>
                        </Dropdown.Item>
                        <hr className=" zeroMargin p-2 mt-2" ></hr>
                        <Dropdown.Item className="dropdowns zeroPadding">
                            <img src={TicketIcon.src} className="pe-2" />
                            <Link className="" href={RoutePaths.myEvents}>My Tickets</Link>
                        </Dropdown.Item>
                        {/* <hr className=" zeroMargin p-2 mt-2" ></hr> */}
                        {/* <Dropdown.Item className="dropdowns zeroPadding">
                            <img src={Settings.src} className="pe-2" />
                            <Link className=" " href={RoutePaths.myProfile}> Settings</Link>
                        </Dropdown.Item> */}
                        <hr className=" zeroMargin p-2 mt-2" ></hr>
                        <Dropdown.Item className="dropdowns zeroPadding">
                            <div className="d-flex flex-row align-items-center">
                                <img src={Logout.src} className="pe-2" />
                                <a className="" href={"#"} onClick={handleLogout}>Log Out</a>
                                {/* {wallet?.profile?.account_type == "GOOGLE" ? <LogoutGoogle /> : <a className="" href={"#"} onClick={handleLogout}>Log Out</a>} */}
                            </div>

                        </Dropdown.Item>

                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ProfileDropdown