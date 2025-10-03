import React from "react";

let benefitsTab = ({ data }) => {
  return (
    <div className="mt-4 px-3">
      <p className="p_wrap">{data?.benefits}</p>
    </div>
  );
};

export default benefitsTab;
