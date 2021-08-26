const chokidar = require("chokidar");
const { handlePath } = require("@filebrowser/handlers");
const _ = require("lodash");

const getHandler = (socket, resolvedPath, requestedPath) => (message) => {
  console.log(message);
  const parsedPath = handlePath(resolvedPath, requestedPath);
  socket.emit("pathInfoUpdate", { parsedPath });
};

function watchFiles(socket, resolvedPath, requestedPath) {
  const watcher = chokidar.watch(resolvedPath, {
    persistent: true,
    ignoreInitial: true,
  });

  const handler = _.debounce(
    getHandler(socket, resolvedPath, requestedPath),
    200
  );

  watcher
    .on("add", (path) => handler(`File ${path} has been added`))
    .on("addDir", (path) => handler(`Directory ${path} has been added`))
    .on("change", (path) => handler(`File ${path} has been changed`))
    .on("unlink", (path) => handler(`File ${path} has been removed`))
    .on("unlinkDir", (path) => handler(`Directory ${path} has been removed`));

  watcher.add(resolvedPath);

  return watcher;
}

module.exports = {
  watchFiles,
};
