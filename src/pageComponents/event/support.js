import React from "react";
import * as yup from "yup";
import appApi from "../../api/app";
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, ErrorMessage, Form } from "formik";

let validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  organizerOrTicketBuyer: yup.string().required("Organizer or buyer name is required"),
  regardingEvent: yup.string().required("Regarding event is required"),
});
let Support = () => {

  let initialValues = {
    name: "",
    email: "",
    organizerOrTicketBuyer: "",
    regardingEvent: "",
    additionalInformation: "",
  };

  return (
    <>
      <div className="container text-start mt-5 pt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log('supportValues:', values)
            let toastId = toast.loading("Sending email for support...");
            appApi.contactUs(values)
              .then(async (result) => {
                if (result && result.status == 201) {
                  console.log("supportData:", result.data);
                }
                toast.success('Successfully submitted.', {
                  id: toastId,
                });
                setSubmitting(false);
                resetForm()
              })
              .catch((error) => {
                console.log("🚀 ~ file: support.js:46 ~ Support ~ error", error)
                if (error?.response?.data?.msg) {
                  toast.error(error?.response?.data?.msg);
                } else {
                  toast.error(error.message);
                }
                setSubmitting(false);
              });


          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="xlLgBoldText boldText text-center">Need Support?</div>
              <div className="row d-flex  my-5 justify-content-center align-items-start gap-3">
                <div className="col-sm-12 col-md-5 ">
                  <div className="form-group">
                    <h6 className="boldText">Name </h6>
                    <Field name="name" className="form-control contactInputField " type="text" placeholder="Full Name" />
                  </div>
                  <ErrorMessage className='text-danger regular' component="small" name={'name'} />
                </div>
                <div className="col-sm-12 col-md-5 pt-3 pt-sm-0">
                  <div className="form-group">
                    <h6 className="boldText">Email </h6>
                    <Field name="email" className="form-control contactInputField " type="text" placeholder="abs@gmail.com" />
                  </div>
                  <ErrorMessage className='text-danger regular' component="small" name={'email'} />
                </div>
              </div>
              <div className="row d-flex mb-5 justify-content-center align-items-start gap-3">
                <div className="col-sm-12 col-md-5 ">
                  <div className="form-group">
                    <h6 className="boldText">Are you an event organizer or ticket buyer?</h6>
                    <Field name="organizerOrTicketBuyer" className="form-control contactInputField " type="text" placeholder="Select your answer" />
                  </div>
                  <ErrorMessage className='text-danger regular' component="small" name={'organizerOrTicketBuyer'} />
                </div>
                <div className="col-sm-12 col-md-5 pt-3 pt-sm-0">
                  <div className="form-group">
                    <h6 className="boldText">What event is this regarding?</h6>
                    <Field name="regardingEvent" className="form-control contactInputField " type="text" placeholder="Your answer" />
                  </div>
                  <ErrorMessage className='text-danger regular' component="p" name={'regardingEvent'} />
                </div>
                <div className="row d-flex   my-5 justify-content-center align-items-center  gap-3">
                  <div className="col-sm-12 col-md-11 px-md-4 px-lg-5">
                    <h6 className="boldText">
                      Please provide any additional information that may help us resolve your request.
                    </h6>
                    <Field name={'additionalInformation'} as="textarea" className="form-control" placeholder="Your answer" rows="5" />
                  </div>
                </div>

                <div className="row d-flex flex-row-reverse   ">
                  <div className="col-sm-3 text-center mt-2 ">
                    <button className="btn filledButton " type='submit' disabled={isSubmitting}>{isSubmitting ? 'Loading..' : 'Submit'}</button>
                  </div>
                </div>
              </div>

            </Form>
          )}
        </Formik>
      </div>

      {/* <div className="container mt-5">
        <div className="row d-flex  mb-5 gap-3 justify-content-center align-items-center">
          <div className="col-sm-12 col-md-5 pe-md-5">
            <h6 className="boldText">Name</h6>
            <Form.Control
              placeholder="Full name"
              aria-label="Full name"
              className="contactInputField"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col-sm-12 col-md-5 ps-md-5  pt-2 pt-md-0">
            <h6 className="boldText">Email</h6>
            <Form.Control
              placeholder="abs@gmail.com"
              aria-label="abs@gmail.com"
              className="contactInputField"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="row d-flex  mb-5 gap-3 justify-content-center align-items-center">
          <div className="col-sm-12 col-md-5 pe-md-5">
            <h6 className="boldText">Are you an event organizer or ticket buyer?</h6>
            <Form.Control
              placeholder="Your answer"
              aria-label="Your answer"
              className="contactInputField"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col-sm-12 col-md-5 ps-md-5  pt-2 pt-md-0">
            <h6 className="boldText">What event is this regarding?</h6>
            <Form.Control
              placeholder="Your answer"
              aria-label="Your answer"
              className="contactInputField"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="row d-flex   mb-3 justify-content-center align-items-center">
          <div className="col-sm-12 col-md-10 ">
            <h6 className="boldText">
              Please provide any additional information that may help us resolve
              your request.
            </h6>
            <Form.Control as="textarea" aria-label="Your answer" rows="5" />
          </div>
        </div>

        <div className="row d-flex flex-row-reverse me-5 pe-5">
          <div className="col-sm-3 text-center mt-5 me-5">
            <button className="btn filledButton ">Submit</button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Support;
