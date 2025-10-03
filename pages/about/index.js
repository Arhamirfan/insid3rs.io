import React from "react";
import Head from "next/head";
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import { aboutData, creators } from "../../src/constants/staticData";
//images 
import eventInsightSection from "../../public/assets/images/eventInsightSection.png";
let Index = () => {
    return (
        <>
        <Head>
            <title>About - INSID3RS.IO</title>
            <meta property="og:title" content="About - INSID3RS.IO" />
            <meta property="og:description" content="About || INSID3RS.IO" />
            <meta name="description" content="About || INSID3RS.IO" />
        </Head>
            <div className="mainScreen backgroundColor font text-white removeOverflow ">
                <Navbar />
                <div className="container mt-5 mt-lg-0 ">
                    <div className="d-flex mt-5 justify-content-center text-center align-items-center  pt-5">
                        <div className="px-lg-5 mt-5">
                            <div className="xxxlExtraBoldText customFontScaling extrabold purpleColor">
                            Creators for creators
                            </div>
                            <div className="largeBoldText pt-4 px-md-5">
                            {`We're a small, but mighty team that's worked in the event industry for over a decade.`}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row  align-items-center align-items-lg-start  text-center text-lg-start mt-4 ">
                            <img src={eventInsightSection.src} className="aboutImg mt-1" width={"50%"} />
                        <div className="ps-md-4 pt-lg-2">
                            <div className="regular normalText pt-3 pt-md-5">
                                {`INSID3RS.io is your experiential eCommerce platform site, providing your fans an all-access pass to life greatest adventures.`}
                            </div>
                        </div>

                    </div>
                </div>
            {/* </div> */}
            
                {/* OUR MISSION */}
            <div className="container font text-white">
                <div className="text-center py-5  ">
                    <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor">
                        Our mission
                    </div>
                    <div className="largeBoldText pt-1 px-md-5 ">
                        Current Ticketing Ecosystem Starts and Stops at the Ticket Stub
                    </div>
                    <div className="largeBoldText pt-1 px-md-5 mt-1">
                        We are empowering live experience creators to go beyond the ticket stub, curating unforgettable fan experiences before, during, and after the experience by
                    </div>
                </div>
                <div className="newsLetter pb-5 px-5 mb-3 activeCard text-center ">
                    <div className="container font text-white">
                        <div className="largeBoldText  semibold pt-5  ">
                            Empowering Data-Rich Monetization
                        </div>
                        <div className="largeBoldText  semibold pt-5  ">
                            Sparking Transparency
                        </div>
                        <div className="largeBoldText  semibold pt-5">
                            Driving Fan Loyalty
                        </div>
                    </div>
                </div>
            </div>
            
                {/* ABOUT DATA */}
                <div className="container font text-white">
                    <div className="row pt-5 justify-content-center px-md-4">
                        {aboutData?.map((data, index) => {
                            return (
                                <>
                                    <div className="col-xs-12 col-md-6   mb-4 " key={index}>
                                        <div className="text-md-start  ">
                                            <div className="aboutImage">
                                                <img src={data.image} className="coverImg w-100 " />
                                            </div>
                                            <p className="normalText semibold mt-3 mb-2">{data.title}</p>
                                            <p className="xsText regular">{data.description}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                        )}
                    </div>
                </div>

            {/* CREATORS */}
            <div className="container font text-white">
                <div className="text-center pt-5">
                    <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor py-5">
                        Meet Our Creators
                    </div>
                    <div className="row pt-5 justify-content-start px-md-4">
                        {creators?.map((data, index) => {
                            return (
                                <>
                                    <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4 " key={index}>
                                        <div className="text-center grow">
                                            <div className="profileCard">
                                                <img src={data.image} className="" />
                                            </div>
                                            <p className="normalText semibold mt-3 mb-2">{data.name}</p>
                                            <p className="xsText regular">{data.description}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        </>
    )
}
export default Index;