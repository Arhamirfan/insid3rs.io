//reactstrap 
import Card from "react-bootstrap/Card";
import { Router, useRouter } from "next/router";
import Spinner from "../spinner/Index";
//component
import RoutePaths from "../../routes/path";
import getExtension from "../../utils/extension";
import Link from "next/link";
//images
let TicketDetailCard = ({ data, index }) => {
  let router = useRouter();

  //  let ticketDetailPage = () =>router.push(RoutePaths.events + "/" + data._id);

  return (
    <>
      <div className="container-fluid">
        {data ? (
          <>
            <Link href={RoutePaths.tickets + "/" + data?.ticketType?.key + "/" + data?.slug} >
              <Card className="mt-2 Card text-white">
                <div className="ticketCard mt-3 px-3">
                  {data?.image && getExtension(data?.image) !== 'mp4' ?
                    <img src={data?.image} /> :
                    <>
                      <video src={data?.image} loop muted autoPlay />
                    </>
                  }
                </div>
                <Card.Body>
                  <div className="row justify-content-between">
                    <div className="col-6 text-start  ">
                      <p className="xsText boldText">{data?.ticketTitle}</p>
                    </div>
                    <div className="col-6 text-end">
                      {/* <p className="xsText wrapText hideForMobile">
                        <strong>
                          {data?.totalTickets
                            ? data?.totalTickets - data?.soldTickets
                            : "0"}
                        </strong>{" "}
                        Tickets Left
                      </p> */}
                      <p></p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 borderOutline">
                    <div className="row justify-content-between ">
                      <div className="col pt-1 ms-2 text-start xsText ">
                        <p className="mb-1">Price</p>
                        <p className="purpleColor boldText ">
                          ${data?.stripeAmount?.toLocaleString()} USD | {data?.fixPrice} MATIC
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </>
        ) : (
          <>
            <Spinner animation="border" />
          </>
        )}
      </div>
    </>
  );
};

export default TicketDetailCard;
