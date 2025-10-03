import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { createPackage, createAuction } from "../../services/blockChain/contractMethods";
import ticketApi from '../../api/ticketApi'
import { validations } from "../../constants/staticData";
let validationSchema = yup.object({
    price: yup.number().typeError("Enter valid amount.").required(validations.price).min(0.001, validations.greaterThanZero),
});
let titleValidationSchema = yup.object({
    price: yup.number().typeError("Enter valid amount.").required(validations.price).min(0.001, validations.greaterThanZero),
    title: yup.string().required("Package Name is required."),
    // totalTickets: yup.number().required(validations.totalTickets).min(0, validations.greaterThanZero),
});
let auctionValidationSchema = yup.object({
    minBid: yup.number().typeError("Enter valid amount.").required(validations.minBid).min(0.001, validations.greaterThanZero),
    incrementBidPercentage: yup.number().required(validations.bidIncrement).min(1, "Percentage should be between 1 and 100.").integer("Please enter a positive number.").max(100, "Percentage should be between 1 and 100."),
    startDate: yup.date().required(validations.startDate),
    endDate: yup.date().required(validations.endDate).min(yup.ref("startDate"), validations.sameEndDate)
        .when("startDate", (startDate, schema) => {
            if (startDate) {
                let newDate = startDate.setHours(startDate.getHours() + 1);
                return schema.min(new Date(newDate), validations.greaterEndDate);
            }
            return schema;
        }),
});
let auctionTitleValidationSchema = yup.object({
    minBid: yup.number().typeError("Enter valid amount.").required(validations.minBid).min(0.001, validations.greaterThanZero),
    incrementBidPercentage: yup.number().required(validations.bidIncrement).min(1, "Percentage should be between 1 and 100.").integer("Please enter a positive number.").max(100, "Percentage should be between 1 and 100."),
    title: yup.string().required("Package Name is required."),
    startDate: yup.date().required(validations.startDate),
    endDate: yup.date().required(validations.endDate).min(yup.ref("startDate"), validations.sameEndDate)
        .when("startDate", (startDate, schema) => {
            if (startDate) {
                let newDate = startDate.setHours(startDate.getHours() + 1);
                return schema.min(new Date(newDate), validations.greaterEndDate);
            }
            return schema;
        }),
});
let CreatePackageFixedPrice = (props) => {
    return (
        <Formik
            initialValues={{
                list: props.tickets,
                title: "",
                price: 0,
                minBid: 0,
                incrementBidPercentage: 0,
                startDate: new Date(),
                endDate: ""
            }}
            validationSchema={props.auction ? props.tickets.length > 1 ? auctionTitleValidationSchema : auctionValidationSchema : props.tickets.length > 1 ? titleValidationSchema : validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log(values);
                if (props.auction) {
                    if (moment.utc(values.startDate).isBefore(moment.utc(props.eventStartDate))) {
                        toast.error("Start Date should be greater than event start date(" + moment.utc(props.eventStartDate).format("MM/DD/YYYY, HH:mm") + ")");
                        return;
                    } else if (moment.utc(values.endDate).isAfter(moment.utc(props.eventEndDate))) {
                        toast.error("End Date should be less than event end date(" + moment.utc(props.eventEndDate).format("MM/DD/YYYY, HH:mm") + ")");
                        return;
                    }
                }
                if (values.list.filter(data => data.selectedCount > 0).length > 0) {
                    setSubmitting(true);
                    let toastId = toast.loading(
                        "Waiting for your transaction approval..."
                    );
                    let ticketsIds = [];
                    let ticketsCopies = [];
                    for (let i = 0; i < values.list.length; i++) {
                        if (values.list[i].selectedCount > 0) {
                            ticketsIds.push(values.list[i].ticketId.ticketId)
                            ticketsCopies.push(values.list[i].selectedCount)
                        }
                    }
                    let blockChainObject = {
                        eventId: props.blockChainEventId,
                        ticketsIds,
                        ticketsCopies,
                        price: props.auction ? values.minBid : values.price,
                        // auction objects
                        auctionStartTime: moment.utc(values.startDate).unix(),
                        auctionEndTime: moment.utc(values.endDate).unix(),
                        incrementPercentage: parseInt(values.incrementBidPercentage),
                    }
                    console.log(blockChainObject)
                    let blockChainResult = ""
                    if (props.auction) {
                        console.log("working on auction.")
                        blockChainResult = await createAuction(blockChainObject);
                    } else {
                        blockChainResult = await createPackage(blockChainObject);
                        console.log("working on fix price.")
                    }
                    console.log("blockChainResult", blockChainResult);
                    // *******************************************************************************
                    if (blockChainResult?.transactionHash) {
                        props.setTransactionHash(blockChainResult?.transactionHash)
                        let packageId = blockChainResult?.events?.packageCreated?.returnValues[0];
                        packageId = parseInt(packageId);
                        let ticketsObject = [];
                        console.log("values.list", values.list)
                        let list = values.list
                        for (let a = 0; a < list.length; a++) {
                            if (list[a].selectedCount > 0) {
                                console.log(list[a].ticketId._id);
                                let id = list[a].ticketId._id;
                                let count = list[a].selectedCount;
                                let data = {
                                    ticketId: id,
                                    count
                                }
                                console.log(data);
                                await ticketsObject.push(data);
                            }
                        }
                        let apiObjects = {
                            eventId: props.eventId,
                            packageId,
                            incrementBidPercentage: props.auction ? values.incrementBidPercentage : 0,
                            title: values.title,
                            maticPrice: props.auction ? 0 : values.price,
                            tickets: ticketsObject,
                            auction: props.auction,
                            createdTransactionHash: blockChainResult?.transactionHash,
                            minBid: props.auction ? values.minBid : 0,
                            startDate: values.startDate,
                            endDate: values.endDate
                        }
                        console.log(apiObjects);
                        ticketApi.addPackage(apiObjects).then(res => {
                            console.log(res)
                            if (res.status == 201) {
                                toast.success("Package created successfully.", {
                                    id: toastId,
                                });
                            }
                        }).catch(error => {
                            console.log("🚀 ~ file: createPackageFixedPrice.js:144 ~ ticketApi.addPackage ~ error:", error)
                            toast.error("Failed to save records.", {
                                id: toastId,
                            });
                        })

                        console.log(apiObjects)
                        setSubmitting(false);
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
                        setSubmitting(false);
                    }
                    // *******************************************************************************
                } else {
                    toast.error("Please add at least one tickets to your package.");
                    setSubmitting(false);
                }


            }}
        >
            {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="container-fluid semibold">
                        <div className="row">
                            <div className="col-xs-12 py-2">
                                {values.list?.map((data, index) => {
                                    return (
                                        <>
                                            <div className="col-xs-12">
                                                <h3>{data?.ticketId?.ticketTitle}</h3>
                                            </div>
                                            <div className="d-flex greyBackground priceModal align-items-center">
                                                <div className="mx-1  mx-sm-5">
                                                    <button
                                                        type="button"
                                                        className="btn btn-transparent"
                                                        onClick={() => {
                                                            if (data.selectedCount != 0) {
                                                                setFieldValue(`list[${index}].selectedCount`, data.selectedCount - 1);
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
                                                        value={values.list[index].selectedCount}
                                                    />
                                                    <ErrorMessage name="totalTickets" />
                                                </div>
                                                <div className="mx-1  mx-sm-5">
                                                    <button
                                                        type="button"
                                                        className="btn btn-transparent"
                                                        // disabled={true}
                                                        onClick={() => {
                                                            if (values.list[index].selectedCount < (data?.count - data.checkInCount - data.sell)) {
                                                                setFieldValue(`list[${index}].selectedCount`, data.selectedCount + 1);
                                                            }
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <small>{data?.count - data.checkInCount - data.sell} Tickets Left</small>
                                        </>
                                    )
                                })}
                            </div>
                            {values.list.length > 1 && (
                                <div className="col-12">
                                    <div className="form-floating my-3">
                                        <Field type="text"
                                            className="form-control"
                                            name="title"
                                        />
                                        <label htmlFor="floatingInput">Package Name</label>
                                        <ErrorMessage component="small" name="title" className="text-danger " />
                                    </div>
                                </div>
                            )}

                            {/* ********************auction****************************************** */}
                            {props.auction ? (
                                <>
                                    <div className="col-6">
                                        <div className="form-floating my-3">
                                            <Field type="number"
                                                className="form-control"
                                                name="minBid"
                                                placeholder="0.75 MATIC" />
                                            <label htmlFor="floatingInput">Minimum Bid</label>
                                            <ErrorMessage component="small" name="minBid" className="text-danger " />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating my-3">
                                            <Field type="number"
                                                className="form-control"
                                                name="incrementBidPercentage"
                                                placeholder="20%" />
                                            <label htmlFor="floatingInput">Bid Increment (%)</label>
                                            <ErrorMessage component="small" name="incrementBidPercentage" className="text-danger " />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating my-3">
                                            <Field type="datetime-local"
                                                className="form-control"
                                                name="startDate" />
                                            <label htmlFor="floatingInput">Starting Date</label>
                                            <ErrorMessage component="small" name="startDate" className="text-danger " />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating my-3">
                                            <Field type="datetime-local"
                                                className="form-control"
                                                id="endDate"
                                                name="endDate"
                                            />
                                            <label htmlFor="floatingInput">Expiration Date</label>
                                            <ErrorMessage component="small" name="endDate" className="text-danger " />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-12">
                                    <div className="form-floating my-3">
                                        <Field type="number"
                                            className="form-control"
                                            value={values.price}
                                            name='price'
                                            placeholder="0.4 MATIC" />
                                        <label htmlFor="floatingInput">Price</label>
                                        <ErrorMessage component="small" name="price" className="text-danger " />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    <hr></hr>
                    <div className="container-fluid">
                        <center>
                            {isSubmitting ? (
                                <button type="button" className="my-3 px-5 btn filledButton">
                                    Please wait...
                                </button>
                            ) : (
                                <button type="submit" className="my-3 px-5 btn filledButton">
                                    Sell Ticket
                                </button>
                            )}
                        </center>
                    </div>
                </Form>
            )}
        </Formik >
    )
}

export default CreatePackageFixedPrice;