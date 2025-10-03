import React, { useState, useEffect } from "react";
import BuyTicketModalData from "../../pageComponents/tickets/data/buyTicketModalData";
import Snap from "../../../public/assets/images/icons/snap.png";
// import { dropSiteStatus, eventStatus } from "../../services/blockChain/contractMethods"
import Web3 from 'web3';
import AppApi from "../../api/app";
let BuyTicketModal = (props) => {
  let [loader, setLoader] = useState(false);
  let [dropSiteStatusValue, setDropSiteStatus] = useState(true);
  let [eventPaused, setEventPaused] = useState(false);
  let account = ""
  let web3 = ""
  useEffect(() => {
    if (props?.data?.event_id?.blockchainId) {
      CheckStatus()
      checkEventStatus()
    }
  }, [props?.data?.event_id?.blockchainId])
  let CheckStatus = async () => {
    let result = await dropSiteStatus();
    console.log("dropSite status:", result)
    // setDropSiteStatus(!result)
    setLoader(false)
  }

  let contractConnection = async () => {
    try {
      let res = await AppApi.getNetworks();
      if (res.status == 200) {
        let network = res.data.data[0];
        let ADDRESS = network.networkAddress
        let ABI = network.networkAbi;
        let contract = new web3.eth.Contract(ABI, ADDRESS);
        return contract
      } else {
        return ""
      }
    } catch (error) {
      console.log(error);
      return error
    }

  }


  let dropSiteStatus = async () => {
    try {
      if (!localStorage.getItem("token") && !web3) {
        let ethereum = window.ethereum
        web3 = new Web3(ethereum);
      }
      let contract = await contractConnection();
      if (contract) {
        let result = await contract.methods.paused().call()
        console.log("Drop site status: ", result);
        return result

      } else {
        return { status: true, message: "Contract connection failed." }
      }
    } catch (error) {
      console.log("error on getting dropSiteStatus", error)
      return ""
    }
  }
  let eventStatus = async (id) => {
    try {
      if (!web3) {
        let ethereum = window.ethereum
        web3 = new Web3(ethereum);
      }
      let contract = await contractConnection();
      let result = await contract.methods.eventIsPaused(id).call()
      console.log("event status: ", result);
      return result
    } catch (error) {
      console.log("error on getting dropSiteStatus", error)
      return ""
    }
  }


  let checkEventStatus = async () => {
    if (props?.data?.event_id?.blockchainId) {
      let result = await eventStatus(props?.data?.event_id?.blockchainId);
      setEventPaused(result)
    }
  }

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          {!eventPaused ? (
            <>
              {dropSiteStatusValue ? <BuyTicketModalData data={props.data} /> :
                (
                  <div className="d-flex font justify-content-center text-center">
                    <div className="d-flex flex-column mb-3">
                      <div className="p-2">
                        <img src={Snap.src} />
                      </div>
                      <h2 className="pt-4">Oh snap!</h2>
                      <div className="p-2">INSID3RS.io is not currently available.</div>
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div className="d-flex font justify-content-center text-center">
              <div className="d-flex flex-column mb-3">
                <div className="p-2">
                  <img src={Snap.src} />
                </div>
                <h2 className="pt-4">Oh snap!</h2>
                <div className="p-2">Event paused by admin</div>
              </div>
            </div>
          )}

        </>
      )}
    </>
  );
};

export default BuyTicketModal;
