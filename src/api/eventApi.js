import axios from "../utils/axios";
let EventApi = {
  getEvent: async (data) =>
    await axios({
      url: "/v1/events/",
      data,
      method: "post",
    }),
  getEventById: async (data) => {
    return await axios({
      url: "/v1/events/event/slug/" + data,
      method: "get",
    });
  },
  getEventByDbId: async (data) => {
    return await axios({
      url: "/v1/events/event/" + data,
      method: "get",
    });
  },
};
export default EventApi;
