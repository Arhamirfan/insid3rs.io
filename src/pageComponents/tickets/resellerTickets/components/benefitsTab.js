import React from "react";

let benefitsTab = ({ data, type }) => {
  return (
    <div className="mt-4 px-3">
      {type === "auction"
        ? <>
          <p>{data?.benefits}</p>
        </>
        : <>
          {data?.tickets.map((ticket, index) => <p key={index}>{ticket?.ticketId?.benefits}</p>)}
        </>}

    </div>
  );
};

export default benefitsTab;
