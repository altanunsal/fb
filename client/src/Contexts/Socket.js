import React from "react";
import io from "socket.io-client";

export const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

socket.onAny((event, ...args) => {
  console.log(event, ...args);
});

export const SocketContext = React.createContext();
