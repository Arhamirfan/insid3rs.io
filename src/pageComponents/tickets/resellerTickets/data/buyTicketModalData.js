import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { buyTicket } from "../../../../services/blockChain/contractMethods";
import { account } from "../../../../services/blockChain/metaMaskConnection";
import PurchasedTickets from "../components/purchasedTicket/Index";
import productApi from '../../../../api/ticketApi'
//images
import Visa from "../../../../../public/assets/images/icons/visa.png";
import Mastercard from "../../../../../public/assets/images/icons/mastercard.png";
import CreditCard from "../../../../../public/assets/images/icons/creditCard.png";
import americanExpress from "../../../../../public/assets/images/icons/americanExpress.svg";
import unionPay from "../../../../../public/assets/images/icons/unionPay.svg";
import Polygon from "../../../../../public/assets/images/icons/polygon.png";
import CreditCards from "../../../../../public/assets/images/creditCards.png";
import moment from "moment";
let validationSchema = yup.object({
  // price: yup.number().required("Price is  required").min(0, "Price must be greater then 0"),
  totalTickets: yup.number().required("Total tickets is  required").min(0, "Total tickets must be greater then 0"),
});
let BuyTicketModalData = ({ data }) => {
  let [status, setStatus] = useState(false);
  let [totalTickets, setTotalTickets] = useState(0);
  let [transactionHash, setTransactionHash] = useState(false);
  let [url, setUrl] = useState("");

  let [tab, setTab] = useState(1);

  let saveTicketsRecord = (data) => {
    console.log("apiRecordToSave", data);
    data.createdAtLocal = moment().format("YYYY-MM-DDTHH:mm");
    productApi.buyTickets(data).then(res => {
      console.log(res.data);
      return res.status
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <>
      {/* {JSON.stringify(data)} */}
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
                  <div className="container d-flex mb-4">
                    <div className="container-fluid greyBackground">
                      <div className="row gap-3  p-1">
                        <div className={`col  xsCircularRadius hoverEffect ${tab == 1 ? "activeCard" : "bg-white "}`} onClick={() => setTab(1)}>
                          <div className="container-fluid">
                            <div className="row flex-column py-2 text-center justify-content-center align-items-center">
                              <div className="col pt-3">
                                <img src={CreditCard.src} height="30" width={"32"} />
                              </div>
                              <div className="col boldText pt-1">Credit Card</div>
                              <div className="col pb-2 xsText paymentIcons">
                                Payment with <img src={Visa.src} /> <img src={Mastercard.src} /> <img src={americanExpress.src} /> <img src={unionPay.src} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`col xsCircularRadius hoverEffect ${tab == 2 ? "activeCard" : "bg-white "}`} onClick={() => setTab(2)}>
                          <div className="container-fluid">
                            <div className="row flex-column py-2 text-center justify-content-center align-items-center">
                              <div className="col pt-3">
                                <img src={Polygon.src} height="30" width={"32"} />
                              </div>
                              <div className="col boldText pt-1">Crypto</div>
                              <div className="col pb-2 xsText">Payment with MATIC</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
              )}

              {tab == 1 && (
                <>
                  {url !== "" ? (
                    <>
                      {/* <div className="alert alert-info">
                    Click to pay your ticket amount .<a href={url} target="_blank"    rel="noreferrer">Pay</a>
                  </div> */}
                      <div className="container-fluid">
                        <div className="d-flex flex-column align-items-center mt-5">
                          <img src={CreditCards.src} height="100" width={"100"} />
                          <h4 className="pt-4">Successfully Added To Cart!!</h4>
                          <h5 className="lightText descriptionColor">Please continue to proceed payment.</h5>

                          <Link href={url}>
                            <a className="btn filledButton my-5">Continue</a>
                          </Link>
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
                        console.log(values);
                        setSubmitting(true);
                        let apiObject = {
                          ticket_id: data.ticketId,
                          count: values.totalTickets,

                        }
                        productApi.buyTicket(apiObject).then(res => {
                          if (res.status == 200) {
                            console.log(res.data)
                            setUrl(res.data.data.url);
                            window.location.href = res.data.data.url;
                          }
                          setSubmitting(false);
                        }).catch(error => {
                          console.log("🚀 ~ file: buyTicketModalData.js:125 ~ productApi.buyTicket ~ error", error)
                          if (error?.response?.data?.msg) {
                            toast.error(error?.response?.data?.msg);
                          } else {
                            toast.error(error.message);
                          }
                          setSubmitting(false);
                        })


                      }}
                    >
                      {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        helperText,
                        setFieldError,
                        handleSubmit,
                        setValues,
                        setFieldValue,
                        isSubmitting,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <div className="container-fluid px-md-3 semibold">
                            <div className="row">
                              <div className="col-xs-12">
                                <h3>Number of tickets</h3>
                              </div>
                              <div className="col-xs-12 pt-3 pb-5">
                                {/* <small>
                                  Available Tickets ({data.totalTickets - data.soldTickets})
                                </small> */}
                                <div className="d-flex greyBackground priceModal align-items-center">
                                  <div className="mx-1  mx-sm-5">
                                    <button
                                      type="button"
                                      className="btn btn-transparent"
                                      onClick={() => {
                                        if (values.totalTickets > 1) {
                                          setFieldValue(
                                            "totalTickets",
                                            values.totalTickets - 1
                                          );
                                        }
                                      }}
                                    >
                                      -
                                    </button>
                                  </div>
                                  <div className="flex-grow-1">
                                    <input
                                      type="number"
                                      className="form-control priceModal  text-center"
                                      name={`totalTickets`}
                                      disabled={true}
                                      value={values.totalTickets}
                                    />
                                    <ErrorMessage name="totalTickets" />

                                  </div>
                                  <div className="mx-sm-5">
                                    <button
                                      type="button"
                                      className="btn btn-transparent"
                                      // disabled={true}
                                      onClick={() => {
                                        if (
                                          data.totalTickets - data.soldTickets >
                                          values.totalTickets
                                        ) {
                                          setFieldValue(
                                            "totalTickets",
                                            values.totalTickets + 1
                                          );
                                        }
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex  justify-content-between greyColor">
                                  <small>Service fee  </small>
                                  <small>${(values.totalTickets * ((data?.event_id?.transactionFee / 100) * data?.stripeAmount)).toFixed(2)}</small>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex  justify-content-between greyColor">
                              <p>
                                You will pay ({values.totalTickets} * ${data?.stripeAmount?.toLocaleString()})
                              </p>
                              <p>${values.totalTickets * data.stripeAmount} </p>
                            </div>
                            {/* <div className="d-flex justify-content-between greyColor">
           <p>Transaction Fee</p>
           <p>{data.transactionFee}  MATIC</p>
         </div> */}
                            {/* <div className="d-flex justify-content-between greyColor">
           <p>You will pay</p>
           <p>{(values.totalTickets * data.fixPrice)}  MATIC</p>
         </div> */}
                          </div>
                          <hr></hr>
                          <div className="container-fluid">
                            <center>
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="my-3 px-5 btn filledButton">
                                {isSubmitting ? " Creating payment link.Please wait..." : "  Buy now"}
                              </button>
                            </center>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </>

              )}
              {/* ***********************************matic payment ************************** */}
              {tab == 2 && (
                <Formik
                  initialValues={{
                    totalTickets: 1,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(true);
                    let toastId = toast.loading(
                      "Waiting   for your transaction approval..."
                    );
                    let objects = {
                      // price: data.fixPrice,
                      price: values.totalTickets * data.fixPrice,
                      address: account,
                      ticketId: data.ticketId,
                      noOfCopies: values.totalTickets,
                      promoCode: ''
                    };
                    console.log(objects);
                    let blockChainResult = await buyTicket(objects);
                    console.log("blockChainResult", blockChainResult);
                    if (blockChainResult?.transactionHash) {
                      setTotalTickets(parseInt(values.totalTickets));
                      setTransactionHash(blockChainResult.transactionHash);
                      toast.success("Ticket  minted successfully.", {
                        id: toastId,
                      });
                      setStatus(true);
                      let apiData = {
                        ticket_id: objects.ticketId,
                        count: objects.noOfCopies,
                        blockChainHash: blockChainResult?.transactionHash
                      }
                      saveTicketsRecord(apiData);
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
                    }
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    handleChange,
                    errors,
                    touched,
                    helperText,
                    setFieldError,
                    handleSubmit,
                    setValues,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="container-fluid px-md-3 semibold">
                        <div className="row">
                          <div className="col-xs-12">
                            <h3>Number of tickets</h3>
                          </div>
                          <div className="col-xs-12 pt-3 pb-5">
                            {/* <small>
                              Available Tickets ({data.totalTickets - data.soldTickets}
                              )
                            </small> */}
                            <div className="d-flex greyBackground priceModal align-items-center">
                              <div className="mx-1 mx-sm-5">
                                <button
                                  type="button"
                                  className="btn btn-transparent"
                                  onClick={() => {
                                    if (values.totalTickets > 1) {
                                      setFieldValue(
                                        "totalTickets",
                                        values.totalTickets - 1
                                      );
                                    }
                                  }}
                                >
                                  -
                                </button>
                              </div>
                              <div className="flex-grow-1">
                                <input
                                  type="number"
                                  className="form-control priceModal  text-center"
                                  name={`totalTickets`}
                                  disabled={true}
                                  value={values.totalTickets}
                                />
                                <ErrorMessage name="totalTickets" />
                              </div>
                              <div className="mx-1 mx-sm-5">
                                <button
                                  type="button"
                                  className="btn btn-transparent"
                                  // disabled={true}
                                  onClick={() => {
                                    if (data.totalTickets - data.soldTickets > values.totalTickets) {
                                      setFieldValue("totalTickets", values.totalTickets + 1);
                                    }
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="d-flex  justify-content-between greyColor">
                              <small>Service fee  </small>
                              <small>${(values.totalTickets * ((data?.event_id?.transactionFee / 100) * data?.fixPrice)).toFixed(2)}</small>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex  justify-content-between greyColor">
                          <p>
                            You will pay ({values.totalTickets} * {data.fixPrice}{" "}
                            MATIC)
                          </p>
                          <p>{(values.totalTickets * data.fixPrice).toFixed(4)} MATIC</p>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="container-fluid">
                        <center>
                          {isSubmitting ? (
                            <button
                              type="button"
                              className="my-3 px-5 btn filledButton"
                            >
                              Please wait...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="my-3 px-5 btn filledButton"
                            >
                              Buy now
                            </button>
                          )}
                        </center>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </>
          ) : (
            <>
              <small className="text-danger">No more tickets.</small>
            </>
          )}

        </>
      )}
    </>
  );
};

export default BuyTicketModalData;
