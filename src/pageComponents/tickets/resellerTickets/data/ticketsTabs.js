import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DetailsTab from "../components/detailsTab";
import BenefitsTab from "../components/benefitsTab";
import PurchasersTab from "../components/purchasersTab";
import RentersTab from "../components/rentersTab";
let TicketsTab = ({ data, auction }) => {
  let [key, setKey] = useState("details");
  let [key2, setKey2] = useState(`${data?.tickets[0].ticketId?.ticketType.ticketType}`);
  return (
    <>
      {data?.auction
        ? <>
          <Tabs activeKey={key2} onSelect={(k) => setKey2(k)} className="mb-3 gap-4">
            {data?.tickets?.map((ticket, index) => {
              return (
                <Tab eventKey={`${ticket?.ticketId?.ticketType.ticketType}`} title={`${ticket?.ticketId?.ticketType.ticketType}`} key={index}>
                  <BenefitsTab data={ticket.ticketId} type="auction" />
                </Tab>
              );
            })}
          </Tabs>
        </>
        : <>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 gap-4">
            <Tab eventKey="details" title="Details">
              <DetailsTab data={data} />
            </Tab>
            <Tab eventKey="benefits" title="Benefits">
              <BenefitsTab data={data} type="fixPrice" />
            </Tab>
            <Tab eventKey="rent" title="Renters">
              <RentersTab data={data} id="123" />
            </Tab>

          </Tabs>
        </>}

      {auction && (
        <PurchasersTab ticketsData={data} />
      )}
    </>
  );
};

export default TicketsTab;
