import axios from "../utils/axios";
let payment = {
    getPaymentDetails: async (id) => {
        return await axios({
            url: "/v1/stripe/payment-details/" + id,
            method: "get",
        });
    },
    updatePaymentDetails: async (id) => {
        return await axios({
            url: "/v1/stripe/payment-details/" + id,
            method: "post",
        });
    },
    mintTicketAfterPayment: async (id) => {
        return await axios({
            url: "/v1/stripe/mint-ticket/" + id,
            method: "post",
        });
    },
};
export default payment;
