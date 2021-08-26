## File Browser Server

This is a simple server that is built using:

- `socket.io`
- `chokidar`

A websocket server is exposed on port `8080`.

### Events

- `basePath` event is emitted when a client is connected, so the end user is aware of the root path from which all other paths will be parsed relatively.
- `pathInfoResult` event is emitted as a result of a query received from the frontend, and contains the parsed filesystem information
- `pathInfoNotFound` event is emitted when a filesystem watcher detects the watched file(s) were deleted
- `pathInfoUpdate` event is emitted when any filesystem change is detected by the watcher
- `pathInfoError` event is emitted when either a target file/dir does not exist, or if it has been removed after being watched
