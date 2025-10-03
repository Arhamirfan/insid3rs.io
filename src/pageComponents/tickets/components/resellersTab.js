import React, { useState, useEffect } from "react";
import ticketApi from "../../../api/ticketApi";
import Moment from "../../../utils/date";
import Spinner from "../../../components/spinner/Index";
import RoutePaths from "../../../routes/path";
import { useRouter } from "next/router";

import User from "/public/assets/images/icons/user.png";
import { dates } from "../../../constants/staticData";
import moment from "moment";
const ResellersTab = ({ id, data }) => {
  let router = useRouter();
  let [modalShow, setModalShow] = useState(false);
  let [ticketData, setTicketData] = useState([]);
  let [apiLoading, setApiLoading] = useState(true);
  useEffect(() => {
    if (id) {
      getResellerByTicketId(id);
    }
  }, [data]);

  let getResellerByTicketId = async (id) => {
    try {
      setApiLoading(true);
      ticketApi.getResellerByTicketId(id)
        .then((result) => {
          console.log('result', result);
          if (result && result.status == 200) {
            console.log("ResellersData:", result.data.data);
            setTicketData(result.data.data);
          } else {
            console.log(result);
          }
          setApiLoading(false);
        })
        .catch((error) => {
          console.log("🚀 ~ file: resellersTab.js:30 ~ getResellerByTicketId ~ error", error)
          setApiLoading(false);
        });
    } catch (error) {
      console.log("🚀 ~ file: resellersTab.js:34 ~ getResellerByTicketId ~ error", error)
      setApiLoading(false);
    }
  };
  return (
    <>
      <div className="purchasers circularRadius mt-1  ">
        {!apiLoading ?
          <></> : <>
            <Spinner />
          </>}
        <div className="px-sm-1">
          {ticketData.length > 0 ? <>
            {ticketData?.map((resellerData, index) => {
              return (
                <div key={index} className="d-flex justify-content-between purchaserItem sm-row-checkout mt-3 pb-3">

                  <div className="d-flex gap-4">
                    <div className="d-flex align-items-center">
                      <img
                        className="circularRadiusLg"
                        src={resellerData?.userId?.photo ? resellerData?.userId?.photo : User.src}
                        width={"48px"}
                        height={"48px"}
                      />
                    </div>
                    <div className="d-flex flex-direction-column justify-content-start">
                      <div className="text-white zeroMargin smallFont">
                        Owned by <span className="purpleColor"> {resellerData?.userId?.name}</span>
                      </div>
                      <div>{resellerData?.tickets?.filter((resellerData => resellerData?.ticketId?._id === id))[0]?.ticketId?.validFor?.map((validDate, index) => {
                        return (
                          <span className="xsText" key={index}>
                            {index !== 0 && ", "}
                            {moment(validDate).format('MM/DD/YYYY')}
                          </span>
                        );
                      })}</div>
                    </div>
                  </div>

                  <div className="d-flex mobileCentered mt-3">
                    <p className="zeroMargin d-flex align-items-center gap-2">{resellerData?.auction ? "Minimum Bid: " : "Price: "}<span className="purpleColor">{resellerData?.auction ? resellerData?.minBid : resellerData?.maticPrice} MATIC</span></p>
                  </div>

                  <div className="d-flex align-items-center mobileCentered mt-3">
                    <button
                      className="btn purpleButton xxlcircularRadius px-3 py-2 xsText"
                      disabled={resellerData?.transactionHash ? true : false}
                      onClick={() => {
                        if (!resellerData?.transactionHash) {
                          router.push(RoutePaths.resellerTicket + `/${resellerData?._id}`)
                        }
                      }}
                    >
                      {resellerData?.transactionHash ? "Sold" : `Buy Now`}
                    </button>
                  </div>
                </div>
              );
            })}

          </> : <>
            <div className="d-flex m-3 py-5 justify-content-center">
              <div className="mLargeBoldText smallFont">No Resellers</div>
            </div>
          </>}

        </div>
      </div>
    </>
  );
};


export default ResellersTab;
