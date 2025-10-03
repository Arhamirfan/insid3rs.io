import React from "react";
import Moment from "../../../utils/date";
import { dates } from "../../../constants/staticData";
let detailsTab = ({ data }) => {
  return (
    <>
      <div className="row px-3 py-2">
        <div className="col-xs-12 col-md-6 col-lg-5">
          <h5>Valid For</h5>
          <div className="listItems">

            <ul className="list-group">
              {data?.validFor?.map((date, index) => (
                <li key={index} className="descriptionColor list-group-item p-0">{Moment(date, dates.MMDDYYYY)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-xs-12 col-md-6  col-lg-7">
          <h5>Venue</h5>
          <p className="descriptionColor">{data?.event_id?.location}</p>
        </div>
      </div>
      <div className="row"></div>
    </>
  );
};

export default detailsTab;
