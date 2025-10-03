import { useRouter } from "next/router";
//BOOTSTRAP
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
//data
import Head from "next/head";
import TicketApi from "../../src/api/ticketApi";
import TicketDataTabView from "../../src/pageComponents/tickets/data/ticketDataTabView";
import { useEffect, useState } from "react";
import getExtension from "../../src/utils/extension";
import globalServices from "../../src/utils/globalServices";
let Index = (props) => {
  let router = useRouter();
  let [ticketData, setTicketData] = useState(props.ticketData)


  let getTicketsById = async () => {
    let { id } = router.query;
    TicketApi.getTicketById(id[1]).then((res) => {
      console.log('ticketApi:', res)
      if (res && res.status == 201) {
        setTicketData(res.data.data);
      }
    }).catch((error) => {
    });

  };
  return (
    <>
      <div className="backgroundColor font text-white background-circle">
        <Navbar />
        {ticketData?._id ? (
          <>
            <Head>
              <title>{ticketData?.ticketTitle}</title>
              <meta property="og:title" content={ticketData?.ticketTitle} />
              <meta property="og:description" content={ticketData?.benefits} />
              <meta name="description" content={ticketData?.benefits} />
              {getExtension(ticketData?.image) !== 'mp4' && <meta property="og:image" content={ticketData?.image} />}
            </Head>
            <TicketDataTabView
              TicketData={ticketData}
            />
          </>
        ) : (
          <div className="pt-5">
            <div className="container my-5 py-5 text-white">
              <div className="d-flex justify-content-center">
                <h4>No record found</h4>
              </div>
            </div>
          </div>
        )}
        {!globalServices.isIframeWebsite() && <Footer />}
      </div>
    </>
  );
};




export async function getServerSideProps(context) {
  try {
    let { id } = context.params;
    let res = await TicketApi.getTicketById(id[1]).then((res) => res).catch(error => { return {} })
    if (res?.data?.data) {
      res = res?.data?.data
    } else {
      res = {}
    }
    return { props: { ticketData: res } }
  } catch (error) {
    console.log("🚀 ~ file: tickets.[...id].js:63 ~ getServerSideProps ~ error:", error)
  }

}

export default Index;
