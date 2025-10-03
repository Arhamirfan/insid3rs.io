import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Spinner from "../../../../components/spinner/Index";
import ticketApi from "../../../../api/ticketApi";
import Actions from '../../../../store/Actions/Actions'
import EventImage from "../../../../../public/assets/images/eventImage.png";
let PurchasersTab = ({ ticketsData }) => {
  let dispatch = useDispatch()
  let auctions = useSelector(state => state.auctions.list);
  let [apiLoading, setApiLoading] = useState(true);
  useEffect(() => {
    if (ticketsData._id) {
      let id = ticketsData._id
      getTicketsById(id);
    }
  }, []);

  let getTicketsById = async (id) => {
    try {
      setApiLoading(true);
      ticketApi.getAuctionBids(id)
        .then((res) => {
          console.log('res', res);
          if (res && res.status == 200) {
            dispatch(Actions.addAuctionList({
              list: res.data.data,
              auctionId: ticketsData._id,
              minBidAmount: ticketsData.minBid,
            }))
          }
          setApiLoading(false);
        })
        .catch((error) => {
          console.log("🚀 ~ file: purchasersTab.js ~ line 31 ~ getTicketsById ~ error", error)
          setApiLoading(false);
        });
    } catch (error) {
      console.log("🚀 ~ file: purchasersTab.js ~ line 35 ~ getTicketsById ~ error", error)
      setApiLoading(false);
    }
  };
  return (
    <>
      <div className="pt-4">
        <h4>Bids</h4>
        <div className="darkPurpleBackground purchasers circularRadius mt-4 px-3">
          {!apiLoading ?
            <>
              <div className="pt-3 px-5">
                {auctions.length > 0 ? <>
                  {auctions.map((data, index) => {
                    return (
                      <div className="d-flex align-items-center  gap-3 mb-3" key={index}>
                        <img
                          className="circularRadiusLg" width={"50px"} height={"50px"}
                          src={data?.userId?.photo ? data?.userId?.photo : EventImage.src}
                        />
                        <div>
                          <p className="descriptionColor pt-1 mb-0 ps-3">by {data?.userId?.name}, {moment(data?.bidTime).calendar()}  </p>
                          <p className="descriptionColor pt-1 mb-0 ps-3">Bid Amount: {data?.bidAmount?.toFixed(4)}</p>
                        </div>
                      </div>
                    );
                  })}
                </> : <>
                  <div className="d-flex m-3 py-5 justify-content-center">
                    <div className="mLargeBoldText smallFont">No Bids</div>
                  </div>
                </>}
              </div>
            </> : <>
              <Spinner />
            </>
          }
        </div>
      </div>
    </>
  );
};

export default PurchasersTab;
