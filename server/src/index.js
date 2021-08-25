const cors = require("cors");
const express = require("express");
const http = require("http");

const { apiRouter } = require("./apiRouter");
const { initializeSockets } = require("./socketServer");

const app = express();
const httpServer = http.createServer(app);

initializeSockets(httpServer);

app.use(cors());

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  res.send("OK");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

httpServer.listen(8080, () => {
  console.log("Server started on port 8080");
});
