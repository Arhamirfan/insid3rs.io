import React, { useEffect, useState } from "react";
//component
import Navbar from "../src/components/header/navbar";
import Footer from "../src/components/footer/footer";
import { Router, useRouter } from "next/router";
import RoutePaths from "../src/routes/path";
//images
let Index = () => {
  let router = useRouter();
  useEffect(() => {
    router.push(RoutePaths.events);
  });
  return (
    <>
      <div className="mainScreen eventsBackground mb-5 removeOverflow">
        <p></p>
      </div>
      <div className="HomeBody">
      </div>
      <Footer />
    </>
  );
};

export default Index;