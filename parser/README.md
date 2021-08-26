## File Browser Parser

This small package contains some utilities that are used by the server to generate parsed path information.
It can handle directories and files, and lumps everything else (devices / symlinks etc) as unknown, which are not handled by the frontend.

## Example output

```json
{
  "parsedPath": {
    "resolvedPath": "/Users/altan/Dev/filebrowser/server/src",
    "isDirectory": true,
    "isFile": false,
    "folderContents": [
      {
        "name": "index.js",
        "resolvedPath": "/Users/altan/Dev/filebrowser/server/src/index.js",
        "isFile": true,
        "isDirectory": false,
        "folderContents": []
      },
      {
        "name": "sockets.js",
        "resolvedPath": "/Users/altan/Dev/filebrowser/server/src/sockets.js",
        "isFile": true,
        "isDirectory": false,
        "folderContents": []
      },
      {
        "name": "watcher.js",
        "resolvedPath": "/Users/altan/Dev/filebrowser/server/src/watcher.js",
        "isFile": true,
        "isDirectory": false,
        "folderContents": []
      }
    ]
  }
}
```
