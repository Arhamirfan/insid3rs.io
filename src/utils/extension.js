
let getExtension = (url) => {
    console.log(url);
    if (url) {
        let fileType = url.split(/[#?]/)[0].split('.').pop().trim()
        return fileType;
    }
    return null;
}

export default getExtension