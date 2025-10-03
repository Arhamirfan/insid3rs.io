import React, { useEffect, useState } from "react";
//component
import Head from "next/head";
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import { useRouter } from "next/router";
import RoutePaths from "../../src/routes/path";
import Whitelist from "../../src/pageComponents/creators/whiteList";
import CreatorsFaqs from "../../src/components/Accordion/creatorsFaqs";
import EventTypes from "../../src/pageComponents/creators/eventTypes";
//images
import dashboard from "../../public/assets/images/dashboard.png";
import about from "../../public/assets/images/about.svg";
import changingNeedsSection from "../../public/assets/images/changingNeedsSection.png";
import eventInsightSection from "../../public/assets/images/eventInsightSection.png";
import ticketFraudSection from "../../public/assets/images/ticketFraudSection.svg";
import ticketCheckoutSection from "../../public/assets/images/ticketCheckoutSection.svg";
import rewardTicketSection from "../../public/assets/images/rewardTicketSection.svg";
import conversionSection from "../../public/assets/images/conversionSection.svg";
import Success from "../../public/assets/images/icons/success.png";
//import AboutAdminPanel from "../../public/assets/images/about.svg";
import NonFunLogo from "../../public/assets/images/NonFunLogo.png";
import CommunitySlider from "../../src/pageComponents/creators/communitySlider";

let Index = () => {
  let router = useRouter();
  return (
    <>
      <Head>
        <title>The complete event platform built for 2023 - INSID3RS.IO</title>
        <meta property="og:title" content="The complete event platform built for 2023 - INSID3RS.IO" />
        <meta property="og:description" content={`We Are Creators For Creators, As creators of IRL experiences, the one thing we DESPISE with the industry is the lack of a single,
        easy-to-use platform where WE, the creators, can control the entire ticket lifecycle including fees. So we fixed that. || INSID3RS.IO`} />
        <meta name="description" content={`We Are Creators For Creators, As creators of IRL experiences, the one thing we DESPISE with the industry is the lack of a single,
        easy-to-use platform where WE, the creators, can control the entire ticket lifecycle including fees. So we fixed that. || INSID3RS.IO`} />
      </Head>
      <div className="mainScreen homeBackground font text-white removeOverflow">
        <Navbar />
        <div className="container pt-5">
          <div className="d-flex align-items-center quarterFullScreenHome  ">
            <div className="">
              <div className="xxxlCustomText minimizeFont lowLineHeight">
                ONE PLATFORM
              </div>
              <div className="xxxlExtraBoldText boldText minimizeFont   ">
                ENDLESS POSSIBILITIES
              </div>
              <button
                className="btn filledButton mt-5"
                onClick={() => router.push(RoutePaths.events)}
              >
                &nbsp; Explore &nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      {/* <div className="homePhysicalCapabilitiesScreen aboutBackground backgroundFixed font py-3 text-white ">
        <div className="container py-5">
          <div className="xxxlCustomBoldText boldText pt-5 purpleColor mdMinimizeFont text-center creatorTitle">
            The complete event platform built for 2023 and beyond
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start">
            <div className="col ">
              <div>
                <h1 className="boldText xlBoldText minimizeFont pt-4 pb-3">
                  {`We're creators for creators`}
                </h1>
                <div className="largeBoldText text-justify">
                  {`building transparency & upgrading monetization of event
                ticketing. Enhancing the buying process for consumers,
                rewarding fan loyalty and empowering creators to do more.`}
                </div>
                <button className="btn filledButton mt-4" onClick={() => router.push(RoutePaths.about)}>
                  &nbsp; Learn More &nbsp;
                </button>
              </div>
            </div>
            <div className="col mt-5">
              <img src={dashboard.src} className="coverImg creatorSectionImg mt-5 mt-md-0" style={{ width: "90%" }} />
            </div>
          </div>
          <div className="mt-5 text-center">
            <div className="largeBoldText pt-5 text-justify">
              {`As creators of IRL experiences, the one thing we DESPISE with the industry is the lack of a single, easy-to-use
          platform where WE, the creators, can control the entire ticket lifecycle including fees.`}
            </div>
          </div>
          <div className="largeBoldText py-3 text-center semibold">So we fixed that.</div>
          <div className="text-center">
            <div className="largeBoldText text-justify">
              {`With industry-leading service that goes beyond the ticket stub,
              INSID3RS.io powers event, experience, and activity creators to
              deliver results that exceed your goals with a single, easy-to-use
              platform.`}
            </div>
          </div>
        </div>
      </div> */}
      <div className="homePhysicalCapabilitiesScreen aboutBackground backgroundFixed font py-3 text-white ">
        <div className="container py-5">
          <div className="xxxlBoldText boldText pt-5 purpleColor mdMinimizeFont text-center creatorTitle">
            The complete event platform built for 2023 and beyond
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start">
            <div className="col ">
              <div>
                {/* <div className="xxxlCustomBoldText pt-5 purpleColor minimizeFont">ABOUT</div> */}
                <h1 className="boldText xlBoldText pt-4 pb-3">
                  We Are Creators For Creators
                </h1>
                <div className="largeBoldText text-justify">
                  As creators of IRL experiences, the one thing we DESPISE with the industry is the lack of a single, easy-to-use platform where WE, the creators, can control the entire ticket lifecycle including fees.
                </div>
                <div className="largeBoldText text-justify py-2">
                  So we fixed that.
                </div>
                <button className="btn filledButton mt-4" onClick={() => router.push(RoutePaths.about)}>
                  &nbsp; Learn More &nbsp;
                </button>
              </div>
            </div>
            <div className="col ">
              <img src={about.src} className="coverImg mt-5 mt-md-0 ps-md-3" style={{ width: "90%" }} />
            </div>
          </div>
          <div className="mt-5 text-center">

            <div className="largeBoldText text-justify">
              With industry-leading service that goes beyond the ticket stub,
              INSID3RS.io powers event, experience, and activity creators to
              deliver results that exceed your goals with a single, easy-to-use
              platform.
            </div>
          </div>
        </div>
      </div>
      {/* platform */}
      <div className="Platform container text-white text-center mt-5 pb-5 font">
        <div className="xlBoldText boldText minimizeFont">
          <span>Everything you need for a</span>
          <br></br>
          <span className="xxxlBoldText boldText purpleColor lowLineHeight mdMinimizeFont">
            seamless ticketing experience
          </span>
        </div>
        <div className="largeBoldText pt-5">
          From awareness to scanning and post-event fan engagement, INSID3RS.io
          empowers creators <br></br> to manage the entire event lifecycle,
          issue tickets, and seamlessly validate them at the venue.
        </div>
        {/* <div className="largeBoldText pt-5">
          Afterwards, power post-event fan engagement by adding additional
          benefits for fans to come <br></br> back again and again.
        </div> */}
        {/* NEW SECTION STARTED */}

        {/* ELIMINATE TICKET FRAUD & SCALPING */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-md-start mt-extra reverseColumn">
          <div className="col">
            <div>
              <h1 className="extrabold xlBoldText purpleColor pt-4 pb-3 justify-content-left ml-1">
                {`Eliminate ticket fraud`}
                <br></br>
                {`& scalping`}
              </h1>
              <div className="largeBoldText text-justify justify-content-left ml-1">
                {`Every ticket sold is secured on the Polygon blockchain, meaning tickets can no longer be forged or scalped. With fan-to-wallet-to-ticket
                ID verification in the background, INSID3RS.io cracks down on ticket fraud while providing a seamless ticketing experience for your attendees.`}
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`This industry-leading technology ensures a better ticketing experience for fans and event organizers alike`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`5 second rotating QR codes eliminate ticket fraud & scalping from static ticket stubs`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`1:1 Mobile-ticket verification connects all QR codes to a mobile device, verifying the IRL attendee is indeed the ticket holder`}
                </div>
              </div>

            </div>
          </div>
          <div className="col ml-medium">
            <img src={ticketFraudSection.src} className="coverImg mt-5 mt-md-0 ps-md-3" style={{ width: "80%" }} />
          </div>
        </div>

        {/* UNDERSTAND THE CHANGING NEEDS */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-md-start mt-extra">
          <div className="col ">
            <img src={changingNeedsSection.src} className="coverImg mt-5 mt-md-0 ps-md-3" style={{ width: "100%" }} />
          </div>
          <div className="col ">
            <div>
              <h1 className="extrabold xlBoldText purpleColor pt-4 pb-3 justify-content-left ml-1">
                Understand the changing<br></br>needs of all your attendees
              </h1>
              <div className="largeBoldText text-justify justify-content-left ml-1">
                {`Measure every engagement, down to the very last detail, to maximize ROI and boost ticket retention. Gain actionable
              insights far beyond just your events' to build better immersive experiences for your audience.`}
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  Understand attendee interests based on who they engage with at your event, plus see other events your audience is attending
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Measure how active attendees are during your event with sponsor & exhibitor scanning capabilities`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  Sponsor ROI with native promotion to drive awareness and traffic to both physical and online sponsors
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FREE, PAID, DISCOUNTED */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start mt-extra reverseColumn">
          <div className="col">
            <div>
              <h1 className="extrabold xlBoldText purpleColor pt-4 pb-3 justify-content-left ml-1">
                {`Free, paid, discounted, loaned, rented, or auctioned...`}
                <br></br>
                {`it's all possible`}
              </h1>
              <div className="largeBoldText text-justify justify-content-left ml-1">

                {`Offer your attendees a combination of paid, free, or discounted tickets with easy-to-assign discount codes to drive
                more conversions for your events. Plus, empower fans to sell, rent out, or auction tickets on the secondary market
                with limited markups & fees, all controlled by you!`}
              </div>

              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  Payments securely processed through Stripe
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  135+ currencies supported + Apple Pay<sup className="trademark-symbol">TM</sup> & Google Pay<sup className="trademark-symbol">TM</sup>
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  Allow attendees to rent or auction their tickets if they can no longer attend
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Simple and affordable fee structure with 2% or less on all paid tickets`}
                </div>
              </div>
            </div>
          </div>
          <div className="col ml-medium">
            <img src={ticketCheckoutSection.src} className="coverImg creatorSectionImg ps-md-3" style={{ width: "95%", height: "100%" }} />
          </div>
        </div>

        {/* STAY AHEAD OF THE CURVE */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start mt-extra">
          <div className="col">
            <img src={eventInsightSection.src} className="coverImg mt-5 mt-md-0 ps-md-3" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="col ">
            <div>
              <h1 className="extrabold xlBoldText purpleColor pt-4 pb-3 justify-content-left ml-1">
                {`Stay ahead of the curve with key event insights`}
              </h1>
              <div className="largeBoldText text-justify justify-content-left ml-1">
                {`From sales tracking, converting channels, and IRL event engagement analytics,
                  you'll gain an in-depth understanding of what makes your audience tick and how to get them to convert.`}
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Track where your attendees are coming from and whose converting with promo codes, affiliate links, and Google Analytics connectivity`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2">
                  {`Understand which segment of your audience is engaging with your sponsors, then provide this information back to them`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2">
                  {`Accurately measure the reach of sponsored sections of your event to prove sponsor ROI in an instant`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IT'S NEVER BEEN EASIER  */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start mt-extra reverseColumn">
          <div className="col">
            <div>
              <h1 className="extrabold xlBoldText purpleColor pt-4 pb-3 justify-content-left ml-1">
                {`It's never been easier to reward attendees`}
              </h1>
              <div className="largeBoldText text-justify justify-content-left ml-1">
                {`INSID3RS.io ticketing empowers event organizers to directly provide incentives and ongoing loyalty programs to their community.
                With direct access to your communities secured wallets, you can ...`}
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Provide in-event discounts, coupons, or freebies to your attendees as they engage with your event`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Send discounted tickets for the following year's event to all active attendees`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Automatically have attendees join the INSID3RS.io loyalty program. Every $1 spent earns 1 point towards awesome freebies`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Attract continued repeat purchases with programmable air-drops, rewards, and so much more`}
                </div>
              </div>
            </div>
          </div>
          <div className="col ml-medium">
            <img src={rewardTicketSection.src} className="coverImg creatorSectionImg ps-md-3" style={{ width: "95%", height: "100%" }} />
          </div>
        </div>

        {/* CONVERSION-OPTIMIZED TICKETING */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start mt-extra">
          <div className="col ">
            <img src={conversionSection.src} className="coverImg creatorSectionImg ps-md-3" style={{ width: "85%", height: "90%" }} />
          </div>
          <div className="col ">
            <div>
              <h1 className="extrabold xlBoldText purpleColor pt-4 pb-3 justify-content-left ml-1">
                {`Conversion-optimized ticketing pages are easy to build`}
              </h1>
              <div className="largeBoldText text-justify justify-content-left ml-1">
                {`With our no code, built-to-launch, fully responsive ticketing pages, you'll be ready to start selling tickets in minutes!`}
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Add all event information directly from the admin portal`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Customizable FAQs ensure your attendees know everything they need to about the event`}
                </div>
              </div>
              <div className="d-flex largeBoldText mt-4">
                <div className="d-flex align-items-center green-tick">
                  <img src={Success.src} width="100%" />
                </div>
                <div className="text-align-start ml-2"  >
                  {`Upload static or dynamic tickets - get as creative as you want with it!`}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* NEW SECTION ENDED */}

      </div>

      {/* AGENCY SOLUTION */}
      <div className="mainScreen agencyHomeSectionBackground backgroundFixed my-5 text-white font">
        <div className="container pt-5">
          <div className="quarterFullScreenHome pt-5">
            <div className="row  justify-content-between  align-items-center ">
              <div className="col text-center text-md-start">
                <div className="xxlBoldText boldText minimizeFont">
                  <span>AGENCY</span>
                  <br></br>
                  <span className="xxxlCustomBoldText purpleColor lowLineHeight minimizeFont">
                    SOLUTION
                  </span>
                </div>
              </div>
              <div className="col-auto ps-auto pt-sm-3">
                <div>
                  <div className="d-flex align-items-center justify-content-center largeBoldText mt-4">
                    <img
                      src={Success.src}
                      width="29"
                      height="29"
                      className="me-4"
                    />
                    From awareness to conversion & ongoing <br></br> engagement,
                    centralize your ticketing & <br></br> marketing efforts.
                  </div>
                  <div className="d-flex align-items-center justify-content-center largeBoldText mt-5">
                    <img
                      src={Success.src}
                      width="29"
                      height="29"
                      className="me-4"
                    />
                    Extensive list of tech integrators including <br></br>
                    Attentive, Gleam.io, Klaviyo & more that<br></br> exceed
                    expectations.
                  </div>
                  <div className="d-flex align-items-center justify-content-center largeBoldText mt-5">
                    <img
                      src={Success.src}
                      width="29"
                      height="29"
                      className="me-4"
                    />
                    Expertise crossing international borders <br></br>with
                    companies including Samsung, Aon,<br></br> Google, and
                    Bitcoin Media.
                  </div>
                </div>
              </div>
            </div>
            <div className="row  justify-content-center  align-items-center">
              <div className="col-md-12 col-lg-7"></div>
              <div className="col  ps-auto ">
                <center className="py-5">
                  <button className="btn filledButton my-5" onClick={() => router.push(RoutePaths.creators + "/#waitList")}>
                    &nbsp; Learn More &nbsp;
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* community management */}
      <div className="container text-white text-center mt-5 pb-5 pt-5 font">
        <a href="https://nonfun.live/" target="_blank" rel="noopener noreferrer">
          <img src={NonFunLogo.src} />
        </a>
        <div className="xxxlCustomBoldText purpleColor boldText minimizeFont d-flex flex-column">
          <span className="mb-0">COMMUNITY</span>
          <span className="xxlBoldText text-white lightText lowLineHeight minimizeFont">
            MANAGEMENT
          </span>
        </div>
        <div className="largeBoldText pt-5">
          Our partnership with NonFun makes web3-native social media and
          community management<br></br> available to all creators on INSID3RS!
          Curate your following, foster industry alliances, engage<br></br> with
          fans, and maximize IRL event attendance.
        </div>
        <br />
        <CommunitySlider />
        <br />
        <br />
      </div>
      {/* event production */}
      <div className="mainScreen eventProductionHomeBackground backgroundFixed pt-5 text-white font">
        <div className="container text-center">
          <div className=" xxxlCustomBoldText boldText purpleColor minimizeFont d-flex flex-column">
            <span>EVENT</span>
            <span className="xxlBoldText text-white  lightText lowLineHeight minimizeFont">
              PRODUCTION
            </span>
          </div>
          <div className="largeBoldText pt-5">
            Curate masterful IRL experiences for your fans and keep them
            coming back for<br></br> more with ongoing community airdrops &
            meetups.
            <p className="largeBoldText mb-0 mt-3">Our team have worked on some pretty AMAZING experiences:</p>
          </div>
        </div>
        <EventTypes />
        <div className="largeBoldText container text-center  py-5">
          <p className="pb-5">
            From discovery call through attendee follow-up, our team will take
            your<br></br> experiential vision and build an out-of-this-world
            experience that draws crowds<br></br> and months of conversations.
          </p>
        </div>
      </div>
      {/* tickets secured on blockchain */}
      <div className="mainScreen blockchainTIcketsHomeBackground   text-white font">
        <div className="quarterFullScreenHome ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-6 noPadding"></div>
              <div className="col-sm-12 col-md-6 noPadding">
                <div className="container halfBlur">
                  <div className="row pt-5">
                    <div className="col">
                      <div className="d-flex flex-column align-items-center justify-content-center pt-5 text-center text-md-start px-1  px-md-5">
                        <div className=" xxlBoldText boldText">
                          Did we mention your tickets are secured on the
                          blockchain?
                        </div>
                        <div className="me-0 pb-2 me-md-5 largeBoldText">
                          Tickets on the blockchain are secure, easily
                          verifiable,
                          and work the same as modern e-tickets.
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-start largeBoldText px-1 px-md-5 mt-5">
                        <img
                          src={Success.src}
                          width="29"
                          height="29"
                          className="me-4"
                        />
                        Cut down on ticket fraud and sharing
                      </div>
                      <div className="d-flex align-items-center justify-content-start largeBoldText mt-5 px-1 px-md-5">
                        <img
                          src={Success.src}
                          width="29"
                          height="29"
                          className="me-4"
                        />
                        Creators control all fees, including secondary market fees
                      </div>
                      <div className="d-flex align-items-center justify-content-start largeBoldText mt-5 px-1 px-md-5">
                        <img
                          src={Success.src}
                          width="29"
                          height="29"
                          className="me-4"
                        />
                        Direct access to wallet IDs improves marketing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MVP */}
      <div className=" container text-white text-center mt-5 pt-5 pb-5 font">
        <div className="xxxlCustomBoldText purpleColor minimizeFont">
          MVP Live Now
        </div>
        <div className="largeBoldText pt-1 ">
          First 50 lifetime platform purchasers will be invited to join the
          INSID3RS Elite!<br></br> Benefits include: Input on new products -
          Invite-only Beta Tests - Exclusive Events
        </div>
      </div>
      {/* whiteList */}
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
      <div className="container text-white text-center mt-5 pb-5 font">
        <div className="xxxlCustomBoldText minimizeFont purpleColor">
          <span>FAQs</span>
        </div>
        <CreatorsFaqs />
      </div>
      <Footer />
    </>
  );
};

export default Index;
