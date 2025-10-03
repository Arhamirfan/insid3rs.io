import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import RoutePaths from "../../../../routes/path";
import ticketApi from '../../../../api/ticketApi'
import AppApi from '../../../../api/app'
import TicketsTab from "./ticketsTabs";
import { useSelector, useDispatch } from "react-redux";
import { buyPackage, bidOnAuction, AcceptYourHighestBid } from "../../../../services/blockChain/contractMethods"
import Swal from 'sweetalert2'
import toast, { Toaster } from "react-hot-toast";
import totalTicketsCount from "../../../../components/Cards/ticketCountHook";
import User from "../../../../../public/assets/images/icons/user.png";
import moment from "moment";
import getExtension from "../../../../utils/extension";
import Moment from "../../../../utils/date";
import LoginModal from "../../../../components/Modal/loginModal"
import globalServices from "../../../../utils/globalServices";
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { dates } from "../../../../constants/staticData";
import AddEmailModal from "../../../../components/Modal/addEmailModal";
import Web3 from 'web3';
let TimeCountDown = dynamic(() => import('../../components/timeCountDown'), {
  suspense: false,
})

let TicketDataTabView = ({ ticketData, getTicketsById }) => {
  let router = useRouter();
  let [dropSiteStatusValue, setDropSiteStatus] = useState(true);
  let minBidAmount = useSelector(state => state.auctions.minBidAmount);
  let auctions = useSelector(state => state.auctions.list);
  let wallet = useSelector(state => state.wallet.address);
  let profile = useSelector(state => state.wallet.profile);
  let [modalShow, setModalShow] = useState(false);
  let [show, setShow] = useState(false);
  let [recall, setRecall] = useState(false);
  let [apiLoader, setApiLoader] = useState(false);
  let [bidAmount, setBidAmount] = useState("");
  let [biddingButton, setBiddingButton] = useState(true);
  let [emailModal, setEmailModal] = useState(false);
  let [purchasingData, setPurchasingData] = useState();
  let [profileLocal, setProfile] = useState();
  let web3 = ""
  let updateBidButton = (status) => {
    setBiddingButton(false)
  }
  useEffect(() => {
    if (minBidAmount) {
      setBidAmount(minBidAmount)
    }
  }, [minBidAmount])
  let totalTickets = totalTicketsCount(ticketData);
  let eventPage = () => {
    router.push(RoutePaths.events + "/" + ticketData.eventId._id);
  };

  let getNextPayment = () => {
    return (bidAmount ? (bidAmount + (bidAmount * (ticketData.incrementBidPercentage / 100))) : (ticketData?.minBid + (ticketData?.minBid * (ticketData.incrementBidPercentage / 100))))
  }

  useEffect(() => {
    CheckStatus();
  })
  useEffect(() => {
    if (recall) {
      getTicketsById()
    }
  }, [recall])

  let CheckStatus = async () => {
    let result = await dropSiteStatus();
    // setDropSiteStatus(!result)
  }
  let contractConnection = async () => {
    try {
      let res = await AppApi.getNetworks();
      if (res.status == 200) {
        let network = res.data.data[0];
        let ADDRESS = network.networkAddress
        let ABI = network.networkAbi;
        let contract = new web3.eth.Contract(ABI, ADDRESS);
        return contract
      } else {
        return ""
      }
    } catch (error) {
      console.log(error);
      return error
    }

  }
  let dropSiteStatus = async () => {
    try {
      let ethereum = window.ethereum
      web3 = new Web3(ethereum);
      let contract = await contractConnection();
      if (contract) {
        let result = await contract.methods.paused().call()
        console.log("Drop site status: ", result);
        return result

      } else {
        return { status: true, message: "Contract connection failed." }
      }
    } catch (error) {
      console.log("error on getting dropSiteStatus", error.message)
      return ""
    }
  }

  return (
    <>
      <div className="events py-5 mt-5 container-fluid semibold">
        <div className="container mt-5">
          <div className="row justify-content-center gap-5">
            <div className="col-md-12 col-lg-4">
              {/* image */}
              <Swiper pagination={true} modules={[Autoplay, Pagination]} autoplay={{ delay: 1000, pauseOnMouseEnter: true, disableOnInteraction: false }}>
                {ticketData.tickets.map((ticket, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {getExtension(ticket?.ticketId?.image) !== 'mp4' ?
                        <img src={ticket?.ticketId?.image} layout="responsive" className="coverImg circularRadius" quality={100} sizes="100%" /> :
                        <>
                          <video src={ticket?.ticketId?.image} loop muted autoPlay layout="responsive" className="coverImg circularRadius" quality={100} sizes="100%" />
                        </>
                      }
                    </SwiperSlide>)
                })}

              </Swiper>
            </div>
            <div className="col-md-12 col-lg-7">
              {/* title */}
              <h1 className="minimizeFont">
                {ticketData?.title ? ticketData?.title : ticketData?.tickets[0]?.ticketId?.ticketTitle}
                {`${ticketData?.tickets?.length > 1 ? "" : `(${ticketData?.tickets[0]?.ticketId?.ticketType?.ticketType})`}`}
              </h1>
              {/* view more from event */}
              {ticketData.auction ? null : <>
                <div className="row mt-3">
                  <h5 className="col-12 col-sm-6 purpleColor ">
                    {totalTickets} Total Tickets
                  </h5>
                  <div className="col-12 col-sm-6">
                    {console.log('ticketData', ticketData)}
                    {!ticketData?.eventId?.isPaused ?
                      <>
                        {!globalServices.isIframeWebsite() &&
                          <u
                            className="greyColor smallText hoverEffect"
                            onClick={() => { router.push(RoutePaths.events + "/" + ticketData?.eventId?.slug); }}
                          >
                            View more from this event
                          </u>
                        }
                      </>
                      : <></>}
                  </div>
                </div>
              </>}
              {/* packages count for auction*/}
              {ticketData.auction ?
                <div className="packageDetail my-3">
                  <div className="d-flex pt-2 flex-column flex-md-row justify-content-start gap-5 align-items-center">
                    {ticketData?.tickets?.map((ticket, index) => {
                      return (
                        <div key={index} className="d-flex flex-row gap-2 align-items-center">
                          <h5>{ticket?.count}x</h5>
                          {getExtension(ticket?.ticketId?.image) !== 'mp4' ?
                            <img src={ticket?.ticketId?.image} className="ms-2" width={"35px"} height={"35px"} /> :
                            <>
                              <video src={ticket?.ticketId?.image} loop muted autoPlay className="ms-2" width={"35px"} height={"35px"} />
                            </>
                          }
                          <h5>{`(${ticket?.ticketId?.ticketType.ticketType})`}</h5>
                        </div>
                      );
                    })}
                  </div>
                </div> : null}

              {/* owner */}
              <div className="mt-5">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <h5>Owner</h5>
                    <div className="d-flex align-items-center mb-3">
                      {/* owner image */}
                      {((ticketData?.userId?.photo?.trim().length === 0) || (ticketData?.buyerId?.photo?.trim().length === 0)) ?
                        <img
                          className="circularRadiusLg"
                          src={User.src}
                          width={"30px"}
                          height={"30px"}
                        /> : <>
                          {ticketData.transactionHash ?
                            <img
                              className="circularRadiusLg"
                              src={ticketData?.buyerId?.photo}
                              width={"42px"}
                              height={"42px"}
                            /> :
                            <img
                              className="circularRadiusLg"
                              src={ticketData?.userId?.photo}
                              width={"42px"}
                              height={"42px"}
                            />
                          }

                        </>
                      }
                      <div className="ps-3">
                        <h5>{ticketData?.transactionHash ? ticketData?.buyerId?.name : ticketData?.userId?.name}</h5>
                      </div>
                    </div>
                  </div>
                  {/* event */}
                  <div className="col-12 col-sm-6">
                    <h5>Event</h5>
                    <div className="d-flex align-items-center mb-3">
                      {ticketData?.eventId?.image ? <>
                        {getExtension(ticketData?.eventId?.image) !== 'mp4' ?
                          <img className="circularRadiusLg" src={ticketData?.eventId?.image} width={"42px"} height={"42px"}
                          /> :
                          <>
                            <video className="circularRadiusLg" src={ticketData?.eventId?.image} width={"42px"} height={"42px"} loop muted autoPlay />
                          </>
                        }
                      </>
                        : <img
                          className="circularRadiusLg"
                          src={User.src}
                          width={"30px"}
                          height={"30px"}
                        />
                      }
                      <div className="ps-3 hoverEffect" onClick={() => { router.push(RoutePaths.events + "/" + ticketData?.eventId?.slug); }}>
                        <h5>{ticketData?.eventId?.eventName}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* validFor and venue */}
              {ticketData.auction
                ? <>
                  <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                      <h5>Valid For</h5>
                      <p className="descriptionColor">{Moment(ticketData?.startDate, dates.MMDDYYYY)} to {Moment(ticketData?.endDate, dates.MMDDYYYY)}</p>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h5>Venue</h5>
                      <p className="descriptionColor">{ticketData?.eventId?.location}</p>
                    </div>
                  </div>
                </>
                : <></>}


              <div className="my-5 ticketTabs">
                {ticketData.auction ? <h4>Benefits</h4> : null}

                <TicketsTab data={ticketData} auction={ticketData.auction} />
              </div>

              {/* packages count for fixPrice*/}
              {!ticketData.auction ?
                <div className="packageDetail my-3">
                  <div className="d-flex pt-2 flex-column flex-md-row justify-content-start gap-5 align-items-center">
                    {ticketData?.tickets?.map((ticket, index) => {
                      return (
                        <div key={index} className="d-flex flex-row gap-2 align-items-center">
                          <h5>{ticket?.count}x</h5>
                          {getExtension(ticket?.ticketId?.image) !== 'mp4' ?
                            <img className="ms-2" src={ticket?.ticketId?.image} width={"35px"} height={"35px"}
                            /> :
                            <>
                              <video className="ms-2" src={ticket?.ticketId?.image} width={"35px"} height={"35px"} loop muted autoPlay />
                            </>
                          }
                          <h5>{`(${ticket?.ticketId?.ticketType.ticketType})`}</h5>
                        </div>
                      );
                    })}
                  </div>
                </div> : <></>}

              {/* price card */}
              <div className="my-5">
                {ticketData?.transactionHash != "" ?
                  <div className="container-fluid purpleBackground py-3 px-5 mb-3 circularRadius">
                    <div className="d-flex m-3 justify-content-center">
                      <h4 className="">Ticket purchased by {ticketData?.buyerId?.name}. </h4>
                    </div>
                  </div>
                  :
                  <>
                    {ticketData?.userId?._id == profile?._id ? <>
                      {ticketData.auction ? (
                        <div className="container-fluid purpleBackground py-3 px-5 mb-3 circularRadius">
                          <div className="d-flex  justify-content-between align-items-center">
                            {auctions.length > 0 ? <>
                              <h5><b>Highest Bidder: </b>{auctions?.sort((a, b) => b.bidAmount - a.bidAmount)[0]?.userId?.name}</h5>
                            </> : <>
                              <h5 className="boldText">Own package</h5>
                            </>}
                            {auctions?.length > 0 && (
                              <button
                                disabled={apiLoader}
                                className="ms-xl-5 btn whiteButton"
                                // onClick={() => setModalShow(true)}
                                onClick={async () => {
                                  if (wallet) {
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: "Tickets will be assigned to the highest bidder.",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes'
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        //  **************************************************************************************
                                        setApiLoader(true);
                                        let toastId = toast.loading("Waiting  for your transaction approval...");
                                        let blockChainObject = {
                                          packageID: ticketData?.packageId,
                                          eventID: ticketData?.eventId?.blockchainId,
                                        }
                                        console.log(blockChainObject)
                                        let blockChainResult = await AcceptYourHighestBid(blockChainObject);
                                        console.log("blockChainResult", blockChainResult);
                                        toast("Bid sent successfully.", { id: toastId });
                                        setApiLoader(false)
                                        // **************************************************************
                                        if (blockChainResult?.transactionHash) {
                                          let address = blockChainResult?.events?.bidAccepted?.returnValues[1];
                                          let apiObjects = {
                                            packageId: ticketData?._id,
                                            address,
                                            transactionHash: blockChainResult?.transactionHash,
                                          }
                                          console.log('address', address);
                                          console.log('APIObject:', apiObjects)

                                          ticketApi.acceptBid(apiObjects).then(res => {
                                            if (res.status == 201) {
                                              toast.success("Bid Accepted Successfully.", {
                                                id: toastId,
                                              });
                                            }
                                            setApiLoader(false);
                                            getTicketsById()
                                          }).catch(error => {
                                            if (error?.response?.data?.msg) {
                                              toast.error(error?.response?.data?.msg, {
                                                id: toastId,
                                              });
                                            } else {
                                              toast.error("Failed to sent bid.", {
                                                id: toastId,
                                              });
                                            }
                                            setApiLoader(false)
                                          })

                                        } else {
                                          if (blockChainResult?.status) {
                                            toast.error(blockChainResult.message, {
                                              id: toastId,
                                            });
                                          } else {
                                            toast.error("Transaction failed due to network error.", {
                                              id: toastId,
                                            });
                                          }
                                          setApiLoader(false)
                                        }
                                        //  **************************************************************************************
                                      }
                                    })

                                  } else {
                                    // toast.error("Connect your wallet before processing transaction.");
                                    setShow(true);
                                  }
                                }}
                              >
                                {apiLoader ? "Please Wait..." : "Accept Highest Bid"}
                              </button>
                            )}

                          </div>
                        </div>
                      ) : (
                        <div className="container-fluid purpleBackground py-3 px-5 mb-3 circularRadius">
                          <div className="d-flex  justify-content-center">
                            <h5 className="boldText">Own package</h5>
                          </div>
                        </div>
                      )}

                    </> : (
                      <div
                        className="container-fluid newsLetter py-3 px-5 mb-3 circularRadius"
                        style={{ backgroundColor: "#A555FA" }}
                      >
                        <div className="d-flex py-2 flex-column flex-md-row justify-content-between   align-items-center">
                          <div className=" ">

                            <h5 className="xsMinimizeFont ">
                              {ticketData.auction ? `Minimum bid price` : `Price`}
                            </h5>
                            <p className="">
                              <span className="text-dark boldText">
                                {ticketData.auction ? getNextPayment()?.toFixed(4) : ticketData?.maticPrice} MATIC
                              </span>
                            </p>
                          </div>
                          <div className=" singleLine">
                            <div className="flexContainer ">
                              {ticketData.auction
                                ? (
                                  <>
                                    {biddingButton ? (
                                      <button
                                        disabled={apiLoader}
                                        className="ms-xl-5 btn whiteButton"
                                        // onClick={() => setModalShow(true)}
                                        onClick={async () => {
                                          if (wallet) {
                                            if (!dropSiteStatusValue) {
                                              toast.error("INSID3RS.io is not currently available.");
                                              return
                                            }
                                            // **********************************************************************
                                            const { value: bidAmount } = await Swal.fire({
                                              title: 'Enter your bid amount',
                                              input: 'number',
                                              inputLabel: `Minimum bid amount (${getNextPayment()?.toFixed(4)} MATIC)`,
                                              inputValue: getNextPayment()?.toFixed(4),
                                              inputValidator: (value) => {
                                                if (!value) {
                                                  return 'You need to enter bid amount!'
                                                } else {
                                                  return new Promise((resolve) => {
                                                    if (value >= getNextPayment()?.toFixed(4)) {
                                                      resolve()
                                                    } else {
                                                      resolve('You need to bid more then previous.')
                                                    }
                                                  })
                                                }
                                              },
                                              showCancelButton: true,
                                            })
                                            if (bidAmount) {
                                              setApiLoader(true)
                                              let toastId = toast.loading(
                                                "Waiting  for your transaction approval..."
                                              );
                                              let blockChainObject = {
                                                packageID: ticketData?.packageId,
                                                eventID: ticketData?.eventId?.blockchainId,
                                                price: bidAmount < getNextPayment() ? parseFloat(getNextPayment().toFixed(4)) : bidAmount
                                                // price: 0.001
                                              }
                                              console.log(blockChainObject)
                                              let blockChainResult = await bidOnAuction(blockChainObject);
                                              console.log("blockChainResult", blockChainResult);
                                              // **************************************************************
                                              if (blockChainResult?.transactionHash) {
                                                let apiObjects = {
                                                  auctionId: ticketData?._id,
                                                  transactionHash: blockChainResult?.transactionHash,
                                                  bidAmount: bidAmount < getNextPayment() ? parseFloat(getNextPayment().toFixed(4)) : bidAmount,
                                                  bidTime: moment.utc(new Date()),
                                                }
                                                ticketApi.bidOnAuction(apiObjects).then(res => {
                                                  if (res.status == 201) {
                                                    toast.success("Bid sent successfully.", {
                                                      id: toastId,
                                                    });
                                                  }
                                                  setApiLoader(false);
                                                }).catch(error => {
                                                  if (error?.response?.data?.msg) {
                                                    toast.error(error?.response?.data?.msg, {
                                                      id: toastId,
                                                    });
                                                  } else {
                                                    toast.error("Failed to sent bid.", {
                                                      id: toastId,
                                                    });
                                                  }
                                                  setApiLoader(false)
                                                })

                                              } else {
                                                if (blockChainResult?.status) {
                                                  toast.error(blockChainResult.message, {
                                                    id: toastId,
                                                  });
                                                } else {
                                                  toast.error("Transaction failed due to network error.", {
                                                    id: toastId,
                                                  });
                                                }
                                                setApiLoader(false)
                                              }
                                              // **************************************************************
                                            }
                                          } else {
                                            // toast.error("Connect your wallet before processing transaction.");
                                            setShow(true);
                                          }
                                        }}
                                      >
                                        {apiLoader ? "Please Wait..." : "Place a Bid"}
                                      </button>
                                    ) : (
                                      <span
                                        className="ms-xl-5 btn whiteButton">Auction Closed</span>
                                    )}
                                  </>
                                )
                                : (
                                  <button
                                    disabled={apiLoader}
                                    className="ms-xl-5 btn whiteButton"
                                    // onClick={() => setModalShow(true)}
                                    onClick={async () => {
                                      if (wallet) {
                                        if (!dropSiteStatusValue) {
                                          toast.error("INSID3RS.io is not currently available.");
                                          return
                                        }
                                        let toastId = toast.loading("Waiting for your transaction approval...");
                                        setApiLoader(true)
                                        let blockChainObject = {
                                          packageID: ticketData?.packageId,
                                          eventID: ticketData?.eventId?.blockchainId,
                                          price: ticketData?.maticPrice
                                        }
                                        console.log(blockChainObject)
                                        let blockChainResult = await buyPackage(blockChainObject);
                                        console.log("blockChainResult", blockChainResult);
                                        // ******************************* EMAIL reseller ticket ***************************************
                                        let totalPurchaseCount = 0, ticketIds = [];
                                        ticketData?.tickets?.map((ticket) => {
                                          totalPurchaseCount += ticket?.count;
                                          ticketIds.push(ticket?.ticketId?.ticketId);
                                        })
                                        let localProfile = JSON.parse(localStorage.getItem("profile"));
                                        let apiData = {
                                          ticket_id: ticketIds[0],
                                          count: totalPurchaseCount,
                                          success: blockChainResult?.status || blockChainResult?.error ? false : true,
                                          errorMessage: blockChainResult?.status || blockChainResult?.error ? blockChainResult.message : '',
                                        }
                                        console.log("🚀 ~ file: ticketDataTabView.js:559 ~ apiData:", apiData)
                                        setPurchasingData(apiData);
                                        setProfile(localProfile)
                                        if (localProfile?.email) {
                                          ticketApi.buyTicketsMail(apiData).then(res => {
                                            console.log(res.data);
                                          }).catch(error => {
                                            console.log("🚀 ~ file: [id].js:48 ~ ticketApi.buyTicketsMail ~ error:", error)
                                            toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                                          })
                                          setRecall(true);
                                        } else {
                                          setEmailModal(true);
                                        }
                                        // **********************************************************************
                                        if (blockChainResult?.transactionHash) {
                                          // setTransactionHash(blockChainResult?.transactionHash)
                                          let apiObjects = {
                                            packageId: ticketData?._id,
                                            transactionHash: blockChainResult?.transactionHash,
                                          }
                                          ticketApi.buyPackage(apiObjects).then(res => {
                                            console.log(res)
                                            if (res.status == 201) {
                                              toast.success("Package successfully purchased.", {
                                                id: toastId,
                                              });
                                            }
                                            setApiLoader(false)

                                          }).catch(error => {
                                            console.log("🚀 ~ file: ticketDataTabView.js:600 ~ ticketApi.buyPackage ~ error:", error)
                                            toast.error("Failed to save records.", {
                                              id: toastId,
                                            });
                                            setApiLoader(false)
                                          })

                                        } else {
                                          if (blockChainResult?.status) {
                                            toast.error(blockChainResult.message, {
                                              id: toastId,
                                            });
                                          } else {
                                            toast.error("Transaction failed due to network error.", {
                                              id: toastId,
                                            });
                                          }
                                          setApiLoader(false)
                                        }
                                      } else {
                                        // toast.error("Connect your wallet before processing transaction.");
                                        setShow(true);
                                      }

                                    }}
                                  >
                                    {apiLoader ? "Please Wait..." : "Buy Now  "}
                                  </button>
                                )}

                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <LoginModal setShow={setShow} show={show} autoCall={false} />
                    <AddEmailModal show={emailModal} setShow={setEmailModal} data={purchasingData} profile={profileLocal} setRecall={setRecall} page={'reseller'} />
                  </>}
              </div>
              {/* {ticketData.endDate} */}
              {ticketData?.transactionHash == "" ? <>
                {ticketData?.auction && (
                  <TimeCountDown time={ticketData.endDate} updateBidButton={updateBidButton} />
                )}
              </> : <></>}


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDataTabView;
