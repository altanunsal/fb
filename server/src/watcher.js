const chokidar = require("chokidar");

function initializeWatcher(basePath) {
  const watcher = chokidar.watch(basePath, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on("add", (path) => console.log(`File ${path} has been added`))
    .on("addDir", (path) => console.log(`Directory ${path} has been added`))
    .on("change", (path) => console.log(`File ${path} has been changed`))
    .on("unlink", (path) => console.log(`File ${path} has been removed`))
    .on("unlinkDir", (path) =>
      console.log(`Directory ${path} has been removed`)
    );

  return watcher;
}

const watcher = initializeWatcher(process.cwd());

module.exports = {
  watcher,
};
