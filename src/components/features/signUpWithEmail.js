import React, { useState, useEffect } from "react";
import Actions from "../../store/Actions/Actions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { validations } from "../../constants/staticData";
import toast from "react-hot-toast";
import AuthApi from "../../api/auth";
import UserApi from "../../api/user"
import metaKeepIcon from "../../../public/assets/images/icons/MetaKeep-1.png";
import Success from "../../../public/assets/images/icons/success.png";
import googleButton from "../../../public/assets/images/icons/googleButton.svg";
import metaKeepButton from "../../../public/assets/images/icons/metaKeepButton.svg";
import metamaskButton from "../../../public/assets/images/icons/metamaskButton.svg";
let validationSchema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(validations.invalidEmail).required(validations.email),
    phoneNumber: yup.string(),
    password: yup.string().min(8, validations.invalidPassword).required(validations.password),
});


let SignUpWithEmail = (props) => {
    let [signUpSuccessTab, setSignUpSuccessTab] = useState(false);
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    let initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    };

    return (
        <>
            <div className="loginWithGoogleModal font">
                {wallet.address != "" ? (
                    <>
                        {wallet?.profile?.account_type == "EMAIL" && (
                            <div className="connectionContainer" onClick={() => { toast.error('close modal here') }}>
                                <div>
                                    <img src={metaKeepIcon.src} alt="" style={{ height: "17px" }} />
                                </div>
                                <div>
                                    Logout from email
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {!signUpSuccessTab ? <>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    console.log('Values:', values)
                                    setSubmitting(true);
                                    let toastId = toast.loading("creating your account...");
                                    UserApi.signUp(values).then(async (result) => {
                                        if (result && result.status == 201) {
                                            console.log("signUpData:", result.data);
                                            toast.success('Successfully created account.', { id: toastId });
                                            setSignUpSuccessTab(true)
                                            setSubmitting(false);
                                            resetForm()
                                        }
                                    })
                                        .catch((error) => {
                                            toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message, { id: toastId });
                                            setSubmitting(false);
                                        });

                                }}
                            >
                                {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting, errors }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="container-fluid font">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-floating my-3">
                                                        <Field type="text"
                                                            className="form-control"
                                                            name="firstName"
                                                        />
                                                        <label htmlFor="floatingInput">First Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating my-3">
                                                        <Field type="text"
                                                            className="form-control"
                                                            name="lastName"
                                                        />
                                                        <label htmlFor="floatingInput">Last Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating my-3">
                                                        <Field type="text"
                                                            className="form-control"
                                                            name="email"
                                                        />
                                                        <label htmlFor="floatingInput">Email</label>
                                                        <ErrorMessage component="small" name="email" className="redColor " />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating my-3">
                                                        <Field type="text"
                                                            className="form-control"
                                                            name="phoneNumber"
                                                        />
                                                        <label htmlFor="floatingInput">Phone Number</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating mt-3">
                                                        <Field type="password"
                                                            className="form-control"
                                                            name="password"
                                                        />
                                                        <label htmlFor="floatingInput">Password</label>
                                                        <ErrorMessage component="small" name="password" className="redColor " />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column flex-sm-row justify-content-center mt-3 gap-2">
                                                {/* <button className="btn filledButton px-sm-5" type="button" onClick={() => { props.setSignUpTab(false) }}>Cancel</button> */}
                                                <button className="btn filledButton px-sm-5" type="submit">Sign&nbsp;Up</button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="pt-2 pt-md-4">
                                <p className="text-center">OR</p>
                                <div className="d-flex justify-content-center gap-3 text-center pt-2">
                                    <img className="pointer" onClick={() => { localStorage.setItem("walletType", "GOOGLE"); props.setSignUpTab(false); }} src={googleButton.src} alt="" />
                                    <img className="pointer" onClick={() => { props.setSignUpTab(false); props.walletConnection("", false) }} src={metamaskButton.src} alt="" />
                                    <img className="pointer" onClick={() => { props.setSignUpTab(false); props.connectMetaKeepFun(false); }} src={metaKeepButton.src} alt="" />
                                </div>
                                <div className="text-center darkGreyColor pt-3 pt-md-5">
                                    Already have an account? <small className="purpleColor normalText medium pointer" onClick={() => props.setSignUpTab(false)}>Log in</small>
                                </div>
                            </div>
                        </> : <>
                            <div className="text-center font">
                                <img src={Success.src} height="100" width={"100"} />
                                <div className="largeBoldText semibold pt-2">Account successfully created</div>
                                <p className="descriptionColor">Please check your email to verify email and password</p>
                                <button className="btn filledButton px-sm-5" type="button" onClick={() => {
                                    setSignUpSuccessTab(false);
                                    props.setSignUpTab(false)
                                    props.setConnecting(false);
                                    props.handleClose();
                                }}>Close</button>

                            </div>
                        </>}
                    </>
                )}
            </div>
        </>
    )
}

export default SignUpWithEmail