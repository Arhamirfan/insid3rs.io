import React, { useState, useEffect } from "react";
import EventDetailCard from "../../components/Cards/eventDetailCard";
import search from "../../api/search";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import moment from "moment/moment";
let validationSchema = yup.object({
  search: yup.string().required("Search value is required"),
});

let Index = ({ eventData }) => {
  let [data, setData] = useState(eventData);
  useEffect(() => {
    if (eventData)
      sortedData();
  }, [eventData])
  let sortedData = () => {
    let update = eventData?.filter(event => moment.utc(new Date()).startOf('day').isSameOrBefore(moment.utc(event?.endDate).startOf('day'))).sort((a, b) => {
      const timeDiffA = moment.utc() - moment.utc(a?.startDate);
      const timeDiffB = moment.utc() - moment.utc(b?.startDate);
      return timeDiffA - timeDiffB;
    });
    console.log('allEventsData', update.reverse())
    setData(update)
  }


  let initialValues = {
    search: "",
  };

  return (
    <>
      <div className="container-fluid EventsSection font text-white pb-5 ">
        <div className="row mt-5 justify-content-center align-items-center">
          <div className="col text-center text-sm-start">
            <h1 className="mb-0 semibold xlLgBoldText">All Events</h1>
          </div>
          <div className="col-auto pe-3 ">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                //API
                console.log('searchValue:', values)
                //let toastId = toast.loading("Searching...");
                try {
                  search.searchEventByName(values.search)
                    .then(async (result) => {
                      if (result && result.status == 201) {
                        if (result.data.data.length > 0) {
                          console.log("SearchedEventData:", result.data.data);
                          setData(result.data.data);
                        } else {
                          toast.error('No events found.');
                        }
                      }
                      // toast.success('Successfully fetched event', {
                      //   id: toastId,
                      // });
                      setSubmitting(false);
                    })
                    .catch((error) => {
                      console.log("🚀 ~ file: allEvents.js ~ line 28 ~ handleSubmit ~ error", error)
                      // toast.error(error.message, {
                      //   id: toastId,
                      // });
                      setSubmitting(false);
                    });
                } catch (error) {
                  console.log("🚀 ~ file: allEvents.js ~ line 37 ~ handleSubmit ~ error", error)
                  // toast.error(error.message, {
                  //   id: toastId,
                  // });
                  setSubmitting(false);
                }
              }}
            >
              {() => (
                <Form  >
                  <div>
                    <div className="d-flex pt-3 pt-sm-0">
                      <Field
                        type="search" name="search"
                        placeholder="Search"
                        className="form-control searchBar"
                      />
                    </div>
                  </div>
                  <ErrorMessage component="small" name="search" className="text-danger regular" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="mt-5 row ">
          {data.length > 0 ? <>
            {data?.filter(event => moment.utc(new Date()).startOf('day').isSameOrBefore(moment.utc(event?.endDate).startOf('day'))).map(
              (data, index) => {
                return (
                  <div
                    className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                    key={index}
                  >
                    <EventDetailCard data={data} index={index} />
                  </div>
                );
              }
            )}
          </> : <>
            <div className="d-flex   py-5 justify-content-center">
              <div className="mLargeBoldText">No events available</div>
            </div>
          </>}

        </div>

      </div>
    </>
  );
};

export default Index;