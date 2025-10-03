import axios from "../utils/axios";
let s3Services = {
  get_s3_url: async (data) => {
    return await axios({
      url: `/admin/s3-url`,
      method: "post",
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
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
  }
};
export default s3Services;
