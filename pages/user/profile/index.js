import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
//component
import Navbar from "../../../src/components/header/navbar";
import Footer from "../../../src/components/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../src/components/spinner/Index";
import toast, { Toaster } from 'react-hot-toast';
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import userApi from "../../../src/api/user";
import appApi from "../../../src/api/app";
import RoutePaths from "../../../src/routes/path";
import { useRouter } from "next/router";
import Actions from "../../../src/store/Actions/Actions";
import Copy from "../../../public/assets/images/icons/copy.png";
import User from "../../../public/assets/images/icons/user3.png";
import AddPhoto from "../../../public/assets/images/icons/add_a_photo.svg";
import { validations } from "../../../src/constants/staticData";
import globalServices from "../../../src/utils/globalServices";
// import User from "/public/assets/images/icons/user3.png";


let Index = () => {

    let wallet = useSelector(state => state.wallet);
    let [profileData, setProfileData] = useState([]);
    let [interestedEventData, setInterestedEventData] = useState();
    let [preferredEventData, setPreferredEventData] = useState();
    let [traveledEventData, setTraveledEventData] = useState();
    let [apiLoading, setApiLoading] = useState(true);
    let [fileLoader, setFileLoader] = useState(100);
    let [bannerFileLoader, setBannerFileLoader] = useState(100);
    let dispatch = useDispatch()
    let router = useRouter();
    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    useEffect(() => {
        // if (wallet?.address == "") {
        //     router.replace(RoutePaths.events);
        // }
        getProfile();
        getSocialEvents();
    }, [wallet?.address]);


    let getProfile = async () => {
        userApi.getUserProfile()
            .then((result) => {
                if (result && result.status == 200) {
                    setProfileData(result.data.data);
                }
                setApiLoading(false);
            })
            .catch((error) => {
                if (error?.response?.status == 401) {
                    localStorage.clear();
                    dispatch(Actions.updateWallet({ address: "", balance: "" }));
                    router.replace(RoutePaths.events);
                }
                // if (error.response.data.msg) {
                //     toast.error(error?.response?.data?.msg);
                // } else {
                //     toast.error(error.message);
                // }
                setApiLoading(false);
            });

    };
    let getSocialEvents = () => {
        try {
            Promise.all([
                appApi.getInterestedEvents(),
                appApi.getPreferredEvents(),
                appApi.getTravels()
            ]).then((data) => {
                console.log('AfterPromiseSetData: ', data);
                setInterestedEventData(data[0].data.data);
                setPreferredEventData(data[1].data.data);
                setTraveledEventData(data[2].data.data);
            }).catch((error) => {
                console.log("🚀 ~ file: support.js:82 ~ ]).then ~ error", error);
            });
        } catch (error) {
            console.log("🚀 ~ file: support.js:85 ~ getSocialEvents ~ error", error);
        }
    }

    let validationSchema = yup.object({
        name: yup.string().required(validations.name),
        email: yup.string().required(validations.email).email(validations.invalidEmail),
        phoneNumber: yup.string().required(validations.phoneNo).matches(phoneRegExp, validations.invalidPhone),
        zip: yup.number().required(validations.zip).typeError(validations.invalidZip),
        photo: yup.string().required(validations.photo),
    });

    let initialValues = {
        banner: profileData?.banner ? profileData?.banner : "",
        name: profileData.name ? profileData.name : "",
        email: profileData.email ? profileData.email : "",
        phoneNumber: profileData.phoneNumber ? profileData.phoneNumber : "",
        zip: profileData.zip ? profileData.zip : "",
        photo: profileData.photo ? profileData.photo : "https://global-dev-assets.s3.amazonaws.com/local/profile/63db6128d9be4ccf5cdc54ba/6239588S3file-user3.png",
        preferredEvents: profileData.preferredEvents ? profileData.preferredEvents : [],
        interestedEvents: profileData.interestedEvents ? profileData.interestedEvents : [],
        travelEvents: profileData.travelEvents ? profileData.travelEvents : [],

    };

    let copyText = () => {
        if (wallet.address) {
            navigator.clipboard.writeText(wallet.address);
            toast.success('Address Copied.');
        } else {
            toast.error('Address not found.');
        }
    }

    let uploadFileToS3 = async (event, imageType) => {
        let toastId = toast.loading("Uploading image...");
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            try {
                var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
                // var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4)$/i;
                if (file.size / 1024 / 1024 > 10) {
                    console.log(file.size / 1024 / 1024, " MB");
                    file = "";
                    toast.error("File size cannot be greater than 10 MB", { id: toastId, });
                    return false;
                } else {
                    if (!allowedExtensions.exec(file.name)) {
                        file = "";
                        toast.error("Invalid file type", { id: toastId, });
                        return false;
                    } else {
                        imageType === "banner" ? setBannerFileLoader(0) : setFileLoader(0);
                        let apiData = {
                            image: file.name,
                            contentType: file.type
                        }
                        let data = await userApi.userProfileS3(apiData);
                        console.log(data.data);
                        let url = data.data.data;
                        console.log("url", url);
                        let result = await userApi.s3_upload_loader(url, file, (percent) => {
                            imageType === "banner" ? setBannerFileLoader(percent) : setFileLoader(percent);
                            console.log(percent);
                        }).catch((error) => {
                            toast.error(`${error.message}`, { id: toastId, });
                            return error;
                        });
                        console.log(result);
                        try {
                            let s3url = result.responseURL.split("?")[0];
                            console.log(s3url);
                            toast.success("File uploaded successfully.", { id: toastId, });
                            return s3url;
                        } catch (error) {
                            return ""
                        }
                    }
                }
            } catch (error) {
                toast.error(`${error.message}`, { id: toastId, });
            }
        }
    };

    return (
        <>
            <div className="backgroundColor font text-white background-circle">
                <Navbar />
                {apiLoading ? (
                    <>
                        <div className="py-5">
                            <Spinner />
                        </div>
                    </>
                ) : (
                    <div className="container mt-5 HomeBody">
                        {wallet.address ? <>
                            <div className='xxlBoldText boldText text-center py-5'>My Profile</div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    let data = { ...values }
                                    setSubmitting(true);
                                    data.preferredEvents = await data.preferredEvents.map((event) => event._id)
                                    data.interestedEvents = await data.interestedEvents.map((event) => event._id)
                                    data.travelEvents = await data.travelEvents.map((event) => event._id)
                                    data.canProvideExistingEmail = true;
                                    console.log('profileValuesUpdated:', data);
                                    try {
                                        let toastId = toast.loading("Updating user profile...");
                                        userApi.updateUser(data)
                                            .then(async (result) => {
                                                if (result && result.status == 200) {
                                                    dispatch(Actions.updateWallet({ profile: result.data.data }));
                                                }

                                                toast.success('Successfully updated user profile..', {
                                                    id: toastId,
                                                });
                                                setSubmitting(false)
                                            })
                                            .catch((error) => {
                                                toast.error('Error: ' + error?.response?.data?.msg ? error?.response?.data?.msg : error.message, { id: toastId });
                                                setSubmitting(false)
                                            });
                                    } catch (error) {
                                        toast.error('Error ' + error.messages, {
                                            id: toastId,
                                        });
                                    }
                                    setSubmitting(false);
                                }}
                            >
                                {({ values, errors, isValid, setFieldValue, isSubmitting }) => (
                                    <Form
                                    // onSubmit={e => {
                                    //     console.log("isValid", isValid);
                                    //     console.log("errors", errors);
                                    //     if (isValid) {
                                    //         handleSubmit(e)
                                    //     } else {
                                    //         e.preventDefault();
                                    //         toast.error(`Error: ${Object.values(errors)}`);
                                    //     }
                                    // }}
                                    >
                                        {/* <pre>{JSON.stringify(values)}</pre>
                                        <pre>{JSON.stringify(errors)}</pre> */}
                                        {values.banner ?
                                            <div className="aboutImage mb-4 ">
                                                <img src={values.banner} className="coverImg circularRadiusLg pointer" onClick={() => document.getElementById('banner').click()} />
                                                <input
                                                    id="banner"
                                                    hidden
                                                    type="file"
                                                    onChange={async (e) => {
                                                        let url = await uploadFileToS3(e, "banner");
                                                        console.log("banner", url);
                                                        if (url) {
                                                            setFieldValue("banner", url);
                                                        }
                                                    }}
                                                />
                                            </div> : <>
                                                <div className="linedBorder circularRadius mb-4  ">
                                                    <div className="py-5 px-md-5">
                                                        {bannerFileLoader < 100 ? (
                                                            <div className="my-2">
                                                                <div className="progress">
                                                                    <div className="progress-bar purpleBackground" role="progressbar" style={{ width: ` ${bannerFileLoader}%` }} aria-valuenow={bannerFileLoader} aria-valuemin="    0" aria-valuemax="100">{parseInt(bannerFileLoader)}%</div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex flex-column justify-content-center align-items-center gap-3 purpleColor " >
                                                                <div className="pointer text-center">
                                                                    <img src={AddPhoto.src} />
                                                                    <p className="pt-2" onClick={() => document.getElementById('banner').click()}>
                                                                        upload photo
                                                                    </p>
                                                                    <input
                                                                        id="banner"
                                                                        hidden
                                                                        type="file"
                                                                        onChange={async (e) => {
                                                                            let url = await uploadFileToS3(e, "banner");
                                                                            console.log("banner", url);
                                                                            if (url) {
                                                                                setFieldValue("banner", url);
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className=" mb-0">Allowed *.jpeg, *.jpg, *.png</p>
                                                                    <p>Max size of 10 MB</p>
                                                                </div>
                                                            </div>
                                                        )
                                                        }

                                                    </div>
                                                </div>
                                            </>}

                                        <div className="row d-flex flex-column flex-md-row mb-5 gap-5 justify-content-between align-items-start">
                                            <div className="col ">
                                                <div className="form-group">
                                                    <h6 className="boldText">Name</h6>
                                                    <Field name="name" className="form-control contactInputField " type="text" />
                                                </div>
                                                <ErrorMessage className=' mt-2' component="p" name={'name'} />
                                            </div>
                                            <div className="col ">
                                                <div className="form-group">
                                                    <h6 className="boldText">Email</h6>
                                                    <Field name="email" className="form-control contactInputField " type="text" />
                                                </div>
                                                <ErrorMessage className=' mt-2' component="p" name={'email'} />
                                            </div>
                                        </div>
                                        <div className="row  flex-column flex-md-row  mb-5 gap-5 justify-content-between align-items-start">
                                            <div className="col">
                                                <div className="form-group">
                                                    <h6 className="boldText">Phone Number</h6>
                                                    <Field name="phoneNumber" className="form-control contactInputField " type="text" />
                                                </div>
                                                <ErrorMessage className=' mt-2' component="p" name={'phoneNumber'} />
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <h6 className="boldText">ZIP Code</h6>
                                                    <Field name="zip" className="form-control contactInputField " type="text" />
                                                </div>
                                                <ErrorMessage className=' mt-2' component="p" name={'zip'} />
                                            </div>
                                        </div>
                                        {/* wallet and profile */}
                                        <div className="row d-flex flex-column flex-md-row mb-5 gap-5 justify-content-between align-items-start">
                                            <div className="col">
                                                <div className="form-group">
                                                    <h6 className="boldText">Wallet Address</h6>
                                                    <div className="d-flex pt-3">
                                                        <h6 className="descriptionColor wrapContent" name="walletAddress">{wallet.address ? wallet?.address : "Connect wallet first"}</h6>
                                                        <div className="ps-4 "> <img src={Copy.src} className="pb-1 hoverEffect" onClick={copyText} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <h6 className="boldText">Profile Image</h6>
                                                    {fileLoader < 100 ? (
                                                        <div className="my-2">
                                                            <div className="progress">
                                                                <div className="progress-bar purpleBackground" role="progressbar" style={{ width: ` ${fileLoader}%` }} aria-valuenow={fileLoader} aria-valuemin="    0" aria-valuemax="100">{parseInt(fileLoader)}%</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="d-flex flex-column flex-sm-row pt-3 align-items-center">
                                                            <div className="me-3">
                                                                <img src={values.photo} className="circularImage " />
                                                            </div>
                                                            <input
                                                                className="my-3 px-5 btn filledButton d-none "
                                                                id="photo"
                                                                type="file"
                                                                onChange={async (e) => {
                                                                    let url = await uploadFileToS3(e, "photo");
                                                                    console.log("photo", url);
                                                                    if (url) {
                                                                        setFieldValue(`photo`, url);
                                                                    }
                                                                }}
                                                            />
                                                            <button type="button"
                                                                className="my-3 mx-2 px-3 btn filledButton "
                                                                onClick={async (e) => {
                                                                    document.getElementById("photo").click()
                                                                }}>
                                                                Upload New Picture
                                                            </button>
                                                            <button type="button"
                                                                onClick={() => {
                                                                    setFieldValue(`photo`, User.src);
                                                                }}
                                                                className="py-3 ms-sm-3 px-5 btn circularButton border-danger text-danger">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <ErrorMessage className=' mt-2' component="p" name={'photo'} />
                                            </div>
                                        </div>
                                        {/* <pre>{JSON.stringify(values.preferredEvents)}</pre> */}
                                        {/* prefer events */}
                                        {preferredEventData?.length > 0 ?
                                            <>
                                                <div className="d-flex flex-column flex-md-row mb-5 gap-5 justify-content-between align-items-start" >
                                                    <div className="form-group">
                                                        <h6 className="">What Type of Events you Prefer</h6>
                                                        <div className="row gap-2 preferredEvents pt-4">
                                                            {/* {JSON.stringify(values.preferredEvents)} */}
                                                            {preferredEventData?.map((event, index) => {
                                                                let status = values?.preferredEvents?.filter(data => data._id === event._id).length > 0 ? true : false;
                                                                return (
                                                                    <div className="col-auto" key={index}>
                                                                        <button
                                                                            className={`btn ${status ? 'active' : ''} preferEventButton circularRadiusLg `}
                                                                            type="button"

                                                                            onClick={() => {
                                                                                let list = values?.preferredEvents;
                                                                                if (status) {
                                                                                    setFieldValue(`preferredEvents`, list.filter(data => data._id !== event._id));
                                                                                } else {
                                                                                    setFieldValue(`preferredEvents`, [...list, event]);
                                                                                }
                                                                            }}
                                                                        > {event.name}</button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                            </> : <></>}
                                        {interestedEventData?.length > 0 ?
                                            <>
                                                <div className="d-flex flex-column flex-md-row mb-5 gap-5 justify-content-between align-items-start" >
                                                    <div className="form-group">
                                                        <h6 className="">Interested In</h6>
                                                        <div className="row gap-2 preferredEvents pt-4">
                                                            {interestedEventData?.map((event, index) => {
                                                                let status = values?.interestedEvents?.filter(data => data._id === event._id).length > 0 ? true : false;
                                                                return (
                                                                    <div className="col-auto" key={index}>
                                                                        <button
                                                                            className={`btn ${status ? 'active' : ''} preferEventButton circularRadiusLg `}
                                                                            type="button"

                                                                            onClick={() => {
                                                                                let list = values?.interestedEvents;
                                                                                if (status) {
                                                                                    setFieldValue(`interestedEvents`, list.filter(data => data._id !== event._id));
                                                                                } else {
                                                                                    setFieldValue(`interestedEvents`, [...list, event]);
                                                                                }
                                                                            }}
                                                                        > {event.name}</button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                            </> : <></>}
                                        {traveledEventData?.length > 0 ?
                                            <>
                                                <div className="d-flex flex-column flex-md-row mb-5 gap-5 justify-content-between align-items-start" >
                                                    <div className="form-group">
                                                        <h6 className="">Where Would You Travel For Events</h6>
                                                        <div className="row gap-2 preferredEvents pt-4">
                                                            {traveledEventData?.map((event, index) => {
                                                                let status = values?.travelEvents?.filter(data => data._id === event._id).length > 0 ? true : false;
                                                                return (
                                                                    <div className="col-auto" key={index}>
                                                                        <button
                                                                            className={`btn ${status ? 'active' : ''} preferEventButton circularRadiusLg `}
                                                                            type="button"

                                                                            onClick={() => {
                                                                                let list = values?.travelEvents;
                                                                                if (status) {
                                                                                    setFieldValue(`travelEvents`, list.filter(data => data._id !== event._id));
                                                                                } else {
                                                                                    setFieldValue(`travelEvents`, [...list, event]);
                                                                                }
                                                                            }}
                                                                        > {event.name}</button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                            </> : <></>}
                                        <div className="d-flex justify-content-center justify-content-md-end">
                                            <div className="">
                                                {fileLoader == 100 && (
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="my-3 px-5 btn filledButton ">
                                                        {isSubmitting ? "Loading..." : "Save"}
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </> : <>
                            <div className="container my-5 py-5 text-white">
                                <div className="d-flex py-5 justify-content-center">
                                    <h3 className="py-5">Wallet not connected</h3>
                                </div>
                            </div>
                        </>}

                    </div>
                )}
                {!globalServices.isIframeWebsite() && <Footer />}
            </div>
        </>
    );
};

export default Index;
