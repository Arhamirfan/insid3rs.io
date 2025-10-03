import React, { useEffect, useState } from "react";
//component
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import EventDetail from "../../src/pageComponents/event/upComingMainEvent";
import AllEvents from "../../src/pageComponents/event/allEvents";
import Head from "next/head";
import EventApi from "../../src/api/eventApi";
//images
let Index = ({ eventData }) => {

  return (
    <>
      <Head>
        <title>INSID3RS.IO</title>
        <meta property="og:title" content="INSID3RS.IO" />
        <meta property="og:description" content="INSID3RS.IO || Event organizers" />
        <meta name="description" content="INSID3RS.IO || Event organizers" />
      </Head>
      <div className="mainScreen eventsBackground  pt-5 mb-5 removeOverflow">
        <Navbar />
        <EventDetail header="UPCOMING EVENTS" eventData={eventData} />
      </div>
      <div className="HomeBody">
        <AllEvents eventData={eventData} />
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await EventApi.getEvent({ filter: false }).then((result) => result).catch(error => []);
    // let data = await res.data.data.sort((event1, event2) => {
    //   return moment(event1.startDate).diff(moment(event2.startDate))
    // });
    // data = result?.data?.data.reverse();
    let data = [];
    if (res?.data?.data) {
      data = res?.data?.data
    }

    return { props: { eventData: data } }
  } catch (error) {
    console.log("🚀 ~ file: index.js:44 ~ getServerSideProps ~ error:", error)
  }
}


export default Index;

