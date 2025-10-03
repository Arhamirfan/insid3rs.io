import React from "react";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import { Router, useRouter } from "next/router";
import RoutePaths from "../../src/routes/path";
//data
import EventTypes from "../../src/pageComponents/creators/eventTypes";
import Whitelist from "../../src/pageComponents/creators/whiteList";
import { allVideos, prizes1, prizes2, prizes3, ticketTypeWinner, nftPass, showPricing, additionalBenefits } from "../../src/constants/staticData";
//images
import polygonIcon from "../../public/assets/images/icons/polygonIcon.png";
import partner1 from "../../public/assets/images/partner1.svg";
import partner2 from "../../public/assets/images/partner2.svg";
import partner3 from "../../public/assets/images/partner3.svg";
let Index = () => {
    let router = useRouter();
    return (
        <>
            <Head>
                <title>INSID3RS.IO</title>
                <meta property="og:title" content="INSID3RS.IO" />
                <meta property="og:description" content="INSID3RS.IO || Event organizers" />
                <meta name="description" content="INSID3RS.IO || Event organizers" />
            </Head>
            <div className="mainScreen backgroundColor font text-white removeOverflow background-circle">
                <Navbar />
                <div className="container mt-5 mt-lg-0 pt-5">
                    <div className="d-flex mt-5 justify-content-center text-center align-items-center quarterFullScreenHome  ">
                        <div className="px-lg-5">
                            <div className="mxlBoldText semibold">
                                Minting December 13th
                            </div>
                            <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor">
                                Web3 INSID3RS PASS
                            </div>
                            <div className="largeBoldText pt-4">
                                The first 1000 to mint will receive access to our invite-only INSID3RS.io launch party in<br></br>January 2023.
                            </div>
                            <div className="largeBoldText pt-3">
                                The first 500 will receive a COVETED seat among the ranks of  SUPER SLEUTH and be the first to know about all upcoming projects, updates, mints, launches - everything!
                            </div>
                            <button className="btn filledButton mt-5" onClick={() => router.push(RoutePaths.insidersPass + '/#waitList')}>
                                Join Waitlist Now
                            </button>
                        </div>
                    </div>
                    {/* allVideos */}
                    <div className="allVideos">
                        <div className="xxxlBoldText semibold py-4">
                            All Videos
                        </div>
                        <div className="row">
                            {allVideos?.map((data, index) => {
                                return (
                                    <>
                                        <div className="col-xs-12 col-md-6 col-lg-4 mb-4" key={index}>
                                            <div className="text-start">
                                                <div className="videoCard">
                                                    <video src={data.video} controls autoPlay muted layout="responsive" className="coverImg w-100" />
                                                </div>
                                                <p className="normalText semibold my-2">{data.title}</p>
                                                <p className="smallText">{data.description}</p>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            )}
                        </div>
                    </div>
                    {/* mind Blowing Price */}
                    <div className="prices text-center my-5">
                        <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor pt-5">
                            MIND BLOWING<br></br>PRIZES
                        </div>
                        <div className="mxlBoldText semibold pt-4 pt-md-2">
                            1 Grand Price Winner will Receive
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between pt-5 px-lg-3">
                            {prizes1.map((prize, index) => {
                                return (
                                    <div key={index} className="grow">
                                        <img src={prize.image} />
                                        <p className="pt-3">{prize.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="d-flex flex-column flex-lg-row justify-content-between pt-5 px-lg-3">
                            {prizes2.map((prize, index) => <div key={index} className="grow">
                                <img src={prize.image} layout="responsive" className="coverImg" />
                                {/* <img src={prize.image} /> */}
                                <p className="pt-3 m-0">{prize.description}</p>
                                <p className="p-0 m-0">{prize.description2}</p>
                            </div>
                            )}
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between pt-5 px-lg-3">
                            {prizes3.map((prize, index) => <div key={index} className="grow">
                                <img src={prize.image} />
                                <p className="pt-3">{prize.description}</p>
                            </div>
                            )}
                        </div>
                    </div>
                    {/* chosen winners */}
                    <div className="chosen winners text-center my-5">
                        <div className="xlLgBoldText semibold pt-5 pt-md-2">
                            9 Additional Winners Will Be Chosen
                        </div>
                        <div className="row pt-5">
                            {ticketTypeWinner?.map((data, index) => {
                                return (
                                    <>
                                        <div className="col-xs-12 col-md-6 col-lg-4 mb-4" key={index}>
                                            <div className="text-center">
                                                <p className="xlLgBoldText semibold purpleColor">{data.title}</p>
                                                {data.descriptions.map((description, index) => <p key={index} className="regular">{description}</p>)}

                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            )}
                        </div>
                    </div>
                </div>
                {/* top industry show */}
                <div className="topIndustryShow mt-5 py-5 text-center">
                    <div className="container">
                        <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor">
                            1 NFT - Access to Top <br></br>Industry Shows
                        </div>
                        <p className="semibold mxlBoldText pt-3">1 Grand Price Winner will Receive </p>
                        <p className="regular largeBoldText pt-4 px-md-2 px-lg-5">The Web3 INSID3RS Pass is the easiest way to attend the biggest events in the Web3 ecosystem. With one NFT, you gain entry to world-class events all over the US. Thats the definition of IRL NFT Utility. </p>
                        <p className="regular largeBoldText pt-4 px-md-2 px-lg-5">NFT holders will gain early access to new NFT Pass mints, new event additions, INSID3RS.io afterparties, event specific networking events, and swag! </p>
                    </div>
                    <EventTypes />
                </div>
                {/* choose NFT Pass*/}
                <div className="container mt-5 py-5 text-center">
                    <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor">
                        Choose between 3 NFTs
                    </div>
                    <div className="row pt-5">
                        {nftPass?.map((data, index) => {
                            return (
                                <>
                                    <div className="col-xs-12 col-md-6 col-lg-4 mb-4" key={index}>
                                        <p className="xlLgBoldText semibold purpleColor mb-0">{data.title}</p>
                                        <p className="regular  pt-1">{data.description1}</p>
                                        <p className="regular  pt-3">{data.description2}</p>
                                        <div className="d-flex flex-column justify-content-center align-items-center grow pt-3 ">
                                            <img src={data.image1} className="w-70 coverImg " />
                                            <img src={data.image2} className="w-70 coverImg pt-5" />
                                            <img src={data.image3} className="w-70 coverImg pt-5" />
                                        </div>

                                    </div>
                                </>
                            );
                        }
                        )}
                    </div>
                </div>
                {/* early bird pricing */}
                <div
                    className="newsLetter py-5 px-5 mt-5 mb-3"
                    style={{ backgroundColor: "#A555FA" }}
                >
                    <div className="container py-5 text-center">
                        <div className="mxlBoldText semibold">
                            Access to Early Bird Pricing
                        </div>
                        <div className="xxxlCustomBoldText customFontScaling extrabold">
                            Save up to 40% per show!
                        </div>
                        <button className="btn btn-light circularRadiusLg px-4 py-2 boldText mt-4" onClick={() => router.push(RoutePaths.insidersPass + '/#waitList')}>Join Waitlist Now</button>
                    </div>
                </div>
                {/* nft pass early price */}
                <div className="container px-2 pt-5 mt-5">
                    <div className="row pt-5 text-center">
                        {showPricing?.map((data, index) => {
                            return (
                                <>
                                    <div className="col-xs-12 col-md-6 col-lg-4 mb-4" key={index}>

                                        <p className="mLargeBoldText extrabold purpleColor">{data.title}</p>
                                        <div className="d-flex flex-row pt-4 justify-content-center">
                                            <p className="light">{data.ticketType1}</p>
                                            <p className="light">&nbsp; ${data.ticketType1price}</p>
                                        </div>
                                        <div className="d-flex flex-row pt-4 justify-content-center">
                                            <p className="light">{data.ticketType2}</p>
                                            <p className="light">&nbsp; ${data.ticketType2price}</p>
                                        </div>
                                        <div className="d-flex flex-row pt-4 justify-content-center">
                                            <p className="light">{data.ticketType3}</p>
                                            <p className="light">&nbsp; ${data.ticketType3price}</p>
                                        </div>

                                    </div>
                                </>
                            );
                        }
                        )}
                    </div>
                    {/* access additional benefits */}
                    <div className="additionalBenefits text-center my-5  ">
                        <div className="xxxlCustomBoldText customFontScaling extrabold purpleColor pt-5">
                            Access Additional<br></br>Benefits
                        </div>
                        <div className="largeBoldText regular pt-4 pt-md-2">
                            We are about community. As we continue to grow we invest back into our community by curating additional benefits to all Web3 INSID3RS Pass NFT holders.
                        </div>
                        <div className="row pt-5 justify-content-center px-md-4">
                            {additionalBenefits?.map((data, index) => {
                                return (
                                    <>
                                        <div className="col-xs-12 col-md-6 col-lg-4 mb-4 " key={index}>
                                            <div className="text-md-start">
                                                <img src={data.image} className="coverImg" />
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
                    {/* partners */}
                    <div className="partners text-center my-5  ">
                        <div className="xxxlCustomBoldText customFontScaling extrabold   pt-5">
                            Minted on <> <img src={polygonIcon.src} /></>&nbsp;polygon
                        </div>
                        <div className="xlLgBoldText semibold pt-4 pt-md-2">
                            Our Partners
                        </div>
                        <div className="row align-items-center pt-5">
                            <div className="col-xs-12 col-md-6 col-lg-4 mb-4"  >
                                <img src={partner1.src} layout="responsive" className="coverImg" />
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-4 mb-4"  >
                                <img src={partner2.src} layout="responsive" className="coverImg" />
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-4 mb-4"  >
                                <img src={partner3.src} layout="responsive" className="coverImg" />
                            </div>
                        </div>
                    </div>
                    {/* mvp launches */}
                    <div className=" text-white text-center mt-5 pt-5 pb-5 font">
                        <div className="xxxlCustomBoldText purpleColor minimizeFont">
                            MVP Live Now
                        </div>
                        <div className="largeBoldText pt-1 ">
                            First 50 lifetime platform purchasers will be invited to join the
                            INSID3RS Elite!<br></br> Benefits include: Input on new products -
                            Invite-only Beta Tests - Exclusive Events
                        </div>
                    </div>
                    {/* join waitlist */}
                    <div className=" text-center text-white mt-5 pb-5 font">
                        <div className="xxlBoldText boldText  minimizeFont pb-2">
                            Go Beyond the Ticket Stub Today
                        </div>
                        <div className="largeBoldText   pt-1" id="waitList">
                            A member of our team will be in touch within{" "}
                            <span className="text-white boldText">48 hours.</span>
                        </div>
                        <Whitelist />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Index;