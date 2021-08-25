const { handlePath } = require("@filebrowser/handlers");
const { Server: WebsocketServer } = require("socket.io");
const path = require("path");
const fs = require("fs");
const { watcher } = require("./watcher");

const io = new WebsocketServer({
  serveClient: false,
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000",
  },
});

const getPathInfoHandler = (socket) => (dirName) => {
  console.log(`Handling request for ${dirName}`);

  const resolvedPath = path.resolve(process.cwd(), dirName);
  const resolvedPathExists = fs.existsSync(resolvedPath);

  if (!resolvedPathExists) {
    socket.emit("error", "Specified path not found");
  }

  const parsedPath = handlePath(resolvedPath, dirName);
  watcher.add(resolvedPath);

  socket.emit("pathInfoResult", { path: parsedPath });
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
