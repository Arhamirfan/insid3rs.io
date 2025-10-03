import io from 'socket.io-client';

let url = process.env.NEXT_PUBLIC_NODE_APP_URL;
url = url.slice(0, -4);
console.log("socket client url: ", url);
let socketConnection = io.connect(url);

export default socketConnection