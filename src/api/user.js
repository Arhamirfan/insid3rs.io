import axios from "../utils/axios";
let userApi = {
    getUserProfile: async () => {
        return await axios({
            url: "/v1/user/profile",
            method: "get",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    signUp: async (data) => {
        return await axios({
            url: "/v1/user/signUp",
            data,
            method: "post",
        });
    },
    login: async (data) => {
        return await axios({
            url: "/v1/user/login",
            data,
            method: "post",
        });
    },
    verifyUser: async (data) => {
        return await axios({
            url: "/v1/user/verify-account",
            data,
            method: "post",
        });
    },
    updateUser: async (data) => {
        return await axios({
            url: "/v1/user/profile",
            data,
            method: "patch",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    addToWhitelist: async (data) => {
        return await axios({
            url: "/v1/user/whitelist",
            data,
            method: "post",
        })
    },
    subscribeEmail: async (data) => {
        return await axios({
            url: "/v1/user/subscribe",
            data,
            method: "post",
        })
    },
    userProfileS3: async (data) => {
        return await axios({
            url: "/v1/user/profile/s3-url",
            data,
            method: "post",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    s3_upload_loader: (url, file, progressCallback) => {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr);
                    } else {
                        reject(xhr);
                    }
                }
            };
            if (progressCallback) {
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / file.size) * 100;
                        progressCallback(percentComplete);
                    }
                };
            }

            xhr.open("PUT", url);
            xhr.send(file);
        });
    },
};
export default userApi;
