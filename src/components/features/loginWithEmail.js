import React, { useState, useEffect } from "react";
import Actions from "../../store/Actions/Actions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { validations } from "../../constants/staticData";
import toast from "react-hot-toast";
import authApi from "../../api/auth";
import { connectEmail } from "../../services/blockChain/contractMethods";
import { getAccountBalance } from "../../services/blockChain/contractMethods";
import metaKeepIcon from "../../../public/assets/images/icons/MetaKeep-1.png";
let validationSchema = yup.object({
    email: yup.string().email(validations.invalidEmail).required(validations.email),
    password: yup.string().min(8, validations.invalidPassword).required(validations.password),
});


let LoginWithEmail = (props) => {
    let initialValues = {
        email: "",
        password: "",
    };
    let wallet = useSelector(state => state.wallet);
    let dispatch = useDispatch()
    // useEffect(() => {

    // }, []);


    return (
        <>
            <div className="loginWithGoogleModal font">
                {wallet.address != "" ? (
                    <>
                        {wallet?.profile?.account_type == "EMAIL" && (
                            <div className="connectionContainer" onClick={logOut}>
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log('Values:', values)
                                setSubmitting(true);
                                authApi.emailToAddress({ email: values.email }).then(async (res) => {
                                    values.address = res.data.data.address;
                                    authApi.login(values).then(async (result) => {
                                        if (result && result.status == 200) {
                                            let profile = result.data.data;
                                            console.log('profile', profile)
                                            let balance = await getAccountBalance(profile.address, profile?.email, 'METAKEEP');
                                            let resData = await connectEmail(profile, "EMAIL");
                                            console.log('profileResult:', resData)
                                            if (resData?.connected) {
                                                toast.success('Successfully logged in.');
                                                dispatch(Actions.updateWallet({ address: profile.address, balance, profile }));
                                                props.setConnecting(false);
                                            } else {
                                                toast.error(resData?.messages);
                                                localStorage.setItem("walletType", "");
                                                localStorage.removeItem("token");
                                                dispatch(Actions.updateWallet({ address: "", balance: "", profile: {} }));
                                            }
                                            props.handleClose();
                                            setSubmitting(false);
                                        }
                                    }).catch((error) => {
                                        console.log("🚀 ~ file: loginWithEmail.js:73 ~ LoginWithEmail ~ error", error)
                                        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error?.message);
                                        setSubmitting(false);
                                    });
                                }).catch((error) => {
                                    console.log("🚀 ~ file: loginWithEmail.js:57 ~ authApi.emailToAddress ~ error:", error)
                                    toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error?.message);
                                    setSubmitting(false);
                                })


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
                                                        name="email"
                                                    />
                                                    <label htmlFor="floatingInput">Email</label>
                                                    <ErrorMessage component="small" name="email" className="redColor " />
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
                                            <div className="col-12">
                                                <div className="d-flex flex-row forgot-password-btn mobileCentered mt-1">
                                                    <p className="medium hoverEffect" onClick={() => { toast.success('Coming soon.') }}>Forgot password?</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">

                                            <button className="btn filledButton px-sm-5" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Loading..' : 'Log in'}</button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </div>
        </>
    )
}

export default LoginWithEmail