import React, { useState, useEffect } from "react";
import EventDetailCard from "../../components/Cards/eventDetailCard";
import moment from "moment/moment";

let Index = ({ header, eventData }) => {
  let [sortedEvents, setSortedEvents] = useState(eventData);
  useEffect(() => {
    if (eventData)
      sortedData();
  }, [eventData])
  let sortedData = () => {
    let update = eventData?.filter(event => moment.utc(new Date()).startOf('day').isSameOrBefore(moment.utc(event?.endDate).startOf('day'))).sort((a, b) => {
      const timeDiffA = moment.utc() - moment.utc(a?.startDate);
      const timeDiffB = moment.utc() - moment.utc(b?.startDate);
      return timeDiffA - timeDiffB;
    });
    console.log('upcomingEventData', update.reverse())
    setSortedEvents(update)
  }

  return (
    <>
      <div className="container-fluid pt-5 text-white">
        <div className="row">
          <div className="col">
            <h1 className="eventTitle text-center">{header}</h1>
          </div>
        </div>
        <div className="row py-5 px-2">
          {sortedEvents.length > 0 ? <>
            {sortedEvents.filter(event => moment.utc(new Date()).startOf('day').isSameOrBefore(moment.utc(event?.endDate).startOf('day'))).map((data, index) => {
              if (index > 3) return;
              return (
                <div
                  key={index}
                  className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                >
                  <EventDetailCard data={data} />
                </div>
              );
            })}
          </> : <>
            <div className="d-flex  py-5 justify-content-center">
              <div className="mLargeBoldText">No events available</div>
            </div>

          </>}

        </div>
      </div>
    </>
  );
};

export default Index;
