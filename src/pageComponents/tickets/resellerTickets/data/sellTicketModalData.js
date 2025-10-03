import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Moment from "../../../../utils/date";
//images 
import CreditCard from "../../../../../public/assets/images/icons/creditCard.png";
import Polygon from "../../../../../public/assets/images/icons/polygon.png";
import { dates, validations } from "../../../../constants/staticData";
let validationSchema = yup.object({
    price: yup.number().required(validations.price).min(0, validations.greaterThanZero),
    totalTickets: yup.number().required(validations.totalTickets).min(0, validations.greaterThanZero),
});
let auctionValidationSchema = yup.object({
    totalTickets: yup.number().required(validations.totalTickets).min(0, validations.greaterThanZero),
    minBid: yup.number().required(validations.minBid).min(0, validations.greaterThanZero),
    bidIncrement: yup.number().required(validations.bidIncrement).min(0, validations.greaterThanZero),
    startDate: yup.date().required(validations.startDate),
    endDate: yup
        .date()
        .required(validations.endDate)
        .min(yup.ref("startDate"), validations.sameEndDate)
        .when("startDate", (startDate, schema) => {
            if (startDate) {
                let newDate = startDate.setHours(startDate.getHours() + 1);
                return schema.min(
                    new Date(newDate),
                    validations.greaterEndDate
                );
            }

            return schema;
        }),
});
let SellTicketModalData = ({ data }) => {
    // let [status, setStatus] = useState(false);
    // let [totalTickets, setTotalTickets] = useState(0);
    // let [transactionHash, setTransactionHash] = useState(false);
    // let [url, setUrl] = useState("");
    let [tab, setTab] = useState(1);
    console.log('sellTicketModalData', data);
    // let saveTicketsRecord = (data) => {
    //     console.log("apiRecordToSave", data);
    //     productApi.buyTickets(data).then(res => {
    //         console.log(res.data);
    //         return res.status
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // } 
    return (
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
                                    <div className="col boldText pt-1">Timed Auction</div>
                                    <div className="col pb-2 xsText">Set a period of time for which buyers can place bids</div>
                                </div>
                            </div>
                        </div>
                        <div className={`col xsCircularRadius hoverEffect ${tab == 2 ? "activeCard" : "bg-white "}`} onClick={() => setTab(2)}>
                            <div className="container-fluid">
                                <div className="row flex-column py-2 text-center justify-content-center align-items-center">
                                    <div className="col pt-3">
                                        <img src={Polygon.src} height="30" width={"32"} />
                                    </div>
                                    <div className="col boldText pt-1">Fixed Price</div>
                                    <div className="col pb-2 xsText">Enter price to allow users instantly purchase your ticket</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {tab == 1 && (
                <>
                    <Formik
                        initialValues={{
                            totalTickets: 0,
                            minBid: 0,
                            bidIncrement: 0,
                            startDate: new Date(),
                            endDate: Moment(new Date(), dates.MMDDYYYY),
                        }}
                        validationSchema={auctionValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            // setSubmitting(true);
                            // try {
                            //     let apiObject = {
                            //         ticket_id: data.ticketId,
                            //         count: values.totalTickets,
                            //     }
                            //     productApi.buyTicket(apiObject).then(res => {
                            //         if (res.status == 200) {
                            //             console.log(res.data)
                            //             setUrl(res.data.data.url);
                            //             window.location.href = res.data.data.url;
                            //         }
                            //         setSubmitting(false);
                            //     }).catch(error => {
                            //         setSubmitting(false);
                            //     })
                            // } catch (error) {
                            //     console.log(error)
                            //     setSubmitting(false);
                            // }
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            isSubmitting,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="container-fluid px-md-3 semibold">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h3>Number of tickets</h3>
                                        </div>
                                        <div className="col-xs-12 py-2">
                                            <div className="d-flex greyBackground priceModal align-items-center">
                                                <div className="mx-1  mx-sm-5">
                                                    <button
                                                        type="button"
                                                        className="btn btn-transparent"
                                                        onClick={() => {
                                                            if (values.totalTickets > 0) {
                                                                setFieldValue("totalTickets", values.totalTickets - 1);
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
                                                <div className="mx-1  mx-sm-5">
                                                    <button
                                                        type="button"
                                                        className="btn btn-transparent"
                                                        // disabled={true}
                                                        onClick={() => {
                                                            if (data?.totalCount - values.totalTickets > values.totalTickets) {
                                                                setFieldValue("totalTickets", values.totalTickets + 1);
                                                            }
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <small>{data?.totalCount - values.totalTickets} Tickets Left</small>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating my-3">
                                                <input type="number"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="minBid"
                                                    name="minBid"
                                                    value={values.minBid}
                                                    placeholder="0.75 MATIC" />
                                                <label htmlFor="floatingInput">Minimum Bid</label>
                                                <ErrorMessage component="small" name="minBid" className="text-danger " />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating my-3">
                                                <input type="number"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="bidIncrement"
                                                    name="bidIncrement"
                                                    value={values.bidIncrement}
                                                    placeholder="0.1 MATIC" />
                                                <label htmlFor="floatingInput">Bid Increment</label>
                                                <ErrorMessage component="small" name="price" className="text-danger " />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating my-3">
                                                <input type="date"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="startDate"
                                                    name="startDate"
                                                    value={values.startDate}
                                                    placeholder="23-10-2022" />
                                                <label htmlFor="floatingInput">Starting Date</label>
                                                <ErrorMessage component="small" name="startDate" className="text-danger " />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating my-3">
                                                <input type="date"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    id="endDate"
                                                    name="endDate"
                                                    value={values.endDate}
                                                    placeholder="23-10-2022" />
                                                <label htmlFor="floatingInput">Expiration Date</label>
                                                <ErrorMessage component="small" name="endDate" className="text-danger " />
                                            </div>
                                        </div>
                                    </div>
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
                </>
            )}
            {/* ***********************************Fixed Price ************************** */}
            {tab == 2 && (
                <Formik
                    initialValues={{
                        price: "",
                        totalTickets: 0,

                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(true);
                        toast.loading("Coming soon...");

                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting, }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="container-fluid px-md-3 semibold">
                                <div className="row">


                                    <div className="col-xs-12 mt-2">
                                        <h4>Number of tickets</h4>
                                    </div>
                                    <div className="col-xs-12 pt-1 ">
                                        <div className="d-flex greyBackground priceModal align-items-center">
                                            <div className="mx-1  mx-sm-5">
                                                <button
                                                    type="button"
                                                    className="btn btn-transparent"
                                                    onClick={() => {
                                                        if (values.totalTickets > 0) {
                                                            setFieldValue("totalTickets", values.totalTickets - 1);
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
                                            <div className="mx-1  mx-sm-5">
                                                <button
                                                    type="button"
                                                    className="btn btn-transparent"
                                                    // disabled={true}
                                                    onClick={() => {
                                                        if (data?.totalCount - values.totalTickets > values.totalTickets) {
                                                            setFieldValue("totalTickets", values.totalTickets + 1);
                                                        }
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <small>{data?.totalCount - values.totalTickets} Tickets Left</small>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating my-3">
                                            <input type="number"
                                                onChange={handleChange}
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                value={values.price}
                                                placeholder="0.4 MATIC" />
                                            <label htmlFor="floatingInput">Price</label>
                                            <ErrorMessage component="small" name="price" className="text-danger " />
                                        </div>
                                    </div>
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
    );
};

export default SellTicketModalData;
