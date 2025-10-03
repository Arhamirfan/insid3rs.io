import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";

let EventDetail = () => {
  let router = useRouter();
  let [EventData, setEventData] = useState([]);
  let [message, setMessage] = useState("Loading");
  let cardIndex = router.query.id;
  console.log(cardIndex);

  useEffect(() => {
    if (cardIndex) {
      getEventById();
    }
  }, [cardIndex]);

  let getEventById = async () => {
    // try {
    //   EventApi.getEventById(cardIndex)
    //     .then((result) => {
    //       if (result && result.status == 201) {
    //         console.log("EventData:", result.data.data);
    //         setEventData(result.data.data);
    //         setMessage("");
    //       } else {
    //         console.log(result);
    //       }
    //     })
    //     .catch((error) => {
    //       setMessage(error.message);
    //     });
    // } catch (error) {
    //   setMessage(error.message);
    // }
  };
  return (
    <>
      <div className="backgroundColor text-white ">
        <Navbar />
        {EventData ? (
          <>
            {/* <div className="events py-5 container-fluid"> 
              <ResellersTickets ticketData={EventData.tickets} />
            </div> */}
          </>
        ) : (
          <h2>Tickets Not Available</h2>
        )}

        <Footer />
      </div>
    </>
  );
};

export default EventDetail;
