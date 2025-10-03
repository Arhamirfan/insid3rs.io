import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//BOOTSTRAP 
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
//images
import Head from "next/head";
import location from "../../public/assets/images/icons/location.png";
import calender from "../../public/assets/images/icons/calender.png";
import Moment from "../../src/utils/date";
import insiderLogo2 from "../../public/assets/images/insidersAboutTopLogo.svg";
//data  
import EventApi from "/src/api/eventApi";
import getExtension from "../../src/utils/extension";
import InsiderTickets from "../../src/pageComponents/event/eventTickets/ticketsByInsider";
import ResellersTickets from "../../src/pageComponents/event/eventTickets/ticketsByResellers";
import AccordionFaq from "../../src/components/Accordion/eventDetails";
import Support from "../../src/pageComponents/event/support";
import { dates } from "../../src/constants/staticData";
import globalServices from "../../src/utils/globalServices";

let EventDetail = ({ EventData }) => {
  return (
    <>
      <Navbar />

      <div className="backgroundColor font text-white background-circle">
        {EventData._id ? (
          <>
            <Head>
              <title>{EventData?.eventName}</title>
              <meta property="og:title" content={EventData?.eventName} />
              <meta property="og:description" content={EventData?.description} />
              <meta name="description" content={EventData?.description} />
              {getExtension(EventData?.image) !== 'mp4' && <meta property="og:image" content={EventData?.image} />}
            </Head>
            <div className="events mt-5 py-5 container-fluid">
              {/* Event Banner */}
              {getExtension(EventData?.image) !== 'mp4' ?
                <>
                  <div className="onlyMobile">
                    <div className="xxlBoldText boldText mobileCentered">{EventData?.eventName}</div>
                    <div className="mobile-image mx-auto mt-5">
                      <img className="circularRadius" height="100%" width="100%" src={EventData?.image} alt="Event image" />
                    </div>
                    <div className="insideData ps-5 pt-5 pb-2">
                      <div className="d-flex justify-content-center">
                        <div className="row my-3 align-items-center eventDate">
                          <div className="col-auto">
                            <img src={calender.src} height="30" width={"30"} />
                          </div>
                          <div className="col">
                            <p className="xsText m-0">{`${Moment(EventData?.startDate, dates.MMDDYYYY)}`}</p>
                          </div>
                        </div>
                        <div className="row my-3 align-items-center">
                          <div className="col-auto">
                            <img src={location.src} height="30" width={"30"} />
                          </div>
                          <div className="col location-hyperlink">
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EventData?.location)}`} target="_blank" rel="noreferrer">
                              <p className="xsText m-0">{EventData?.location?.length > 36 ? `${EventData?.location?.substring(0, 36)}...` : `${EventData?.location}`}</p>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-11 col-md-8 mobileCentered mt-4">
                          <p className="normalLgText regular p_wrap" >{`${EventData?.description}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    className="eventTopCard mx-auto mt-3 py-5 onlyPc"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${EventData?.image})` }}
                  >
                    <div className="insideData ps-5 pt-5 pb-5">
                      <div className="xxlBoldText boldText">{EventData?.eventName}</div>
                      <div className="row mt-3 align-items-center" >
                        <div className="col-auto">
                          <img src={calender.src} height="30" width={"30"} />
                        </div>
                        <div className="col">
                          <p className="xsText m-0">{`${Moment(EventData?.startDate, dates.MMDDYYYY)}`}</p>
                        </div>
                      </div>
                      <div className="row my-3 align-items-center">
                        <div className="col-auto">
                          <img src={location.src} height="30" width={"30"} />
                        </div>
                        <div className="col location-hyperlink">
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EventData?.location)}`} target="_blank" rel="noreferrer">
                            <p className="xsText m-0">{`${EventData?.location}`}</p>
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-11 col-md-8  ">
                          <p className="normalLgText regular p_wrap" >{`${EventData?.description}`}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/*  */}
                </> :
                <>
                  <div className="eventTopCard mx-auto onlyPc mt-3 py-5">
                    <div className=" eventDetailBody">
                      <video src={EventData?.image} className="circularRadiusLg coverVideo" loop muted autoPlay />

                      <div className="videoInsideDiv ps-5 pt-5 pb-5 ">
                        <div className="xxlBoldText boldText mobileCentered">{EventData?.eventName}</div>
                        <div className="row mt-3 align-items-center" >
                          <div className="col-auto">
                            <img src={calender.src} height="30" width={"30"} />
                          </div>
                          <div className="col">
                            <p className="xsText m-0">{`${Moment(EventData?.startDate, dates.MMDDYYYY)}`}</p>
                          </div>
                        </div>
                        <div className="row my-3 align-items-center">
                          <div className="col-auto">
                            <img src={location.src} height="30" width={"30"} />
                          </div>
                          <div className="col location-hyperlink">
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EventData?.location)}`} target="_blank" rel="noreferrer">
                              <p className="xsText m-0">{`${EventData?.location}`}</p>
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-11 col-md-8  ">
                            <p className="normalLgText regular text-justify p_wrap mobileCentered ">{EventData?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="eventTopCard mx-auto onlyMobile mt-3 py-5">
                    <div className=" eventDetailBody">
                      <video src={EventData?.image} className="circularRadiusLg coverVideo" loop muted autoPlay />

                      <div className="videoInsideDiv ps-5 pt-5 pb-5 ">
                        <div className="xxlBoldText boldText mobileCentered">{EventData?.eventName}</div>
                        <div className="d-flex justify-content-between ps-md-0 pb-2">
                          <div className="row mt-3 align-items-center eventDate">
                            <div className="col-auto">
                              <img src={calender.src} height="30" width={"30"} />
                            </div>
                            <div className="col">
                              <p className="xsText m-0">{`${Moment(EventData?.startDate, dates.MMDDYYYY)}`}</p>
                            </div>
                          </div>
                          <div className="row mt-3 align-items-center">
                            <div className="col-auto">
                              <img src={location.src} height="30" width={"30"} />
                            </div>
                            <div className="col location-hyperlink">
                              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EventData?.location)}`} target="_blank" rel="noreferrer">
                                <p className="xsText m-0">{EventData?.location?.length > 36 ? `${EventData?.location?.substring(0, 36)}...` : `${EventData?.location}`}</p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-11 col-md-8 mt-4">
                            <p className="normalLgText regular text-justify p_wrap mobileCentered ">{EventData?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }

              {/* Tickets by insider */}
              <div className="p-5" fontWeight="bold">
                <div className="row align-items-center text-center text-sm-start">
                  <div className="col-12 col-sm-auto  ">
                    <div className="xlLgBoldText boldText">Tickets by</div>
                  </div>
                  <div className="col mt-1 ml-sm-2">
                    <img src={insiderLogo2.src} height="42px" width="132px" />
                  </div>
                </div>
              </div>
              {/* tickets */}
              <InsiderTickets ticketData={EventData.tickets} />
              {/* FAQs */}
              <div className="mt-5">
                <AccordionFaq
                  experience={EventData.aboutExperience}
                  needToKnow={EventData.needToKnow}
                  faqs={EventData.faq}
                />
              </div>
              {/* tickets by resellerTickets */}
              <ResellersTickets eventId={EventData?._id} />
              {/* Support */}
              <div className="mt-5">
                <Support />
              </div>
            </div>
          </>
        ) : (
          <div className="pt-5">
            <div className="container my-5 py-5 text-white">
              <div className="d-flex pt-5 justify-content-center">
                <h4>No events found</h4>
              </div>
            </div>
          </div>
        )}


        {!globalServices.isIframeWebsite() && <Footer />}
      </div>
    </>
  );
};


export async function getServerSideProps(context) {
  let { id } = context.params;
  let res = await EventApi.getEventById(id).then((res) => res).catch(error => { return {} })
  if (res?.data?.data) {
    res = res?.data?.data
  } else {
    res = {}
  }

  return { props: { EventData: res } }
}

export default EventDetail;
