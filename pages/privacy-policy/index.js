import Head from "next/head";
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import PrivacyPolicies from "../../src/components/Accordion/privacyPolicies";
let Index = () => {
    return (
        <>
        <Head>
            <title>Privacy Policy - INSID3RS.IO</title>
            <meta property="og:title" content="Privacy Policy - INSID3RS.IO" />
            <meta property="og:description" content="Privacy Policy || INSID3RS.IO" />
            <meta name="description" content="Privacy Policy || INSID3RS.IO" />
        </Head>
            <div className="backgroundColor font text-white mt-5">
                <Navbar />
                <div className="policyPage py-5 mb-5">
                    <div className="container">
                        <div className="text-center">
                            <div className="xxxlCustomBoldText minimizeFont purpleColor">Privacy Policy</div>
                        </div>
                        <br></br>
                        <p>
                            Insid3rs.io LLC (&ldquo;<strong>Insid3rs.io</strong>,&rdquo; &ldquo;<strong>Insid3rs</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, or &ldquo;<strong>us</strong>&rdquo;) is committed to protecting your privacy. We have prepared this Privacy Policy to describe to you our practices regarding the Personal Information (as defined below) we collect, why we collect it, and how we use and disclose it.
                        </p>
                        <br></br>
                        <p>Your privacy is very important to us, and in order to best protect your information, we have adopted this privacy policy (&ldquo; <strong>Privacy Policy</strong>&rdquo;), which describes the types of information we collect from registered or unregistered end users (each, a &ldquo;<strong>User</strong>&rdquo;, &ldquo;<strong>you</strong>&rdquo; or &ldquo;<strong>your</strong>&rdquo;) of the INSID3RS website, <a href="https://www.INSID3RS.io/">https://www.INSID3RS.io</a>  (the &ldquo; <strong>Site</strong>&rdquo;), and/or the INSID3RS mobile application (the &ldquo;<strong>App</strong>&rdquo;, and collectively with the Site and all services provided therein, the &ldquo;<strong>Platform</strong>&rdquo;), how such information is used, processed and in certain cases disclosed by us, and your rights and choices regarding the information you provide to us. Please read this Privacy Policy carefully prior to your use of, or creation of a registered User account (an &ldquo;<strong>Account</strong>&rdquo;) on, the Platform. If you do not agree to abide by this Privacy Policy, please do not use our Platform or create an Account.</p>
                        <br></br>
                        <p>By accessing and using the Platform and/or creating an Account, you are deemed to have read, accepted, executed, and be bound by this Privacy Policy, including, without limitation, the information collection, use, and disclosure practices described herein. This Privacy Policy is governed by the Platform’s Terms of Service, which includes all disclaimers of warranties and limitations of liabilities.</p>
                    </div>
                    <PrivacyPolicies />

                </div>
                <Footer />
            </div>
        </>
    )
}

export default Index;