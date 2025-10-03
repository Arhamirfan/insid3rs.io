import React from 'react'
import Head from 'next/head';
import Navbar from '../../src/components/header/navbar';
import Footer from '../../src/components/footer/footer';
import Support from '../../src/pageComponents/event/support';

const index = () => {
    return (
        <>
        <Head>
            <title>Contact - INSID3RS.IO</title>
            <meta property="og:title" content="Contact - INSID3RS.IO" />
            <meta property="og:description" content="Contact || INSID3RS.IO" />
            <meta name="description" content="Contact || INSID3RS.IO" />
        </Head>
            <div className="backgroundColor font text-white ">
                <Navbar />
                <div className="supportPage py-5">
                    <Support />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default index