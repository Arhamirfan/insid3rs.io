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
//images  
import insiderLogo2 from "../../../public/assets/images/insidersAboutTopLogo.svg";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../store/Actions/Actions";
import ProfileDropdown from "./ProfileDropdown";
import LoginModal from "../Modal/loginModal";
import globalServices from "../../utils/globalServices";
// let LoginWithGoogle = dynamic(() => import("../features/loginWithGoogle"), {
//   ssr: false,
// })



let NavbarComponent = () => {
  let [connecting, setConnecting] = useState(false);
  let [show, setShow] = useState(false);
  let [signUpTab, setSignUpTab] = useState(false);
  let [screens, setScreen] = useState({ width: "0px", height: "0px" });
  let wallet = useSelector(state => state.wallet);
  let party = useSelector(state => state.party);
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
    // initializeConnection();
    setScreen({ width: screen.width - 20, height: screen.height + 1000 });
  }, [])

  // let initializeConnection = () => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     if (wallet.address == "") {
  //       let walletType = localStorage.getItem("walletType");
  //       if (walletType == "METAMASK") {
  //         walletConnection("", true);
  //       } else if (walletType == "METAKEEP") {
  //         connectMetaKeepFun(true)
  //       } else if (walletType == "EMAIL") {
  //         emailConnection("EMAIL");
  //       } else if (walletType == "GOOGLE") {
  //         emailConnection("GOOGLE");
  //       }
  //     }
  //   }
  // }

  // let emailConnection = async (walletType) => {
  //   if (wallet.address == "" && !connecting) {
  //     setConnecting(true)
  //     let toastId = toast.loading(`Waiting to connect with ${walletType}...`);
  //     try {
  //       let profile = JSON.parse(localStorage.getItem("profile"))
  //       console.log('profile', profile);
  //       let balance = await getAccountBalance(profile.address);
  //       let resData = await connectEmail(profile, walletType);
  //       console.log('profileResult:', resData)
  //       if (resData?.connected) {
  //         toast.success('Successfully logged in.', { id: toastId });
  //         dispatch(Actions.updateWallet({ address: profile.address, balance, profile }));
  //       } else {
  //         toast.error(resData?.messages, { id: toastId });
  //         localStorage.setItem("walletType", "");
  //         localStorage.removeItem("token");
  //         dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
  //       }
  //       setConnecting(false)
  //     } catch (error) {
  //       toast.error(error.message, { id: toastId });
  //       setConnecting(false)
  //     }
  //   }
  // }
  // let walletConnection = async (network, autoConnect) => {
  //   if (wallet.address == "") {
  //     setConnecting(true)
  //     let toastId = toast.loading("Waiting to connect metamask...");
  //     let result = await connectMetaMask(network, autoConnect);
  //     console.log(result);
  //     if (result?.connected) {
  //       if (result.connected) {
  //         dispatch(Actions.updateWallet({ address: result.account, balance: result.balance, profile: result.profile }));
  //         localStorage.setItem("token", result.profile.token);
  //         localStorage.setItem("profileId", result.profile._id);
  //         localStorage.setItem("profile", JSON.stringify(result.profile));
  //         localStorage.setItem("walletType", "METAMASK");
  //         setShow(false)
  //       }
  //       toast.success(result.messages, {
  //         id: toastId,
  //       });
  //     } else {
  //       toast.error(result.messages, {
  //         id: toastId,
  //       });
  //     }
  //     setConnecting(false)
  //   }
  // };
  // // *********************************meta keep login


  // let connectMetaKeepFun = async (autoConnect) => {
  //   if (wallet.address == "" && !connecting) {
  //     setConnecting(true)
  //     let toastId = toast.loading("Waiting to connect meta keep...");
  //     let result = await connectMetakeep(autoConnect);
  //     console.log(result);
  //     if (result?.connected) {
  //       if (result.connected) {
  //         dispatch(Actions.updateWallet({ address: result.account, balance: result.balance, profile: result.profile }));
  //         localStorage.setItem("token", result.profile.token);
  //         localStorage.setItem("profileId", result.profile._id);
  //         localStorage.setItem("profile", JSON.stringify(result.profile));
  //         localStorage.setItem("walletType", "METAKEEP");
  //         toast.success(result.messages, { id: toastId, });
  //         setShow(false)
  //       }
  //     } else {
  //       toast.error("Login failed", { id: toastId });
  //       localStorage.setItem("walletType", "");
  //       localStorage.removeItem("token");
  //       dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
  //     }
  //     setConnecting(false)
  //   }
  // };

  let handleSubmit = (e) => {
    e.preventDefault();
    let searchValue = document.getElementById("searching").value;
    if (searchValue.trim().length > 0) {
      console.log("SearchData:", searchValue);
      router.push(RoutePaths.search + "/" + searchValue);
    } else {
      toast.error("No value provided to search", {
        id: toastId,
      });
    }
  }

  return (
    <>
      <Navbar fixed="top" bg="transparent" className={`font p-0 blurryScroll`} variant="dark" expand="xl">
        <Container fluid >
          {!globalServices.isIframeWebsite() ? <>
            <Link href={RoutePaths.events}>
              <img
                src={insiderLogo2.src}
                width="160px"
                height="85px"
                className="pointer coverImg px-2"
              />
            </Link></> : <>
            <img onClick={() => router.back()}
              src={insiderLogo2.src}
              width="160px"
              height="85px"
              className="pointer coverImg px-2"
            />
          </>}


          <center className="ms-auto">
            {wallet.address != "" ? (
              <div className="d-block d-lg-none"> <ProfileDropdown /></div>
            ) : ""}
          </center>
          <Navbar.Toggle aria-controls="navbarScroll " />
          <Navbar.Collapse id="navbarScroll">
            {!globalServices.isIframeWebsite() ? <>
              <Form className="d-flex ps-lg-3" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  id="searching"
                  placeholder="Search Event, tickets"
                  className="searchBarController"
                ></Form.Control>
              </Form>

              <Nav className="ms-auto pt-2 pt-md-0 text-end dropdown-item gap-3 w-auto topHeaderNavigationBar" navbarScroll>
                <Link
                  href={RoutePaths.events}
                >
                  Events
                </Link>
                <Link
                  href={RoutePaths.creators}
                >
                  Creators
                </Link>
                <Link
                  href={RoutePaths.about}
                >
                  About
                </Link>
                <Link
                  href={RoutePaths.contact}
                >
                  Contact
                </Link>
                <Link
                  href="https://www.blog.insid3rs.io/"
                >
                  Blog
                </Link>
              </Nav>
            </> : <>
              <Nav className="ms-auto text-center dropdown-item gap-3 w-auto topHeaderNavigationBar" navbarScroll>
                <a><p></p></a>
              </Nav>
            </>}

            {wallet.address == "" ? (
              <div className="text-end">
                <Button
                  variant="transparent"
                  disabled={connecting}
                  onClick={() => {
                    handleShow();
                  }}
                  className={`mt-2 px-4 walletButton`}
                >
                  {connecting ? "Connecting" : "Login or Create Profile"}
                </Button>
              </div>
            ) : (
              <div className="d-none d-lg-block"><ProfileDropdown wallet={wallet} /></div>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ******************************************************************** */}
      <LoginModal setShow={setShow} show={show} autoCall={true} />


      {/* *********************************** */}
      {party && <Confetti
        width={`${screens.width}px`}
        height={`${screens.height}px`}
      />}
      {/* *********************************** */}

    </>
  );
};

export default NavbarComponent;
