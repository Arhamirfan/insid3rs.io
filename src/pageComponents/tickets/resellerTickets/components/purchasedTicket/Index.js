import React from "react";
import Link from "next/link";
import getExtension from "../../../../../utils/extension";
let PurchasedTickets = ({ data, transactionHash, totalTickets }) => {
  return (
    <>
      <div className="d-flex font justify-content-center text-center">
        <div className="d-flex flex-column mb-3">
          <div className="p-2">
            <h2 className="xxlBoldText boldText">Yay!</h2>
          </div>
          <div className="pb-n5 mb-4">
            <h4 className="pt-4 greyColor">You successfully purchased</h4>
            <span className="purpleColor ">
              <h4 className="boldText">
                {data?.ticketTitle} ({data?.ticketType?.ticketType})
              </h4>
            </span>
          </div>
          <center>
            {data?.image && getExtension(data?.image) !== 'mp4' ?
              <img src={data?.image} width="260" height={"228"} /> :
              <>
                <video src={data?.image} loop muted autoPlay width="260" height={"228"} />
              </>
            }
          </center>
          <div className="my-4">
            <div className=" d-flex justify-content-between borderOutlinePurchased px-5 py-3">
              <h5 className="greyColor">Status</h5>
              <h5 className="purpleColor">Purchased</h5>
            </div>

            <div className=" mt-2 d-flex justify-content-between borderOutlinePurchased px-5 py-3">
              <h5 className="greyColor">Price</h5>
              <h5 className="purpleColor">
                {(totalTickets * data?.fixPrice).toFixed(3)} MATIC
              </h5>
            </div>
            <div className=" mt-2 d-flex justify-content-between borderOutlinePurchased px-5 py-3">
              <h5 className="greyColor">Tickets</h5>
              <h5 className="purpleColor">
                {totalTickets ? totalTickets : '0'}
              </h5>
            </div>
          </div>
          <Link href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_URL}/tx/${transactionHash}`}>
            <a
              className="purpleColor py-3"
              target="_blank"
              rel="noreferrer"
            >
              Verify your transaction on Polygonscan
            </a>
          </Link>
          {/* <div className="my-3">
            <h5 className="greyColor">Time to show-off</h5>
            <Row className="flex-row justify-content-center gap-3">
              <Col>
                <img src={reddit.src} />
              </Col>
              <Col>
                <img src={linkedin.src} />
              </Col>
              <Col>
                <img src={instagram.src} />
              </Col>
              <Col>
                <img src={twitter.src} />
              </Col>
              <Col>
                <img src={telegram.src} />
              </Col>
              <Col>
                <img src={discord.src} />
              </Col>
            </Row>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PurchasedTickets;
