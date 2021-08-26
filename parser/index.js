const fs = require("fs");
const path = require("path");

function generateFolderContents(resolvedFolderPath) {
  const folderContent = fs.readdirSync(resolvedFolderPath);

  return folderContent.map((contentPath) => {
    const resolvedPath = path.resolve(resolvedFolderPath, contentPath);
    return parsePath(resolvedPath, contentPath);
  });
}

function parseDirectory(resolvedPath, name) {
  return {
    name,
    resolvedPath,
    isDirectory: true,
    isFile: false,
    folderContents: generateFolderContents(resolvedPath),
  };
}

function parseFile(resolvedPath, name) {
  return {
    name,
    resolvedPath,
    isFile: true,
    isDirectory: false,
    folderContents: [],
  };
}

function parseUnknown(resolvedPath, name) {
  return {
    name,
    resolvedPath,
    isFile: false,
    isDirectory: false,
  };
}

function parsePath(resolvedPath, name) {
  const pathStats = fs.lstatSync(resolvedPath);

  if (pathStats.isDirectory()) {
    return parseDirectory(resolvedPath, name);
  } else if (pathStats.isFile()) {
    return parseFile(resolvedPath, name);
  } else {
    return parseUnknown(resolvedPath, name);
  }
}

module.exports = {
  parsePath,
};
