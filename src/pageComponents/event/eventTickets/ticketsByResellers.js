import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import appApi from "../../../api/app";
import Spinner from "../../../components/spinner/Index";
import TicketResellerDetailCard from "../../../components/Cards/resellerTicketDetailCard";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import globalServices from "../../../utils/globalServices";
let validationSchema = yup.object({
  search: yup.string().required("Search value is required"),
});

let Index = ({ eventId }) => {
  let [ShowMore, setShowMore] = useState(8);
  let [resellerData, setResellerData] = useState();
  let [apiLoading, setApiLoading] = useState(true);
  let [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    if (eventId) {
      getResellers();
    }
  }, []);

  let getResellers = async () => {
    setApiLoading(true);
    try {
      appApi.getResellerPackages(eventId)
        .then((result) => {
          if (result && result.status == 200) {
            console.log("resellerData:", result.data.data);
            setResellerData(result.data.data);
          } else {
            console.log('in else result:', result);
          }
          setApiLoading(false);
        })
        .catch((error) => {
          console.log("🚀 ~ file: ticketsByResellers.js:41 ~ getResellers ~ error", error)
          if (error?.response?.data?.msg) {
            toast.error(error?.response?.data?.msg);
          } else {
            toast.error(error.message);
          }
          setApiLoading(false);
        });
    } catch (error) {
      console.log("🚀 ~ file: ticketsByResellers.js:45 ~ getResellers ~ error", error)
      setApiLoading(false);
    }
  };
  let initialValues = {
    search: "",
  };
  let showMoreData = () => {
    setShowMore((x) => x + 8);
  };

  useEffect(() => {
    console.log('showMoreCheckerCalled');
    if (resellerData?.length > 0 && ShowMore > resellerData.length) {
      setNoMoreData(true);
    }
  }, [ShowMore, resellerData]);

  return (
    <>
      <div className=" EventsSection text-white insiderTickets pt-5 mt-5">
        <div className="d-flex flex-md-row flex-column mt-5 justify-content-between align-items-center">
          <div className=" ">
            <div className="xlLgBoldText boldText mb-0">Tickets by Resellers</div>
          </div>
          {!globalServices.isIframeWebsite() &&
            <div className="pt-4 pt-md-0">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  //API
                  console.log('searchValue:', values)
                  //let toastId = toast.loading("Searching...");
                  try {
                    appApi.searchPackages(values.search)
                      .then(async (result) => {
                        if (result && result.status == 200) {
                          if (result.data.data.length > 0) {
                            console.log("SearchedEventData:", result.data.data);
                            let newResult = await result.data.data.filter((packages) => packages.eventId._id === eventId)
                            console.log(eventId, '=> Packages: ', newResult);
                            setResellerData(newResult);
                          } else {
                            toast.error('No events found.');
                          }
                        }
                        setSubmitting(false);
                      })
                      .catch((error) => {
                        console.log("🚀 ~ file: ticketsByResellers.js:100 ~ Index ~ error", error)
                        setSubmitting(false);
                        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : error.message);
                      });
                  } catch (error) {
                    console.log("🚀 ~ file: ticketsByResellers.js:104 ~ Index ~ error", error)
                    setSubmitting(false);
                  }
                }}
              >
                {() => (
                  <Form  >
                    <div className="d-flex">
                      <Field
                        type="search" name="search"
                        placeholder="Search"
                        className="form-control searchBar"
                      />
                    </div>
                    <ErrorMessage component="small" name="search" className="text-danger " />
                  </Form>
                )}
              </Formik>
            </div>}
        </div>
        {!apiLoading ?
          <>
            {resellerData?.length > 0 ?
              <>
                <div className="mt-5 mb-5 row ">
                  {resellerData?.filter((item, idx) => idx < ShowMore)
                    .map((data, index) => {
                      return (
                        <>
                          <div
                            className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                            key={index}
                          >
                            <TicketResellerDetailCard eventData={data} index={index} />
                          </div>
                        </>
                      );
                    }
                    )}
                </div>
                {!noMoreData && <center className="mb-5">
                  <button className="mb-5 transparentButton text-white" onClick={showMoreData}>
                    Show more
                  </button>
                </center>}

              </> : <>
                <div className="pt-5">
                  <div className="container my-5 py-5 text-white">
                    <div className="d-flex justify-content-center">
                      <div className="mLargeBoldText">No ticket available</div>
                    </div>
                  </div>
                </div>
              </>}

          </> :
          <>
            <Spinner />
          </>
        }

      </div>
    </>
  );
};

export default Index;
