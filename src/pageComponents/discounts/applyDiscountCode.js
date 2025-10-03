import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import appApi from "../../api/app";

let discountValidationSchema = yup.object({
    name: yup.string().required("Discount code is  required"),
});

let ApplyDiscountCode = ({ ticketId }) => {



    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                }}
                validationSchema={discountValidationSchema}
                onSubmit={(values, { setFieldError, setSubmitting }) => {
                    setSubmitting(true);
                    //add ticket id with value 
                    // console.log(values);
                    let newValues = { ticketId: data._id, ...values }
                    console.log('newValues:', newValues)
                    // setFieldError("name", error.message);
                    setSubmitting(false);
                }}>
                {({
                    values,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                        <div className="my-3">
                            <div className="semiBold largeBoldText">Discount Code (optional)</div>
                            <div className="d-flex flex-column flex-sm-row gap-2">
                                <Field type="text" className="form-control" name="name" placeholder="NY22" />
                                <button className="btn purpleButton" type="submit">Apply&nbsp;Code</button>
                            </div>
                            <ErrorMessage component="small" name="name" className="text-danger " />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );

}
export default ApplyDiscountCode;