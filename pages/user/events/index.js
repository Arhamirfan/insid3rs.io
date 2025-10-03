import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Accordion } from "react-bootstrap";
import SellTicketModal from "../../../src/components/Modal/sellTicketModal";
import MyPackages from "../../../src/pageComponents/user/packages";
import MyPurchasedPackages from "../../../src/pageComponents/user/purchasedPackages";
import { dropSiteStatus } from "../../../src/services/blockChain/contractMethods"
import Modal from 'react-bootstrap/Modal';
import QRCode from "react-qr-code";
import getExtension from "../../../src/utils/extension";
//component
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../../src/components/header/navbar";
import Footer from "../../../src/components/footer/footer";
import Spinner from "../../../src/components/spinner/Index";
import TicketApi from "../../../src/api/ticketApi";
import RoutePaths from "../../../src/routes/path";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Actions from "../../../src/store/Actions/Actions";
import { useSelector } from "react-redux";
import Moment from "../../../src/utils/date";
import { dates } from "../../../src/constants/staticData";
import moment from "moment";
import globalServices from "../../../src/utils/globalServices";
//images
import Success from "../../../public/assets/images/icons/success.png";
import error from "../../../public/assets/images/icons/cross.png";
let Index = () => {
  let wallet = useSelector(state => state.wallet);
  let [ticketData, setTicketData] = useState([]);
  let [localProfile, setLocalProfile] = useState();
  let [modalData, setModalData] = useState([]);
  let [apiLoading, setApiLoading] = useState(true);
  let [barCodeId, setBarCodeId] = useState("");
  let [message, setMessage] = useState("No purchased record found.");
  let [modalShow, setModalShow] = useState(false);
  let [dropSiteStatusValue, setDropSiteStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [previewTicket, setPreviewTicket] = useState('');
  const [previewEventName, setPreviewEventName] = useState('');
  let [updateQrData, setUpdateQrData] = useState();
  const [loading, setLoading] = useState(false);
  let router = useRouter();
  let dispatch = useDispatch()
  useEffect(() => {

  }, []);
  useEffect(() => {
    if (wallet?.address == "") {
      setTicketData([]);
    } else {
      getPurchasedTickets();
      setLocalProfile(JSON.parse(localStorage.getItem("profile")));
    }
  }, [wallet?.address]);

  useEffect(() => {
    let intervalId;
    if (show) {
      intervalId = updateQrCode();
    }
    return () => clearInterval(intervalId);
  }, [show]);

  let updateQrCode = () => {
    setLoading(true);

    return setInterval(async () => {
      console.log('updateQrData:', updateQrData)

      TicketApi.updateTicketQR(updateQrData).then((res) => {
        console.log('updated Data:', res)
        if (res && res.status === 200) {
          console.log('qr code', [updateQrData.id, updateQrData.ticketId, res.data.data]);
          setBarCodeId([updateQrData.id, updateQrData.ticketId, res.data.data]);
          setLoading(false);
        }
      }).catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.msg ? err?.response?.data?.msg : err.message);
        console.log("Error: ", err);
      })

    }, 5000);
  }

  let getPurchasedTickets = async () => {

    TicketApi.getPurchasedTickets()
      .then((result) => {
        if (result && result.status == 200) {
          console.log("purchasedTicketData:", result.data.data);
          setTicketData(result.data.data);
        }
        setApiLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          localStorage.clear();
          dispatch(Actions.updateWallet({ address: "", balance: "" }));
          router.replace(RoutePaths.events);
        }
        if (error?.response?.data) {
          setMessage(error?.response?.data?.msg)
        } else {
          setMessage(error.message)
        }
        setApiLoading(false);
      });

  };

  useEffect(() => {
    CheckStatus();
  })

  const expandTicket = (ticket, event) => {
    setPreviewTicket(ticket?.ticketId?.image)
    setPreviewEventName(event?.event_id?.eventName)
    setTicketModal(true)
  }

  let CheckStatus = async () => {
    try {
      let result = await dropSiteStatus();
      //console.log("dropSite status:", result)
      setDropSiteStatus(!result)
    } catch (error) {

    }
  }


  return (
    <>
      <div className="backgroundColor font text-white mt-5 pt-5 background-circle">
        <Navbar />
        <div className="container mt-5 pb-5 mb-5 HomeBody">
          {wallet.address == "" ?
            <div className="d-flex m-3 py-5 justify-content-center">
              <h3 className="redColor">Wallet not connected.</h3>
            </div> : (
              <>
                {/* <AllEvents /> */}
                {apiLoading ? (
                  <div className="py-5">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {ticketData.length === 0 ? (
                      <div className="py-5">
                        <div className="d-flex flex-column text-center pb-5 justify-content-center">
                          <h3 className="">{message}</h3>
                          <small className="descriptionColor">Please note that if the ticket is not displayed, kindly wait for 24 hours or contact the administrative support team for further assistance. </small>
                        </div>
                      </div>
                    ) : <>
                      <h4 className="mobileCentered">Purchased Tickets</h4>
                      <small className="descriptionColor">Please note that if the ticket is not displayed, kindly wait for 24 hours or contact the administrative support team for further assistance. </small>
                      <div className="mt-5 myEventsAccordion accordionNewArrow">
                        {/* todo:add event endDate validation and remove sell button */}
                        <Accordion>
                          {ticketData.map((event, index) => {
                            console.log('ticketData', event._id)
                            return (
                              <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header >
                                  <div className="d-flex justify-content-between align-items-center  fullWidth">
                                    <p className="mb-0">{event?.event_id?.eventName}</p>
                                    {moment.utc(new Date()).startOf('day').isAfter(moment.utc(event?.event_id?.endDate).startOf('day')) ? <>
                                      <p className="text-danger medium mb-0">Event Expired</p>
                                    </> : <>
                                      <button className="btn filledButton borderOutline"
                                        onClick={(stop) => {
                                          stop.stopPropagation();
                                          if (!dropSiteStatusValue) {
                                            toast.error("INSID3RS.io is not currently available.");
                                            return
                                          }
                                          setModalData(event);
                                          setModalShow(true)
                                        }}>
                                        Sell
                                      </button>
                                    </>}

                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="myTicketsTable">

                                    <Table responsive variant="dark" className="">
                                      <thead>
                                        <tr >
                                          <th className="py-3">Ticket Name</th>
                                          <th className="py-3">No. of Tickets</th>
                                          {/* <th className="py-3">Tickets on Sale</th>
                                          <th className="py-3">Tickets Sold</th> */}
                                          <th className="py-3">Scan</th>
                                          <th className="py-3">Valid For</th>
                                          <th className="py-3"></th>
                                          {/* <th>RENT</th> */}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {event.tickets.map((ticket, index, { length }) => {
                                          return (
                                            <tr key={index} >
                                              <td className={length - 1 === index ? `border-bottom-0` : ``}>
                                                <div className="d-flex flex-row mb-3 mt-2 ">
                                                  <div className="myTickets" onClick={() => expandTicket(ticket, event)}>
                                                    {ticket?.ticketId?.image && getExtension(ticket?.ticketId?.image) !== 'mp4' ?
                                                      <img src={ticket?.ticketId?.image} /> :
                                                      <>
                                                        <video src={ticket?.ticketId?.image} muted />
                                                      </>
                                                    }
                                                  </div>
                                                  <div className="d-flex flex-column ps-1">
                                                    <div className="ps-2">
                                                      {ticket?.ticketId?.ticketTitle}
                                                    </div>
                                                    <div className="ps-2">
                                                      Purchased from InsiderIO
                                                    </div>
                                                  </div>
                                                </div>

                                              </td>
                                              <td className={length - 1 === index ? `border-bottom-0` : ``}> <p className="pt-2">{`${ticket?.count}`}</p></td>
                                              {/* <td className={length - 1 === index ? `border-bottom-0` : ``}><p className="pt-2">{`${ticket?.sell}`}</p></td>
                                              <td className={length - 1 === index ? `border-bottom-0` : ``}><p className="pt-2">{`${ticket?.sold}`}</p></td>  
                                              <td className={length - 1 === index ? `border-bottom-0` : ``}><p className="pt-2">{`${ticket?.checkInCount}`}</p></td> */}
                                              <td className={length - 1 === index ? `border-bottom-0` : ``}><div className="smallImg pt-2">{ticket?.checkInCount > 0 ? <><img src={Success.src} width="20px" /></> : <><img src={error.src} width="20px" /></>}</div></td>
                                              <td className={length - 1 === index ? `border-bottom-0 listItems` : `listItems`}>
                                                <ul className="list-group">
                                                  <div className="d-flex justify-content-start purpleColor valid-date-section">{moment(ticket?.ticketId?.validFor[0]).format("MM-DD-YYYY")}</div>
                                                  {ticket?.ticketId?.validFor.length > 1 ? <><p className="mb-0 "> To </p><div className="d-flex justify-content-start purpleColor" >{moment(ticket?.ticketId?.validFor[ticket?.ticketId?.validFor.length - 1]).format("MM-DD-YYYY")}</div></> : <></>}
                                                  {/* {ticket?.ticketId?.validFor.map((validDate, index) => <li key={index} className="list-group-item p-0 py-2">{Moment(validDate, dates.MMDDYYYY)}</li>)} */}
                                                </ul>
                                              </td>
                                              <td className={length - 1 === index ? `border-bottom-0` : ``}>
                                                {moment.utc(new Date()).startOf('day').isAfter(moment.utc(event?.event_id?.endDate).startOf('day')) ? <>
                                                  <p className="text-danger medium pt-2 mb-0">Event Expired</p>
                                                </> :
                                                  <>
                                                    <a
                                                      href={`${process.env.NEXT_PUBLIC_BLOCKCHAIN_URL}/tx/${ticket?.transactionHash}`}
                                                      className="btn mt-2 py-1 purpleButton xxlcircularRadius"
                                                      target="_blank"
                                                      rel="noreferrer"
                                                    >
                                                      View Logs
                                                    </a>

                                                    {ticket?.count - ticket?.sold !== 0 ?
                                                      <>
                                                        <a
                                                          href="#"
                                                          className="btn ms-xl-3 mt-2 py-1 px-4 purpleButton xxlcircularRadius"

                                                          rel="noopener noreferrer"
                                                          onClick={() => {
                                                            if (!dropSiteStatusValue) {
                                                              toast.error("INSID3RS.io is not currently available.");
                                                              return
                                                            }
                                                            let data = { ...event, tickets: event.tickets.filter(data => data._id == ticket._id) }
                                                            setModalData(data);
                                                            setModalShow(true)
                                                          }}
                                                        >
                                                          Sell&nbsp;Ticket
                                                        </a>
                                                      </> : <></>
                                                    }
                                                    <a
                                                      href={`#`}
                                                      className="btn ms-xl-3 mt-2 py-1 px-4 purpleButton xxlcircularRadius"
                                                      rel="noreferrer"
                                                      onClick={() => {
                                                        setUpdateQrData({ id: event._id, eventId: event.event_id._id, ticketId: ticket.ticketId._id })
                                                        setShow(true)
                                                        // let barCode = [event._id, ticket._id]
                                                        // setBarCodeId(barCode) 
                                                      }}
                                                    >
                                                      Scan
                                                    </a>
                                                  </>
                                                }
                                              </td>
                                            </tr>
                                          );
                                        })}

                                      </tbody>
                                    </Table>
                                  </div>




                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          })}

                        </Accordion>
                        <SellTicketModal
                          show={modalShow}
                          onHide={() => {
                            setModalShow(false)
                            getPurchasedTickets()
                          }}
                          data={modalData}
                        />
                      </div>
                    </>
                    }
                  </>
                )
                }
                <div className="mt-5 ticketsOnSale">
                  <MyPackages ticketDataPrevious={ticketData} />
                </div>
                <div className="mt-5 purchasedFromResellerTickets">
                  <MyPurchasedPackages />
                </div>
              </>
            )}

        </div>
        {!globalServices.isIframeWebsite() && <Footer />}
      </div>

      <Modal show={show} onHide={() => {
        setShow(false);
        getPurchasedTickets()
      }}>
        <Modal.Header closeButton>
          <Modal.Title className="">BarCode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <>
            <div className="container py-3">
              <div className="d-flex justify-content-center">
                <div className="spinner-border spinner" role="status"></div>
              </div>
            </div>
          </> : <>

            <div className="barCodeContainer">
              <QRCode
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
                value={`${barCodeId}`} />
            </div>
          </>}
        </Modal.Body>
      </Modal>

      <Modal contentClassName="expandable-ticket-content" show={ticketModal} onHide={() => setTicketModal(false)}>
        <Modal.Header className="expandable-ticket-header">
          <Modal.Title className="px-3">#ReadyFor {previewEventName}</Modal.Title>
          <span aria-hidden="true" className="closeButton pointer" onClick={() => setTicketModal(false)}>&times;</span>
        </Modal.Header>
        <Modal.Body className="expandable-ticket-body">
          <div className="expandable-ticket-preview">
            {previewTicket && getExtension(previewTicket) !== 'mp4' ?
              <img height="100%" width="100%" src={previewTicket} /> :
              <>
                <video height="100%" width="100%" src={previewTicket} loop muted autoPlay />
              </>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Index;
