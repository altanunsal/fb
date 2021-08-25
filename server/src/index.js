const express = require("express");
const { apiRouter } = require("./apiRouter");

const app = express();

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  res.send("OK");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
