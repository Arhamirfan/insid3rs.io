import axios from "../utils/axios";

let AuthApi = {
    login: async (data) => {
        return await axios({
            url: '/v1/user/login',
            method: 'post',
            data
        })
    },
    verifyOtp: async (data) => {
        return await axios({
            url: '/v1/user/verify-otp',
            method: 'post',
            data
        })
    },
    verifyAccount: async (data) => {
        return await axios({
            url: '/v1/user/verify-account',
            method: 'post',
            data
        })
    },
    metaMaskLogin: (data) => axios({
        url: '/v1/user/metamask-login',
        method: 'post',
        data
    }),
    loginWithGoogle: (data) => axios({
        url: '/v1/user/google-login',
        method: 'post',
        data
    }),
    authWithGoogle: (data) => axios({
        url: '/v1/user/verify-google-token',
        method: 'post',
        data
    }),
    emailToAddress: (data) => axios({
        url: '/v1/user/email-to-address',
        method: 'post',
        data
    }),
    scanLogin: (data) => axios({
        url: '/v1/user/scan-login',
        method: 'post',
        data
    }),
    scanTicketBarCode: (data) => axios({
        url: '/v1/user/scan-ticket',
        method: 'post',
        data
    }),
}

export default AuthApi

