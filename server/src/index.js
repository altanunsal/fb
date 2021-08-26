const cors = require("cors");
const express = require("express");
const http = require("http");

const { initializeSockets } = require("./sockets");

const app = express();
const httpServer = http.createServer(app);

initializeSockets(httpServer);

app.use(cors());

app.get("/ping", (req, res) => {
  res.send("OK");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

httpServer.listen(8080, () => {
  console.log("Server started on port 8080");
});
