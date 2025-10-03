import axios from "../utils/axios";
let ticketApi = {
  getTickets: async (data) =>
    await axios({
      url: "/v1/events/tickets",
      data,
      method: "get",
    }),
  getTicketById: async (data) => {
    return await axios({
      url: "/v1/events/ticket/slug/" + data,
      method: "get",
    });
  },
  buyTickets: async (data) => {
    return await axios({
      url: "/v1/user/tickets/buy",
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  buyTicketsMail: async (data) => {
    return await axios({
      url: "/v1/user/tickets/send-mail",
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  getAllPurchasedTickets: async (id) => {
    return await axios({
      url: "/v1/events/tickets/purchased/" + id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  getResellerByTicketId: async (id) => {
    return await axios({
      url: "/v1/events/tickets/resellers/" + id,
      method: "get",
    });
  },
  getAuctionBids: async (id) => {
    return await axios({
      url: "/v1/user/package/bid/" + id,
      method: "get",
    });
  },
  getPurchasedTickets: async (data) => {
    return await axios({
      url: "/v1/user/tickets",
      data,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  buyTicket: async (data) => {
    return await axios({
      url: "/v1/stripe/buy-ticket",
      data,
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  addPackage: async (data) => {
    return await axios({
      url: "/v1/user/package",
      data,
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  buyPackage: async (data) => {
    return await axios({
      url: "/v1/user/buy/package",
      data,
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  bidOnAuction: async (data) => {
    return await axios({
      url: "/v1/user/package/bid",
      data,
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  acceptBid: async (data) => {
    return await axios({
      url: `/v1/user/buy/auction`,
      data,
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  updateTicketQR: async (data) => {
    return await axios({
      url: `/v1/user/packages/update-qrCode`,
      data,
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};
export default ticketApi;
