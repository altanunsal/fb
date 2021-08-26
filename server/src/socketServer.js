const { handlePath } = require("@filebrowser/handlers");
const { Server: WebsocketServer } = require("socket.io");
const path = require("path");
const fs = require("fs");
const { watcher, watchFiles } = require("./watcher");

const io = new WebsocketServer({
  serveClient: false,
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000",
  },
});

const getPathInfoHandler = (socket) => (requestedPath) => {
  console.log(`Handling request for ${requestedPath}`);

  const resolvedPath = path.resolve(process.cwd(), requestedPath);
  const resolvedPathExists = fs.existsSync(resolvedPath);

  if (!resolvedPathExists) {
    socket.emit("error", "Specified path not found");
  }

  watchFiles(socket, resolvedPath);
  const parsedPath = handlePath(resolvedPath, requestedPath);

  socket.emit("pathInfoResult", { parsedPath });
};

function initializeSockets(httpServer) {
  io.attach(httpServer);

  io.on("connection", (socket) => {
    console.log("Websocket client connected");
    socket.emit("basePath", process.cwd());
    socket.on("pathInfo", getPathInfoHandler(socket));
  });
}

module.exports = {
  io,
  initializeSockets,
};
