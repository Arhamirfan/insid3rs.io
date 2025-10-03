import React from 'react'
import * as yup from "yup";
import userApi from '../../api/user';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, ErrorMessage, Form } from "formik";

let validationSchema = yup.object({
    businessName: yup.string().required("Business name is required"),
    businessWebsite: yup.string().required("Business website is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    contactNo: yup.string().required("Contact number is required"),
    emailAddress: yup.string().email("Invalid Email").required("Email address is required"),
    nftTicketing: yup.string(),
    communityManagement: yup.boolean(),
    eventProduction: yup.boolean(),
    agencySolutions: yup.boolean(),
    additionalInformation: yup.string(),
});
let Whitelist = () => {

    let initialValues = {
        businessName: "",
        businessWebsite: "",
        firstName: "",
        lastName: "",
        contactNo: "",
        emailAddress: "",
        nftTicketing: false,
        communityManagement: false,
        eventProduction: false,
        agencySolutions: false,
        additionalInformation: "",

    };
    return (
        <>
            <div className="container text-start mt-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        //API
                        console.log('WaitListValues:', values)
                        try {
                            let toastId = toast.loading("Submitting user to wait list...");
                            userApi.addToWhitelist(values)
                                .then(async (result) => {
                                    if (result && result.status == 201) {
                                        console.log("whiteListData:", result.data);
                                    }
                                    toast.success('Successfully submitted.', { id: toastId, });
                                    setSubmitting(false);
                                    resetForm()
                                })
                                .catch((error) => {
                                    console.log("🚀 ~ file: whiteList.js:60 ~ Whitelist ~ error", error);
                                    toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message, { id: toastId, });
                                    setSubmitting(false);
                                });
                        } catch (error) {
                            console.log("🚀 ~ file: whiteList.js:65 ~ Whitelist ~ error", error)
                            toast.error(error.message, { id: toastId, });
                            setSubmitting(false);
                        }

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="row d-flex  mb-5 justify-content-center align-items-center gap-3">
                                <div className="col-sm-12 col-md-5 ">
                                    <div className="form-group">
                                        <h6 className="boldText">Business Name </h6>
                                        <Field name="businessName" className="form-control contactInputField " type="text" placeholder="Food Fest" />
                                    </div>
                                    <ErrorMessage className='text-danger regular' component="small" name={'businessName'} />
                                </div>
                                <div className="col-sm-12 col-md-5 pt-3 pt-sm-0">
                                    <div className="form-group">
                                        <h6 className="boldText">Business Website </h6>
                                        <Field name="businessWebsite" className="form-control contactInputField " type="text" placeholder="www.foodFest.com" />
                                    </div>
                                    <ErrorMessage className='text-danger regular' component="small" name={'businessWebsite'} />
                                </div>
                            </div>

                            <div className="row d-flex mb-5 justify-content-center align-items-center gap-3">
                                <div className="col-sm-12 col-md-5 ">
                                    <div className="form-group">
                                        <h6 className="boldText">First Name </h6>
                                        <Field name="firstName" className="form-control contactInputField " type="text" placeholder="John" />
                                    </div>
                                    <ErrorMessage className='text-danger regular' component="small" name={'firstName'} />
                                </div>
                                <div className="col-sm-12 col-md-5 pt-3 pt-sm-0">
                                    <div className="form-group">
                                        <h6 className="boldText">Last Name</h6>
                                        <Field name="lastName" className="form-control contactInputField " type="text" placeholder="Doe" />
                                    </div>
                                    <ErrorMessage className='text-danger regular' component="small" name={'lastName'} />
                                </div>
                            </div>

                            <div className="row d-flex  mb-5 justify-content-center align-items-center  gap-3">
                                <div className="col-sm-12 col-md-5">
                                    <div className="form-group">
                                        <h6 className="boldText">Contact No. </h6>
                                        <Field name="contactNo" className="form-control contactInputField " type="text" placeholder="+45 23453 2379" />
                                    </div>
                                    <ErrorMessage className='text-danger regular' component="small" name={'contactNo'} />
                                </div>
                                <div className="col-sm-12 col-md-5 ">
                                    <div className="form-group pt-3 pt-sm-0">
                                        <h6 className="boldText">Email Address </h6>
                                        <Field name="emailAddress" className="form-control contactInputField " type="text" placeholder="unknown@gmail.com" />
                                    </div>
                                    <ErrorMessage className='text-danger regular' component="small" name={'emailAddress'} />
                                </div>
                            </div>
                            <div className="row d-flex  mb-5 justify-content-center align-items-start  gap-3">
                                <div className="col-sm-12 col-md-5">
                                    <h6 className="boldText">Services you are interested</h6>
                                    <div className="d-flex flex-column gap-3 pt-4">
                                        <div className='checkbox'><Field type="checkbox" className='customCheckbox' name="nftTicketing" /> <span className='ps-4'>NFT Ticketing</span></div>
                                        <div className='checkbox'><Field type="checkbox" className='customCheckbox' name="communityManagement" /> <span className='ps-4'>Community Management</span></div>
                                        <div className='checkbox'><Field type="checkbox" className='customCheckbox' name="eventProduction" /> <span className='ps-4'>Event Production</span></div>
                                        <div className='checkbox'><Field type="checkbox" className='customCheckbox' name="agencySolution" /> <span className='ps-4'>Agency Solutions</span></div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-5 ">
                                </div>
                            </div>

                            <div className="row d-flex   mb-3 justify-content-center align-items-center  gap-3">
                                <div className="col-sm-12 col-md-11 px-md-5">
                                    <h6 className="boldText">
                                        Additional Information
                                    </h6>
                                    <Field name={'additionalInformation'} as="textarea" className="form-control" placeholder="Your answer" rows="5" />
                                </div>
                            </div>

                            <div className="row d-flex flex-row-reverse   ">
                                <div className="col-sm-3 text-center mt-5 ">
                                    <button className="btn filledButton " type='submit' disabled={isSubmitting}>{isSubmitting ? 'Loading..' : 'Submit'}</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Whitelist