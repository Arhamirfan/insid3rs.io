import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import userApi from "../../api/user";
import ticketApi from "../../api/ticketApi";
import Actions from "../../store/Actions/Actions";
let AddEmailModal = ({ show, setShow, data, profile, setRecall = false, page = '' }) => {
    let dispatch = useDispatch();
    let discountValidationSchema = yup.object({
        email: yup.string().email().required("Email is  required"),
    });
    return (
        <>
            <Modal show={show} className="profileModal"
            // onHide={() => { handleClose(); setSignUpTab(false) }} className="profileModal"
            >
                <Modal.Header closeButton >
                    <Modal.Title ><div className="text-center"></div><div className="d-flex justify-content-center "><div className="semibold normalLgText text-center font">Add User Email</div> </div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container pb-sm-1 font">
                        <Formik
                            initialValues={{
                                email: "",
                            }}
                            validationSchema={discountValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                let { banner, name, email, phoneNumber, zip, photo, preferredEvents, interestedEvents, travelEvents } = profile;
                                let profileData = {
                                    banner, name, email: values.email, phoneNumber, zip: zip ? zip : 0, photo, preferredEvents, interestedEvents, travelEvents, canProvideExistingEmail: false
                                }
                                console.log('addEmailValues:', profileData)
                                userApi.updateUser(profileData).then(async (result) => {
                                    console.log('profileResult:', result.data)
                                    if (result && result.status == 200) {
                                        dispatch(Actions.updateWallet({ profile: result.data.data }));
                                        data.success = true;
                                        data.ErrorMessage = "";
                                        ticketApi.buyTicketsMail(data).then(res => {
                                            toast.success('Successfully send mail.')
                                            setShow(false)
                                            console.log(res.data);
                                            if (page == 'reseller') {
                                                setRecall(true);
                                            }
                                            return res.status
                                        }).catch(error => {
                                            console.log("🚀 ~ file: addEmailModal.js:46 ~ ticketApi.buyTicketsMail ~ error:", error)
                                            toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                                        })
                                    }
                                }).catch((error) => {
                                    toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                                })
                                setSubmitting(false);
                            }}>
                            {({
                                values,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="my-3">
                                        <div className="semiBold descriptionColor smallText text-center ">Add email to send purchased ticket record and save it as your email</div>
                                        <div className="d-flex flex-column  gap-2 pt-3">
                                            <Field type="text" className="form-control" name="email" placeholder="" />
                                            <ErrorMessage component="small" name="email" className="redColor" />
                                            <div className="d-flex flex-column flex-md-row  gap-2 py-3">
                                                <button className="btn preferEventButton xxlcircularRadius halfWidth py-2" type="button" onClick={() => {
                                                    setShow(false);
                                                    if (page == 'reseller') {
                                                        setRecall(true);
                                                    }
                                                }}>Cancel</button>
                                                <button className="btn purpleButton xxlcircularRadius halfWidth py-2" type="submit">Add&nbsp;Email</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </Modal.Body>
            </Modal>


        </>
    );
};

export default AddEmailModal;
