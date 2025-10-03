import axios from "../utils/axios";

let appApi = {
    getNetworks: () => axios({
        url: '/v1/admin/network',
        method: 'get',
    }),
    getNetwork: (id) => axios({
        url: `/v1/admin/network/${id}`,
        method: 'get',
    }),
    searchPackages: (id) => axios({
        url: `/v1/app/search/packages/${id}`,
        method: 'get',
    }),
    contactUs: async (data) => {
        return await axios({
            url: "/v1/user/contact",
            data,
            method: "post",
        });
    },
    getResellerPackages: (data) => axios({
        url: "/v1/app/packages/" + data,
        method: 'get',
    }),
    getResellerTicketById: async (data) => {
        return await axios({
            url: "/v1/app/package/" + data,
            method: "get",
        });
    },
    getPreferredEvents: async (data) =>
        await axios({
            url: "/v1/app/preferred-events",
            data,
            method: "get",
        }),
    getInterestedEvents: async (data) =>
        await axios({
            url: "/v1/app/interested-events",
            data,
            method: "get",
        }),
    getTravels: async (data) =>
        await axios({
            url: "/v1/app/travel",
            data,
            method: "get",
        }),
    applyPromoCode: async (data) => {
        return await axios({
            url: "/v1/app/promo-code",
            data,
            method: "post",
        });
    },
    getMyPackages: async () => {
        return await axios({
            url: "/v1/user/my-packages",
            method: "get",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    getMyPurchasedPackages: async () => {
        return await axios({
            url: "/v1/user/packages/purchased",
            method: "get",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    saveAdminEarning: async (id, data) => {
        return await axios({
            url: "/v1/user/event-earning/" + id,
            data,
            method: "post"
        });
    },
}

export default appApi
