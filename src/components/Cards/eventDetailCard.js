import { useEffect, useState } from "react";
//reactstrap 
import Card from "react-bootstrap/Card";
import RoutePaths from "../../routes/path";
import Moment from "../../utils/date";
import { useRouter } from "next/router";
//component
import getExtension from "../../utils/extension";
import Link from "next/link";
import { dates } from "../../constants/staticData";
let EventDetailCard = ({ data, index }) => {
  let router = useRouter();
  // let ticketDetailPage = () => router.push();
  let [startingPrice, setStartingPrice] = useState(0);
  let [startingStripePrice, setStripeStartingPrice] = useState(0);
  let ticketStartingPrice = () => {
    let startingPriceArray = [];
    let startingMaticPriceArray = [];
    if (data) {
      data.tickets.map((ticket) => {
        startingPriceArray.push(parseFloat(ticket.fixPrice));
        startingMaticPriceArray.push(parseFloat(ticket.stripeAmount));
      });
      //console.log("Tickets Prices:", startingPriceArray);
      let minVal = Math.min(...startingPriceArray);
      let minStripeVal = Math.min(...startingMaticPriceArray);
      setStartingPrice(minVal);
      setStripeStartingPrice(minStripeVal);
    }

  };

  useEffect(() => {
    if (data) {
      ticketStartingPrice();
    }
  }, []);
  return (
    <>
      <Link href={RoutePaths.events + "/" + data?.slug}>
        <Card className="mt-2 Card text-white">
          <div className="eventCard mt-3  container-fluid ">
            {/* <img src={data?.image} /> */}
            {data?.image && getExtension(data?.image) !== 'mp4' ?
              <img src={data?.image} className="coverImg" /> :
              <>
                <video src={data?.image} loop muted autoPlay className="coverImg" />
              </>
            }
          </div>
          <Card.Body>
            <div className="container-fluid eventCardTitle">
              <div className="row">
                <div className="col-12 text-start">
                  <h5 className="wrapText">{data?.eventName}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-start">
                  <p className="mb-0">{Moment(data?.startDate, dates.MMMDDYYYY)}</p>
                </div>
                <div className="col-6 text-end ">
                  <p className="wrapText mb-0">{data?.location}</p>
                </div>
              </div>
              <div className="wrapDescription py-2">{data.description}</div>
            </div>
            <div className="borderOutline d-none eventCardBody px-3 py-2">
              {/* <div className="row">
                <div className="col-xs-12   text-start text-md-start xsText ">
                  <p className="mb-0">Starting At</p>
                  <h5 className="purpleColor  mb-0 pt-1">
                    ${startingStripePrice?.toLocaleString()} USD | {startingPrice?.toLocaleString()} MATIC
                  </h5>
                </div>
              </div> */}
              <div className="row d-none">

                <div className="col-xs-12  text-start pt-2 xsText">
                  <p className="mb-0 break-word ">Remaining Tickets</p>
                  <h5 className="purpleColor pt-1">
                    {data?.totalTickets - data?.soldTickets}
                  </h5>
                </div>
              </div>
            </div>

          </Card.Body>
        </Card>
      </Link>
    </>

  );
};

export default EventDetailCard;
