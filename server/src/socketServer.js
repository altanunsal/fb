const { Server: WebsocketServer } = require("socket.io");

const io = new WebsocketServer({
  serveClient: false,
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000",
  },
});

function initializeSockets(httpServer) {
  io.attach(httpServer);

  io.on("connect", () => {
    console.log("Websocket client connected");
    io.emit("hello");
  });
}

module.exports = {
  io,
  initializeSockets,
};
