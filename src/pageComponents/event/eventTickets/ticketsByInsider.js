import React, { useState, useEffect } from "react";
import { isNotExpired } from "../../../utils/date";
import TicketDetailCard from "../../../components/Cards/ticketDetailCard";
let Index = ({ ticketData }) => {

  return (
    <>
      <div className="row pt-0 insiderTickets">
        {ticketData?.ticketBy !== "insiderIO" ? (
          <>
            {ticketData
              .map((data, index) => {
                const endDate = data?.validFor?.at(-1);
                if (isNotExpired(endDate)) {
                  return (
                    <div
                      className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                      key={index}
                    >
                      <TicketDetailCard data={data} />
                    </div>
                  )
                }
              }
              )}
          </>
        ) : (
          <div className="text-center">
            <h3>No tickets by InsiderIO.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
