import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "../../../public/assets/images/icons/error.png";
import RoutePaths from "../../../src/routes/path";
import payment from "../../../src/api/payment";
let Index = () => {
    let router = useRouter();
    let param = router.query.id;
    let [data, setData] = useState();
    let [message, setMessage] = useState("loading");

    useEffect(() => {
        if (param) {
            getPaymentDetail();
        }
    }, [param]);

    let getPaymentDetail = async () => {
        payment.getPaymentDetails(param).then((result) => {
            if (result && result.status == 200) {
                console.log('getPaymentDetail result:', result?.data.data);
                payment.updatePaymentDetails(param).then((cancelledResult) => {
                    if (cancelledResult && cancelledResult.status == 200) {
                        console.log('updated stripe payment result:', cancelledResult?.data.data);
                    }
                }).catch((err) => {
                    console.log("🚀 ~ file: [id].js:25 ~ payment.getPaymentDetails ~ err:", err)
                });
                setData(result.data.data);
            }
        }).catch((err) => {
            console.log("🚀 ~ file: [id].js:25 ~ payment.getPaymentDetails ~ err:", err)
        });
        setMessage("");
    };
    return (
        <>
            <div className="container mainScreen">
                <div className="d-flex flex-column justify-content-center align-items-center fullScreenHome">
                    {message === "loading" ?
                        <>
                            <div className="spinner-grow spinner text-success" role="status"></div>
                        </> :
                        <>
                            <img src={Error.src} />
                            <h4 className="pt-5 xxlBoldText BoldText  redColor">Payment Failed!</h4>
                            <h5 className="pb-5  descriptionColor">Transaction Reverted.</h5>
                            {data?._id ? <>
                                {!data?.iframeCall && <a href={RoutePaths.events} className="btn filledButton my-5">Back to website</a>}
                            </> : <></>}
                        </>
                    }

                </div>
            </div>
        </>
    )
}

export default Index;  