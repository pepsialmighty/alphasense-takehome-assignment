import io from "socket.io-client";

// const serverUrl =
//   process.env.REACT_APP_API_SERVER ?? "http://localhost:4000";

const url = "http://localhost:5000";

export const socket = io(url);
