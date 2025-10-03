
import moment from "moment/moment";
let globalServices = {
    dataBeforeEndDate: (payload) => {
        return moment.utc(new Date()).startOf('day').isSameOrBefore(moment.utc(payload).startOf('day'))
    },
    isIframeWebsite: (payload) => {
        try {
            if (typeof window !== 'undefined' && window.top !== window.self)
                return true;
            return false;
        } catch (error) {
            console.log("🚀 ~ file: globalServices.js:11 ~ error:", error.message)
        }
    },
    getLocalTime: async (data) => {
        const date = data.substr(0, 10);
        const time = data.substr(11, 5);
        return `${data}T${time}`
    },
    showTimeWithMeridiem: (dateString) => {
        const dateParts = dateString.split("T")[0].split("-");
        const timeParts = dateString.split("T")[1].split(":");
        const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
        const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
        const formattedDateTime = `${formattedDate}, ${formattedTime}`;
        console.log(formattedDateTime);
        return formattedDateTime;
    }
};
export default globalServices;
