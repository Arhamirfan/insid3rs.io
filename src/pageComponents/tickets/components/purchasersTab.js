import React, { useEffect, useState } from "react";
import Moment from '../../../utils/date';
import Spinner from "../../../components/spinner/Index";
import ticketApi from "../../../api/ticketApi";
import User from "../../../../public/assets/images/icons/user.png";
import { dates } from "../../../constants/staticData";
import globalServices from "../../../utils/globalServices";
import moment from "moment";
let PurchasersTab = ({ id, data }) => {
  let [ticketData, setTicketData] = useState([]);
  let [apiLoading, setApiLoading] = useState(true);
  useEffect(() => {
    if (id) {
      getTicketsById(id);
    }
  }, [data]);

  let getTicketsById = async (id) => {
    try {
      setApiLoading(true);
      ticketApi.getAllPurchasedTickets(id)
        .then((result) => {
          console.log('result', result);
          if (result && result.status == 200) {
            console.log("AllTicketPurchasersData:", result.data.data);
            setTicketData(result.data.data);
          } else {
            console.log(result);
          }
          setApiLoading(false);
        })
        .catch((error) => {
          setApiLoading(false);
        });
    } catch (error) {
      setApiLoading(false);
    }
  };
  return (
    <>
      <div className=" purchasers circularRadius mt-1 px-3">
        {!apiLoading ?
          <>
            <div className="pt-3">
              {ticketData?.length > 0 ? <>
                {ticketData?.map((purchasedTicket, index) => {
                  return (

                    <div className="d-flex justify-content-between align-items-center gap-3 mb-3 pb-4 purchaserItem" key={index}>
                      <div className="d-flex">
                        <img src={purchasedTicket?.address?.photo ? purchasedTicket?.address?.photo : User.src} className="circularRadiusLg" width={"40px"} height={"40px"} />
                        <div className="d-flex align-items-center gap-2 normalText descridivtionColor m-0 pt-1 ps-3">Purchased by <span className="purpleColor" >{purchasedTicket?.address?.name}</span></div>
                      </div>
                      <div className="descridivtionColor normalText pt-1 ps-3">{moment(new Date(purchasedTicket?.updatedAt)).format(dates.MMDDYYYYHHMM)}</div>
                      {/* <div className="descridivtionColor normalText pt-1 ps-3">{purchasedTicket?.createdAtLocal ? globalServices.showTimeWithMeridiem(purchasedTicket?.createdAtLocal) : moment(new Date(purchasedTicket?.updatedAt)).format(dates.MMDDYYYYHHMM)}</div> */}
                    </div>
                  );
                })}
              </> : <>
                <div className="d-flex m-3 py-5 justify-content-center">
                  <div className="mLargeBoldText smallFont">No purchasers</div>
                </div>
              </>}


            </div>
          </> : <>
            <Spinner />
          </>
        }

      </div>
    </>
  );
};

export default PurchasersTab;
