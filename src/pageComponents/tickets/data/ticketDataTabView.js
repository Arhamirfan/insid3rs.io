import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RoutePaths from "../../../routes/path";
import getExtension from "../../../utils/extension";
import TicketDetailsAccordion from "../../../components/Accordion/TicketDetailsAccordion";
import toast, { Toaster } from "react-hot-toast";
import Moment from "../../../utils/date";
import { dates } from "../../../constants/staticData";
import BuyTicketModalData from "./buyTicketModalData";
import BuyTicketModal from "../../../components/Modal/buyTicketModal";
import moment from "moment/moment";
import globalServices from "../../../utils/globalServices";
//images
import Snap from "../../../../public/assets/images/icons/snap.png";
let TicketDataTabView = ({ TicketData }) => {
  let router = useRouter();


  return (
    <>
      <div className="events py-5 mt-5 container-fluid semibold ">
        <div className="container mt-1">
          <div className="row justify-content-center gap-5">
            <div className="col-md-12 col-lg-4 mobileCentered justify-content-between flex-column">
              {/* IMAGE */}
              <div className="d-flex justify-content-center flex-column ticket-image">
                <div className="mobileCentered onlyMobile pb-2">
                  <h1 className="xxxlCustomText minimizeFont">
                    {TicketData?.ticketTitle}{" "}
                    {`(${TicketData?.ticketType
                      ? TicketData?.ticketType?.ticketType
                      : "No Ticket Type Defined"
                      })`}
                  </h1>
                </div>
                {getExtension(TicketData?.image) !== 'mp4' ?
                  <img src={TicketData?.image} className="circularRadius coverImg" quality={100} sizes="100%" /> :
                  <>
                    <video src={TicketData?.image} loop muted autoPlay className="circularRadius coverImg" quality={100} sizes="100%" />
                  </>
                }
                {/* VIEW MORE */}
                {!globalServices.isIframeWebsite() &&

                  <div className="d-flex justify-content-center mobileCentered mt-3">
                    <u
                      className="greyColor normalText hoverEffect"
                      onClick={() => { router.push(RoutePaths.events + "/" + TicketData?.event_id?.slug) }}
                    >
                      View more from this event
                    </u>
                  </div>
                }
              </div>
              {/* TICKET VALIDITY */}
              <div className="row px-3 py-3 mt-3 ticket-validation onlyPc">
                <div className="col-6">
                  <div className="d-flex justify-content-start">Valid for</div>
                  {/* {TicketData?.validFor?.map((valid, index) => <div className="d-flex justify-content-start purpleColor" key={index}>{Moment(valid, dates.MMDDYYYY)}</div>)} */}
                  <div className="d-flex justify-content-start purpleColor" >{moment(TicketData?.validFor[0]).format("MM-DD-YYYY")}</div>
                  {TicketData?.validFor.length > 1 ? <><p className="mb-0 "> To </p><div className="d-flex justify-content-start purpleColor" >{moment(TicketData?.validFor[TicketData?.validFor.length - 1]).format("MM-DD-YYYY")}</div> </> : <></>}
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-start">Venue</div>
                  <div className="d-flex justify-content-start purpleColor">{TicketData?.event_id?.location}</div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-7">
              <div className="mobileCentered onlyPc">
                <h1 className="xxxlCustomText minimizeFont">
                  {TicketData?.ticketTitle}{" "}
                  {`(${TicketData?.ticketType
                    ? TicketData?.ticketType?.ticketType
                    : "No Ticket Type Defined"
                    })`}
                </h1>
              </div>
              {/* TICKETS LEFT */}
              <div className="mobileCentered">
                <div className="col-12 purpleColor onlyPc">
                  {/* {TicketData.totalTickets - TicketData.soldTickets} Tickets Left */}
                </div>
              </div>
              {/* PRICE - OWNER */}
              <div className="d-flex py-3 justify-content-between mobile-mb-3">
                <div>
                  <div className="d-flex justify-content-start largeBoldText">Price</div>
                  <div className="d-flex justify-content-start mt-2">
                    Owner
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-start gap-2 largeBoldText">
                    ${(TicketData?.stripeAmount)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    <span>|</span>
                    <span className="purpleColor">
                      {TicketData?.fixPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} MATIC
                    </span>
                  </div>
                  <div className="d-flex justify-content-end purpleColor mt-2">InsiderIO</div>
                </div>
              </div>
              {/* CHECKOUT */}
              <div className="px-4 py-4 mt-3 sCircularRadius checkout-section">
                <BuyTicketModal data={TicketData} />
              </div>
            </div>
            <div className="row px-3 py-3 mt-5 ticket-validation validMobile ml-1">
              <div className="col-6">
                <div className="d-flex justify-content-start">Valid for</div>
                {/* {TicketData?.validFor?.map((valid, index) => <div className="d-flex justify-content-start purpleColor" key={index}>{Moment(valid, dates.MMDDYYYY)}</div>)} */}
                <div className="d-flex justify-content-start purpleColor" >{moment(TicketData?.validFor[0]).format("MM-DD-YYYY")}</div>
                {TicketData?.validFor.length > 1 ? <><p className="mb-0 text-center"> To </p> <div className="d-flex justify-content-start purpleColor" >{moment(TicketData?.validFor[TicketData?.validFor.length - 1]).format("MM-DD-YYYY")}</div></> : <></>}
              </div>
              <div className="col-6">
                <div className="d-flex justify-content-start">Venue</div>
                <div className="d-flex justify-content-start purpleColor">{TicketData?.event_id?.location}</div>
              </div>
            </div>
            {/* TICKET DETAILS */}
            <div className="mt-5">
              <TicketDetailsAccordion data={TicketData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TicketDataTabView;