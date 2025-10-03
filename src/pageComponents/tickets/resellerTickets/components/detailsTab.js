import React, { useState, useEffect } from "react";
import Moment from "../../../../utils/date";
import { dates } from "../../../../constants/staticData";
import moment from "moment/moment";
let DetailsTab = ({ data }) => {
  const [uniqueValues, setUniqueValues] = useState();
  useEffect(() => {
    getUniqueValues()
  }, [data]);
  let getUniqueValues = () => {
    let allTickets = [];
    data?.tickets.map((ticket) => ticket?.ticketId?.validFor?.map((validFor) => allTickets.push(validFor)))
    let uniqueTickets = [...new Set(allTickets)];
    setUniqueValues(uniqueTickets);
  }

  return (
    <>
      <div className="row px-3 py-2">
        <div className="col-xs-12 col-md-6 col-lg-5">
          <h5>Valid For</h5>
          <div className="listItems">
            <ul className="list-group">

              {uniqueValues ?
                <>
                  <div className="d-flex justify-content-start purpleColor" >{moment(uniqueValues[0]).format("MM-DD-YYYY")}</div>
                  {uniqueValues.length > 1 ? <><p className="mb-0 "> To </p> <div className="d-flex justify-content-start purpleColor" >{moment(uniqueValues[uniqueValues.length - 1]).format("MM-DD-YYYY")}</div></> : <></>}
                  {/* {uniqueValues?.map((value, index) => {
                    return (
                      <li key={index} className="descriptionColor list-group-item p-0">{Moment(value, dates.MMDDYYYY)}</li>
                    );
                  })} */}
                </> : <></>}


            </ul>
          </div>
        </div>
        <div className="col-xs-12 col-md-6  col-lg-7">
          <h5>Venue</h5>
          <p className="descriptionColor">{data?.eventId?.location}</p>
        </div>
      </div>
      <div className="row"></div>
    </>
  );
};

export default DetailsTab;
