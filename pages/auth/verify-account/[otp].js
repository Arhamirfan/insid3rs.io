import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userApi from "../../../src/api/user";
import toast from "react-hot-toast";


const AccountVerification = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const email = router.query.email;

    useEffect(() => {
        const otp = window.location.pathname.split("/").pop();
        setOtp(otp)
    }, [])

    const verifyAccount = () => {
        try {
            setLoading(true);
            userApi.verifyUser({ email, otp })
                .then((result) => {
                    if (result && result.status == 200) {
                        toast.success("Email verified!")
                        window.location.replace('/')
                    }
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                });
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }

    return (
        <div>
            {loading ?
                <div className="d-flex justify-content-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                <>
                    <div className="d-flex justify-content-center pt-5">
                        <h2>Verify your email address</h2>
                    </div>
                    <div className="d-flex justify-content-center pt-1">
                        <p>Please confirm that you want to use this as your email address</p>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <button className="account-verify-btn" onClick={verifyAccount} >Verify my email</button>
                    </div>
                </>}
        </div>
    )
}

export default AccountVerification;