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

const getPathInfoListener = (socket) => (requestedPaths) => {
  const parsedPaths = requestedPaths.split(",").reduce((values, value) => {
    const sanitizedValue = value.trim();
    const resolvedPath = path.resolve(process.cwd(), sanitizedValue);

    const resolvedPathExists = fs.existsSync(resolvedPath);

    if (!resolvedPathExists) {
      socket.emit(
        "pathInfoError",
        value,
        `Specified path ${sanitizedValue} not found`
      );
      return values;
    }

    watchFiles(socket, resolvedPath);
    const parsedPath = handlePath(resolvedPath, sanitizedValue);
    values.push(parsedPath);
    return values;
  }, []);

  socket.emit("pathInfoResult", { parsedPaths });
};

function initializeSockets(httpServer) {
  io.attach(httpServer);

  io.on("connection", (socket) => {
    console.log("Websocket client connected");
    socket.emit("basePath", process.cwd());
    socket.on("pathInfo", getPathInfoListener(socket));
  });
}

module.exports = {
  io,
  initializeSockets,
};
