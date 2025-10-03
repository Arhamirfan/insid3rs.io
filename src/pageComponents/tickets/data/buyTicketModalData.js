import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Router, useRouter } from "next/router";
import RoutePaths from "../../../routes/path";
import { buyTicket } from "../../../services/blockChain/contractMethods";
import PurchasedTickets from "../components/purchasedTicket/Index";
import ticketApi from '../../../api/ticketApi'
import paymentApi from '../../../api/payment'
import appApi from "../../../api/app";
import Actions from "../../../store/Actions/Actions";
import { connectMetakeep } from "../../../services/blockChain/metakeepConnection";
import LoginModal from "../../../components/Modal/loginModal";
import AddEmailModal from "../../../components/Modal/addEmailModal";
import globalServices from "../../../utils/globalServices";
//images
import Snap from "../../../../public/assets/images/icons/snap.png";
import CreditCard from "../../../../public/assets/images/icons/creditCard.png";
import Polygon from "../../../../public/assets/images/icons/polygon.png";
import CreditCards from "../../../../public/assets/images/creditCards.png";
import moment from "moment";
import saveEarning from "../../event/earnings";
let validationSchema = yup.object({
  totalTickets: yup.number().required("Total tickets is  required").min(0, "Total tickets must be greater then 0"),
});

let BuyTicketModalData = ({ data }) => {
  let [status, setStatus] = useState(false);
  let [show, setShow] = useState(false);
  let [totalTickets, setTotalTickets] = useState(0);
  let [promoId, setPromoId] = useState("");
  let [transactionHash, setTransactionHash] = useState(false);
  let [url, setUrl] = useState("");
  let [paymentDon, setPaymentDone] = useState(false);
  let [couponCode, setCouponCode] = useState("");
  let [discountResponse, setDiscountResponse] = useState({ error: true, data: {}, coupon: '' });
  let [loading, setLoading] = useState(false);
  let [tab, setTab] = useState(1);
  let [purchasingData, setPurchasingData] = useState();
  let [emailModal, setEmailModal] = useState(false);
  let wallet = useSelector(state => state.wallet);
  let dispatch = useDispatch();
  let router = useRouter();
  let sendPurchasedTicketMail = (data) => {
    data.createdAtLocal = moment().format("YYYY-MM-DDTHH:mm");
    ticketApi.buyTickets(data).then(res => {
      console.log(res.data);
      return res.status
    }).catch(error => {
      console.log("🚀 ~ file: buyTicketModalData.js:49 ~ ticketApi.buyTickets ~ error:", error)
    })
  }
  let checkEmailAndSend = async (data, isFreePromo) => {
    let profileEmail = wallet?.profile?.email;
    if (!profileEmail && profileEmail == '') {
      setEmailModal(true);
    } else {
      await sendPurchasedTicketMail(data);
      if (isFreePromo)
        router.push(RoutePaths.myEvents);
      else
        console.log('promo code not Free')
    }
  }

  let getPaymentDetails = (id) => {
    let interval = setInterval(() => {
      paymentApi.getPaymentDetails(id).then(res => {
        if (res.data.data.payment_status == "paid") {
          setPaymentDone(true);
          clearInterval(interval);
        }
      }).catch(error => {
        console.log(error)
      })
    }, 5000);
  }

  const purchaseByCard = (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    try {
      let apiObject = {
        ticket_id: data.ticketId,
        count: values.totalTickets,
        couponCode: ((discountResponse?.data?.usd || discountResponse?.data?.usd > 0) && discountResponse?.coupon != '' && !discountResponse?.error) ? discountResponse?.coupon : '',
        iframeCall: !globalServices.isIframeWebsite() ? false : true
      }
      console.log('finalData:', apiObject)
      ticketApi.buyTicket(apiObject).then(res => {
        if (res.status == 200) {
          console.log('buyTicketData::', res.data)
          setUrl(res.data.data.url);
          window.open(res.data.data.url, !globalServices.isIframeWebsite() ? "_self" : "_blank");
          getPaymentDetails(res.data.data.stripeUrl.id)
        } else if (res.status == 204) {
          let profileEmail = wallet?.profile?.email;
          setTotalTickets(parseInt(values.totalTickets));
          setTransactionHash('');
          console.log('Minted free Ticket.')
          // setStatus(true);
          setPaymentDone(true);
          setUrl('done');
          if (!profileEmail && profileEmail == '') {
            let apiData = {
              ticket_id: data.ticketId,
              count: values.totalTickets,
              paymentType: 'USD'
            }
            setPurchasingData(apiData);
            setEmailModal(true);
          } else {
            setTimeout(() => {
              router.push(RoutePaths.myEvents)
            }, 6000);
          }
        }
        setSubmitting(false);
      }).catch(error => {
        if (error?.response?.data?.msg) {
          toast.error(error?.response?.data?.msg);
        } else {
          toast.error(error.message);
        }
        setSubmitting(false);
      })
    } catch (error) {
      setSubmitting(false);
    }
  }

  const purchaseByCrypto = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    let toastId = toast.loading(
      "Waiting for your transaction approval..."
    );
    let promoCodeName = ((discountResponse?.data?.matic || discountResponse?.data?.matic > 0) && discountResponse?.coupon != '' && !discountResponse?.error) ? discountResponse?.coupon : ''
    let promoCodeValue = ((discountResponse?.data?.matic || discountResponse?.data?.matic > 0) && discountResponse?.coupon != '' && !discountResponse?.error) ? discountResponse?.data?.matic : 0
    let serviceFee = parseFloat((values.totalTickets * ((5 / 100) * data?.fixPrice)).toFixed(5))
    let ticketPrice = parseFloat(((values.totalTickets * data.fixPrice) - promoCodeValue).toFixed(5));
    let objects = {
      price: ticketPrice > 0 ? ticketPrice : 0,
      ticketId: data.ticketId,
      noOfCopies: values.totalTickets,
      promoCode: promoId ? promoId : 0
    };
    console.log("blockChainData", objects);
    let blockChainResult = await buyTicket(objects);
    console.log("blockChainResult", blockChainResult);
    if (blockChainResult?.transactionHash) {
      setTotalTickets(parseInt(values.totalTickets));
      setTransactionHash(blockChainResult.transactionHash);
      toast.success("Ticket  minted successfully.", {
        id: toastId,
      });
      await saveEarning(data?.event_id?._id, 'event', 'crypto', ticketPrice, serviceFee, 0)
      setStatus(true);
      let apiData = {
        ticket_id: objects.ticketId,
        count: objects.noOfCopies,
        blockChainHash: blockChainResult?.transactionHash,
        promoBlockchainId: promoId ? promoId : 0
      }
      setPurchasingData(apiData);
      checkEmailAndSend(apiData, (values.totalTickets * data.fixPrice) - promoCodeValue == 0 ? true : false);
      setTimeout(() => {
        setStatus(false);
      }, 5000);
    } else {
      if (blockChainResult?.status) {
        let emailData = {
          ticket_id: objects.ticketId,
          count: objects.noOfCopies,
          success: false,
          errorMessage: blockChainResult.message
        };
        console.log('mailData:', emailData)
        ticketApi.buyTicketsMail(emailData).then(res => {
          console.log(res.data);
        }).catch(error => {
          console.log("🚀 ~ file: addEmailModal.js:46 ~ ticketApi.buyTicketsMail ~ error:", error)
          toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
        })
        toast.error(blockChainResult.message, {
          id: toastId,
        });
      } else {
        toast.error("Transaction failed due to network error.", {
          id: toastId,
        });
      }
    }
    setSubmitting(false);
  }


  let validateDiscountCode = (ticketId, totalTickets, paymentType) => {
    setLoading(true);
    setDiscountResponse({ error: true, data: {}, coupon: '' })
    try {
      if (couponCode.trim() == '') {
        throw new Error('Discount code is required')
      }
      let values = { ticketId: ticketId, name: couponCode.trim(), ticketCount: totalTickets, paymentType: paymentType }
      appApi.applyPromoCode(values)
        .then((result) => {
          if (result && result.status == 200) {
            console.log('result:', result.data)
            setPromoId(result.data.data.id)
            setDiscountResponse({ error: false, data: result.data.data, coupon: couponCode.trim() });
          }
          setLoading(false);
        })
        .catch((error) => {
          setDiscountResponse({ error: true, data: { error: error?.response?.data?.data ? error?.response?.data?.data : error.message }, coupon: '' })
          // toast.error(error?.response?.data?.data ? error?.response?.data?.data : error.message);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      setDiscountResponse({ error: true, data: err.message, coupon: '' })
    }
  }

  const connectToMetakeepCard = async (values, setSubmitting) => {
    setShow(true);
    setSubmitting(false);
    // const result = await connectMetaKeepFun();
    // if (result) {
    //   purchaseByCard(values, setSubmitting);
    // }
  }

  const connectToMetakeepCrypto = async (values, setSubmitting) => {
    setShow(true);
    setSubmitting(false);
    // const result = await connectMetaKeepFun();
    // if (result) {
    //   purchaseByCrypto(values, setSubmitting);
    // }
  }


  return (
    <>
      {status ? (
        <>
          <PurchasedTickets data={data} transactionHash={transactionHash} totalTickets={totalTickets} />
        </>
      ) : (
        <>
          {(data.totalTickets - data.soldTickets) > 0 ? (
            <>
              {url == "" && (
                <>
                  <div className="normalLgText ml-1 mobileCentered">Select Payment Method</div>

                  {/* CREDIT CARD & CRYPTO */}
                  <div className="d-flex my-4 px-3 sm-row-checkout">
                    <div className={`d-flex col-md-6 px-4 py-3 pointer gap-3 justify-content-center left-border ${tab === 1 && "activeCard"}`} onClick={() => { setTab(1); setDiscountResponse({ error: true, data: {}, coupon: '' }) }}>
                      <img src={CreditCard.src} height="24" width="28" /> Credit Card
                    </div>
                    <div className={`d-flex col-md-6 px-4 py-3 pointer gap-3 justify-content-center crypto-btn right-border ${tab === 2 && "activeCard"}`} onClick={() => { setTab(2); setDiscountResponse({ error: true, data: {}, coupon: '' }) }}>
                      <img src={Polygon.src} height="24" width="28" /> Crypto
                    </div>
                  </div>

                </>
              )}

              {tab == 1 && (
                <>
                  {url !== "" ? (
                    <>
                      <div className="container-fluid">
                        <div className="d-flex flex-column align-items-center mt-5">
                          <img src={CreditCards.src} height="100" width={"100"} />
                          {paymentDon ? (
                            <>
                              <h4 className="pt-4 text-success">Payment process done.</h4>
                              <button className="btn text-white purpleBackground" onClick={() => setUrl("")} >Buy Again</button>
                            </>
                          ) : (
                            <>
                              <h4 className="py-4">Payment process is in progress...!!</h4>
                              <button className="btn purpleButton text-white single-line" type="button" onClick={() => { setPaymentDone(false); setUrl(''); }}>Cancel</button>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Formik
                      initialValues={{
                        totalTickets: 1,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        wallet?.address !== "" ? purchaseByCard(values, setSubmitting) : connectToMetakeepCard(values, setSubmitting)
                      }
                      }
                    >
                      {({
                        values,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <div className="container-fluid  semibold">

                            {/* NUMBER OF TICKETS */}
                            <div className="tickets-quantity sm-row-checkout">
                              <h6>Number of tickets</h6>

                              <div className="d-flex gap-3">
                                <button
                                  type="button"
                                  className="btn btn-transparent purpleBackground text-white"
                                  onClick={() => {
                                    if (values.totalTickets > 1) {
                                      setFieldValue(
                                        "totalTickets",
                                        values.totalTickets - 1
                                      );
                                      setDiscountResponse({ error: true, data: {}, coupon: '' })
                                    }
                                  }}
                                >
                                  -
                                </button>
                                <div className="px-4 selected-tickets">
                                  {values.totalTickets}
                                </div>
                                <ErrorMessage name="totalTickets" />
                                <button
                                  type="button"
                                  className="btn btn-transparent purpleBackground text-white"
                                  onClick={() => {
                                    if (
                                      data.totalTickets - data.soldTickets >
                                      values.totalTickets
                                    ) {
                                      setFieldValue(
                                        "totalTickets",
                                        values.totalTickets + 1
                                      );
                                      setDiscountResponse({ error: true, data: {}, coupon: '' })
                                    }
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* PROMO CODE */}
                            <div className="my-3">
                              <div className="semiBold largeBoldText mobileCentered">Discount Code (optional)</div>
                              <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
                                <input type="text"
                                  className={`form-control border-purple discount-input ${(discountResponse?.data?.error && discountResponse?.error) && 'text-danger is-invalid'} ${(discountResponse?.data?.usd && !discountResponse?.error) && 'text-white is-valid'}`}
                                  name="name" id="discountCode" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} placeholder="NY22" />
                                <button className="btn purpleButton single-line" type="button" disabled={loading ? true : false}
                                  onClick={(e) => { validateDiscountCode(data?._id, values.totalTickets, 'creditCard'); }}
                                >{loading ? 'Loading...' : 'Apply Code'} </button>

                              </div>
                              {discountResponse?.error ? <p className="text-danger">{discountResponse?.data?.error}</p> : <></>}
                            </div>

                            {/* PAYMENT DETAILS */}
                            <div className="px-sm-3 text-white payment-details">
                              {!discountResponse?.error ? <>
                                <div className="d-flex  justify-content-between ">
                                  <small>Discount</small>
                                  <small>${((discountResponse?.data?.usd)).toFixed(2)} </small>
                                </div>
                              </> : <></>}
                              <div className="d-flex  justify-content-between ">
                                {values.totalTickets * data.stripeAmount == discountResponse?.data?.usd ? <>

                                </> : <>
                                  <small>Credit card fee  </small>
                                  <small>${(values.totalTickets * (0.03 * data?.stripeAmount)).toFixed(2)}</small>
                                </>}
                              </div>
                              <div className="d-flex  justify-content-between ">
                                <small>Service fee  </small>
                                <small>${(values.totalTickets * ((5 / 100) * data?.stripeAmount)).toFixed(2)}</small>
                              </div>
                              <div className="d-flex  justify-content-between pt-1">
                                <p>
                                  You will pay
                                </p>
                                {discountResponse && !discountResponse?.error ? <>
                                  <p>${((values.totalTickets * data.stripeAmount) - (discountResponse?.data?.usd) + (data.stripeAmount !== discountResponse.data?.usd ? parseFloat(values.totalTickets * 0.03 * data?.stripeAmount) : 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} </p>
                                </> : <>
                                  <p>${((values.totalTickets * data.stripeAmount) + parseFloat(values.totalTickets * data?.stripeAmount * 0.03) + parseFloat((values.totalTickets * ((5 / 100) * data?.stripeAmount)).toFixed(2))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </p>
                                </>}
                              </div>
                            </div>


                          </div>
                          <div className="container-fluid">
                            <center>
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="my-3 px-5 btn checkout-button">
                                {isSubmitting ? " Creating payment link.Please wait..." : "  Buy Now"}
                              </button>
                            </center>
                          </div>
                          <LoginModal setShow={setShow} show={show} autoCall={false} />
                          {/* {isSubmitting && wallet?.address == "" ? <LoginModal setShow={setShow} show={show} /> : <></>} */}
                        </Form>
                      )}
                    </Formik>
                  )}
                </>

              )}
              {/* *********************************** Matic payment ************************** */}
              {tab == 2 && (
                <Formik
                  initialValues={{
                    totalTickets: 1,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    wallet?.address !== "" ? purchaseByCrypto(values, setSubmitting) : connectToMetakeepCrypto(values, setSubmitting)
                  }}
                >
                  {({
                    values,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="container-fluid  semibold">

                        {/* NUMBER OF TICKETS */}
                        <div className="tickets-quantity sm-row-checkout">
                          <h6>Number of tickets</h6>

                          <div className="d-flex gap-3">
                            <button
                              type="button"
                              className="btn btn-transparent purpleBackground text-white"
                              onClick={() => {
                                if (values.totalTickets > 1) {
                                  setFieldValue(
                                    "totalTickets",
                                    values.totalTickets - 1
                                  );
                                  setDiscountResponse({ error: true, data: {}, coupon: '' })
                                }
                              }}
                            >
                              -
                            </button>
                            <div className="px-4 selected-tickets">
                              {values.totalTickets}
                            </div>
                            <ErrorMessage name="totalTickets" />
                            <button
                              type="button"
                              className="btn btn-transparent purpleBackground text-white"
                              onClick={() => {
                                if (
                                  data.totalTickets - data.soldTickets >
                                  values.totalTickets
                                ) {
                                  setFieldValue(
                                    "totalTickets",
                                    values.totalTickets + 1
                                  );
                                  setDiscountResponse({ error: true, data: {}, coupon: '' })
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="my-3">
                          <div className="semiBold largeBoldText">Discount Code (optional)</div>
                          <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
                            <input type="text"
                              className={`form-control border-purple discount-input ${(discountResponse?.data?.error && discountResponse?.error) && 'text-danger is-invalid'} ${(discountResponse?.data?.usd && !discountResponse?.error) && 'text-white is-valid'}`}
                              name="name" id="discountCode" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} placeholder="NY22" />
                            <button className="btn purpleButton single-line" type="button" disabled={loading ? true : false} onClick={(e) => { validateDiscountCode(data?._id, values.totalTickets, 'blockchain'); }}>{loading ? 'Loading...' : 'Apply Code'} </button>

                          </div>
                          {discountResponse?.error ? <p className="text-danger">{discountResponse?.data?.error}</p> : <></>}
                        </div>

                        <div className="px-sm-3 text-white payment-details">
                          <div className="d-flex  justify-content-between text-white">
                            <small>Service fee  </small>
                            <small>{(values.totalTickets * ((5 / 100) * data?.fixPrice)).toFixed(5)} MATIC</small>
                          </div>

                          {!discountResponse?.error ? <>
                            <div className="d-flex  justify-content-between">
                              <small>Discount</small>
                              <small>{discountResponse?.data?.matic} MATIC</small>
                            </div>
                          </> : <></>}
                          <div className="d-flex justify-content-between text-white">
                            <p>
                              You will pay
                            </p>
                            {discountResponse && !discountResponse?.error ? <>
                              <p>{((values.totalTickets * data.fixPrice) - discountResponse?.data?.matic).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} MATIC</p>
                            </> : <>
                              <p>{((values.totalTickets * data.fixPrice)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} MATIC</p>
                            </>}
                          </div>
                        </div>


                      </div>
                      <div className="container-fluid">
                        <center>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="my-3 px-5 btn checkout-button">
                            {isSubmitting ? "Please wait..." : "  Buy Now"}
                          </button>
                        </center>
                      </div>
                      <LoginModal setShow={setShow} show={show} autoCall={false} />
                      {/* {isSubmitting && wallet?.address == "" ? <LoginModal setShow={setShow} show={show} /> : <></>} */}
                    </Form>
                  )}
                </Formik>
              )}
              <AddEmailModal show={emailModal} setShow={setEmailModal} data={purchasingData} profile={wallet?.profile} />
            </>
          ) : (
            <>
              <div className="d-flex font justify-content-center text-center">
                <div className="d-flex flex-column mb-3">
                  <div className="p-2">
                    <img src={Snap.src} />
                  </div>
                  <h2 className="pt-4 text-danger regular">All Tickets Sold</h2>
                </div>
              </div>
            </>
          )}

        </>
      )
      }
    </>
  );
};

export default BuyTicketModalData;
