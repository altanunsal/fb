const chokidar = require("chokidar");
const { parsePath } = require("@filebrowser/parser");
const _ = require("lodash");
const fs = require("fs");

const getMessageEmitter =
  (socket, resolvedPath, requestedPath) => (message) => {
    console.log(message);

    if (!fs.existsSync(resolvedPath)) {
      // watched directory/file has been removed
      socket.emit("pathInfoNotFound", { resolvedPath });
      socket.emit(
        "pathInfoError",
        resolvedPath,
        `Specified path ${resolvedPath} was removed`
      );
    } else {
      // watched directory contents have changed
      const parsedPath = parsePath(resolvedPath, requestedPath);
      socket.emit("pathInfoUpdate", { parsedPath });
    }
  };

function watchFiles(socket, resolvedPath, requestedPath) {
  const watcher = chokidar.watch(resolvedPath, {
    persistent: true,
    ignoreInitial: true,
  });

  const listener = _.debounce(
    getMessageEmitter(socket, resolvedPath, requestedPath),
    200
  );

  watcher
    .on("add", (path) => listener(`File ${path} has been added`))
    .on("addDir", (path) => listener(`Directory ${path} has been added`))
    .on("change", (path) => listener(`File ${path} has been changed`))
    .on("unlink", (path) => listener(`File ${path} has been removed`))
    .on("unlinkDir", (path) => listener(`Directory ${path} has been removed`));

  watcher.add(resolvedPath);

  return watcher;
}

module.exports = {
  watchFiles,
};
