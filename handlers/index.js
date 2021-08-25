const fs = require("fs");
const path = require("path");

function generateFolderContents(resolvedFolderPath) {
  const folderContent = fs.readdirSync(resolvedFolderPath);

  return folderContent.map((contentPath) => {
    const resolvedPath = path.resolve(resolvedFolderPath, contentPath);
    return handlePath(resolvedPath, contentPath);
  });
}

function handleDirectory(resolvedPath, name) {
  return {
    name,
    resolvedPath,
    isDirectory: true,
    folderContents: generateFolderContents(resolvedPath),
  };
}

function handleFile(resolvedPath, name) {
  return {
    name,
    resolvedPath,
    isFile: false,
    isDirectory: false,
  };
}

function handleUnknown(resolvedPath, name) {
  return {
    name,
    resolvedPath,
    isFile: false,
    isDirectory: false,
  };
}

function handlePath(resolvedPath, name) {
  const pathStats = fs.statSync(resolvedPath);

  if (pathStats.isDirectory()) {
    return handleDirectory(resolvedPath, name);
  } else if (pathStats.isFile()) {
    return handleFile(resolvedPath, name);
  } else {
    return handleUnknown(resolvedPath, name);
  }
}

module.exports = {
  handlePath,
};
