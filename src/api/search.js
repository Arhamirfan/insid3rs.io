import axios from "../utils/axios";
let search = {
    searchEventByName: (data) => {
        return axios({
            url: "/v1/events/search/" + data,
            method: "get",
        });
    },
    searchTicketByTitle: (data) => {
        return axios({
            url: "/v1/events/ticket/search/" + data,
            method: "get",
        });
    },
    globalSearch: (data) => {
        return axios({
            url: "/v1/app/search/global/" + data,
            method: "get",
        });
    },
};
export default search;
