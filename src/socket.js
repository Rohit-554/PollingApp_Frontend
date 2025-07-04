import { io } from "socket.io-client";

export const socket = io("https://polling-rr4j.onrender.com/", {
  transports: ["websocket"],
});