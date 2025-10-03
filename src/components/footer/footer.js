import React from "react";
import Link from "next/link";
import RoutePaths from "../../routes/path";
import userApi from "../../api/user";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
//images
import Logo from "../../../public/assets/images/insiderLogo.png";
import discord from "../../../public/assets/images/icons/discord.png";
import instagram from "../../../public/assets/images/icons/instagram.png";
import telegram from "../../../public/assets/images/icons/telegram.png";
import twitter from "../../../public/assets/images/icons/twitter.png";
import linkedin from "../../../public/assets/images/icons/linkedin.png";
import reddit from "../../../public/assets/images/icons/reddit.png";
// import insiderLogo2 from "../../../public/assets/images/icons/insiderLogo2.png";
import insiderLogo2 from "../../../public/assets/images/insidersAboutTopLogo.svg";
import { urls } from "../../constants/staticData";

let validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

let Footer = () => {

  let initialValues = {
    email: "",
  };

  return (
    <>
      <div className="Footer font text-white">
        <div className="d-flex font justify-content-center  align-items-center pt-5 pb-2">
          <div className="row">
            <div className="col">
              <img src={insiderLogo2.src} height={85} width={160} className="coverImg" />
            </div>
          </div>
        </div>

        {/* NewsLetter */}
        <div
          className="newsLetter py-5 px-5 mb-3"
          style={{ backgroundColor: "#A555FA" }}
        >
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-sm-12 col-md-5">
                <h4 className="boldText text-center text-md-start m-0">SUBSCRIBE TO OUR NEWSLETTER</h4>
              </div>
              <div className="col-sm-12 col-md-5 mt-3 mt-md-0">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    //API
                    console.log('SubscribeValues:', values)
                    userApi.subscribeEmail(values)
                      .then(async (result) => {
                        if (result && result.status == 201) {
                          console.log("subscribeData:", result.data);
                        }
                        toast.success(result.data.msg);
                        setSubmitting(false);
                        resetForm()
                      })
                      .catch((error) => {
                        console.log("🚀 ~ file: support.js:74 ~ Footer ~ error", error)
                        error?.response?.data ? toast.error(error?.response?.data?.msg) : toast.error(error.message);
                        setSubmitting(false);
                      });


                  }}
                >
                  {({ values, isSubmitting }) => (
                    <Form>
                      <div className="d-flex subscribeNewsletter">
                        <Field
                          type="text"
                          placeholder="Enter your Email"
                          className="ps-2 ps-sm-4 newsletterEmailInput "
                          name={`email`}
                          value={values.email}
                        />
                        <button type="submit" variant="white" className="btn m-0 newsletterEmailButton ">
                          JOIN
                        </button>
                      </div>
                      <ErrorMessage className=' mt-2 regular' component="p" name={'email'} />
                    </Form>
                  )}
                </Formik>

              </div>
            </div>
          </div>
        </div>

        {/* Navigation + Contact */}
        <div className="container newsLetter pt-3">
          <div className="row d-flex justify-content-between align-items-start">
            <div className="col text-center text-sm-start">
              <div className="">
                <h4 className="boldText">Navigation</h4>
                <div className="row d-flex  justify-content-around pt-3">
                  <div className="col-12 col-md-3 ">
                    <div className="d-flex flex-column noTextDecoration gap-2">
                      <Link href={RoutePaths.events}> Events </Link>
                      <Link href={RoutePaths.insidersPass}> Web3 INSID3RS </Link>
                      <Link href={RoutePaths.about}> About </Link>
                      <Link href={RoutePaths.contact}> Contact </Link>
                    </div>
                  </div>

                  <div className="col">
                    <div className="d-flex flex-column noTextDecoration  gap-2">
                      <Link href={RoutePaths.blog}> Blog </Link>
                      <Link href={RoutePaths.policy}> Privacy Policy </Link>
                      <Link href={RoutePaths.termsAndCondition}> Terms & Conditions </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col text-center text-sm-end">
              <div className="">
                <h4 className="boldText">Contact</h4>

                <div className="d-flex flex-column gap-2 pt-3">
                  <p className="mb-0">info@insid3rs.io</p>
                  {/* <p className="mb-0">Tel: +1.717.363.0564</p> */}
                  <p className="mb-0">Los Angeles, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Social Links */}

        <hr></hr>
        <div className="container">
          <div className=" newsLetter py-4  ">
            <div className="row justify-content-between">
              <div className="col-12 col-md-6">
                <p className="text-center text-md-start semibold">
                  {`© ${new Date().getFullYear()} by INSID3RS.io. All Rights Reserved.`}
                </p>
              </div>
              <div className="col-md-auto">
                <div className="row justify-content-center gap-0 gap-sm-3">
                  <div className="col">
                    <a href={`${urls.reddit}`} target="_blank" rel="noreferrer"><img src={reddit.src} /></a>
                  </div>
                  <div className="col">
                    <a href={`${urls.linkedin}`} target="_blank" rel="noreferrer"><img src={linkedin.src} /></a>
                  </div>
                  <div className="col">
                    <a href={`${urls.instagram}`} target="_blank" rel="noreferrer"><img src={instagram.src} /></a>
                  </div>
                  <div className="col">
                    <a href={`${urls.twitter}`} target="_blank" rel="noreferrer"><img src={twitter.src} /></a>
                  </div>
                  <div className="col">
                    <a href={`${urls.discord}`} target="_blank" rel="noreferrer"><img src={discord.src} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Footer;
