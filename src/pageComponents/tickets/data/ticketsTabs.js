import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DetailsTab from "../components/detailsTab";
import BenefitsTab from "../components/benefitsTab";
import PurchasersTab from "../components/purchasersTab";
import ResellersTab from "../components/resellersTab";
let TicketsTab = ({ data, sellType }) => {
  let [key, setKey] = useState("details");
  return (
    <>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 gap-4">
        <Tab eventKey="details" title="Details">
          <DetailsTab data={data} />
        </Tab>
        <Tab eventKey="benefits" title="Benefits">
          <BenefitsTab data={data} />
        </Tab>
        <Tab eventKey="purchasers" title="Purchasers">
          <PurchasersTab id={data._id} data={data} />
        </Tab>
        <Tab eventKey="resellers" title="Resellers">
          <ResellersTab id={data._id} data={data} />
        </Tab>
      </Tabs>
    </>
  );
};

export default TicketsTab;
