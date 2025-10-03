import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//BOOTSTRAP
import Navbar from "../../../src/components/header/navbar";
import Footer from "../../../src/components/footer/footer";
import Spinner from "../../../src/components/spinner/Index";
import appApi from "../../../src/api/app";
import TicketDataTabView from "../../../src/pageComponents/tickets/resellerTickets/data/ticketDataTabView";
import globalServices from "../../../src/utils/globalServices";
let EventDetail = () => {
  let router = useRouter();
  let [ticketData, setTicketData] = useState([]);
  let [apiLoading, setApiLoading] = useState(true);
  let resellerId = router.query.id;
  console.log(resellerId);

  useEffect(() => {
    if (resellerId) {
      getTicketsById();
    }
  }, [resellerId]);

  let getTicketsById = async () => {

    //let toastId = toast.loading("Searching ticket...");
    try {
      setApiLoading(true);
      appApi.getResellerTicketById(resellerId)
        .then((result) => {
          if (result && result.status == 200) {
            console.log("ticketData:", result.data.data);
            setTicketData(result.data.data);

          } else {
            console.log(result);
          }
          // toast.success('successfully fetched ticket', {
          //   id: toastId,
          // });
          setApiLoading(false);
        })
        .catch((error) => {
          console.log("🚀 ~ file: [id].js:37 ~ getTicketsById ~ error", error)
          setApiLoading(false);
          // toast.error(error.message, {
          //   id: toastId,
          // });
        });
    } catch (error) {
      console.log("🚀 ~ file: [id].js:41 ~ getTicketsById ~ error", error)
      setApiLoading(false);
      // toast.error(error.message, {
      //   id: toastId,
      // });
    }
  };

  return (
    <>
      <div className="backgroundColor font text-white ">
        <Navbar />
        {!apiLoading ?
          <>
            {ticketData._id ? (
              <>
                <TicketDataTabView
                  ticketData={ticketData}
                  sellType={"fixedPrice"}
                  getTicketsById={getTicketsById}
                />
              </>
            ) : (
              <>
                <div className="pt-5">
                  <div className="container my-5 py-5 text-white">
                    <div className="d-flex justify-content-center">
                      <h4>No tickets found</h4>
                    </div>
                  </div>
                </div>
              </>
            )}
          </> :
          <div className="py-5">
            <Spinner />
          </div>}


        {!globalServices.isIframeWebsite() && <Footer />}
      </div>
    </>
  );
};

export default EventDetail;
