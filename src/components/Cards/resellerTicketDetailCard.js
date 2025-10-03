//reactstrap 
import Card from "react-bootstrap/Card";
import RoutePaths from "../../routes/path";
import { useRouter } from "next/router";
import getExtension from "../../utils/extension";
import totalTicketsCount from "./ticketCountHook";
//component
//images
let TicketResellerDetailCard = ({ ticketData, eventData, index }) => {
  let router = useRouter();
  let totalTickets = totalTicketsCount(eventData);
  let resellerTicketDetails = (index) => {
    router.push(RoutePaths.resellerTicket + "/" + eventData._id);
  };

  return (
    <>
      <div className="container-fluid font">
        <Card className="mt-2 Card text-white" onClick={resellerTicketDetails}>
          <div className="ticketCard mt-3 px-3">
            {getExtension(eventData?.tickets[0]?.ticketId?.image) !== 'mp4' ?
              <img src={eventData?.tickets[0]?.ticketId?.image} /> :
              <>
                <video src={eventData?.tickets[0]?.ticketId?.image} loop muted autoPlay />
              </>
            }
          </div>
          <Card.Body>
            <div className="row">
              <div className="col text-start  ">
                <p className="xsText boldText">{eventData?.title ? eventData?.title : <p className="xsText boldText">{eventData?.tickets[0]?.ticketId?.ticketTitle}</p>}</p>
              </div>
              <div className="col text-end">
                      <p className="xsText wrapText hideForMobile">
                        <strong>
                          {totalTickets}
                        </strong>{" "}
                        Total Tickets
                      </p>
                  </div>
            </div>

            <div className="borderOutline mt-1 py-2 ">
              <div className="row mx-1">
                <div className="col text-start ">
                  <p className="mb-0 xsText">Price</p>
                  <p className="purpleColor mb-0 smallText boldText">
                    {eventData?.auction ? eventData?.minBid : eventData?.maticPrice} MATIC
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

      </div>
    </>
  );
};

export default TicketResellerDetailCard;
