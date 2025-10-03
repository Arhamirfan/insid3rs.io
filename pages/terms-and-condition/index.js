import Head from "next/head";
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import TermsAndConditions from "../../src/components/Accordion/termsAndConditions";
let Index = () => {
    return (
        <>
            <Head>
                <title>Terms &amp; Conditions - INSID3RS.IO</title>
                <meta property="og:title" content="Terms &amp; Conditions - INSID3RS.IO" />
                <meta property="og:description" content="Terms and Conditions || INSID3RS.IO" />
                <meta name="description" content="Terms and Conditions || INSID3RS.IO" />
            </Head>
            <div className="backgroundColor font text-white mt-5">
                <Navbar />
                <div className="supportPage py-5">
                    <TermsAndConditions />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Index;