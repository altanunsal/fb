const express = require("express");
const fs = require("fs");
const path = require("path");
const { handlePath } = require("@filebrowser/handlers");

const basePath = process.cwd();
const apiRouter = express.Router();

apiRouter.get("/baseDir", (req, res) => {
  res.json({ baseDir: process.cwd() });
});

apiRouter.get("/dir/:dirName", (req, res) => {
  const { dirName } = req.params;
  console.log(`Handling request for ${dirName}`);

  const resolvedPath = path.resolve(basePath, dirName);
  const resolvedPathExists = fs.existsSync(resolvedPath);

  if (!resolvedPathExists) {
    res.sendStatus(404);
    return;
  }

  const parsedPath = handlePath(resolvedPath, dirName);

  res.json({ path: parsedPath, basePath });
});

module.exports = {
  apiRouter,
};
