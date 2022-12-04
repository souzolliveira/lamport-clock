const express = require("express");
const http = require("http");
const axios = require("axios");
let cors = require("cors");

const APP = express();
APP.use(express.json());

const SERVER = http.createServer(APP);

const PORT = process.env.PORT;
const sleep = (process.env.PORT % 10) * 1000;

APP.use(cors());

SERVER.listen(PORT);

let timer = 0;

setInterval(() => {
  timer += sleep / 1000;
}, [sleep]);

APP.get("/get-timer", (req, res) => {
  console.log(`Timer ${PORT}: ${timer}`);
  console.log("");
  res.json({});
});

APP.get("/send-message/:to", (req, res) => {
  timer += 1;

  console.log(`${PORT} sends a message to ${req.params.to}`);
  console.log(`Timer ${PORT}: ${timer}`);
  console.log("");
  const SERVICE = axios.create({
    baseURL: `http://localhost:${req.params.to}`,
  });
  SERVICE.get(`/message/${PORT}/${timer}`).then(() => {});
  res.json({});
});

APP.get("/message/:from/:timer", (req, res) => {
  console.log(`${PORT} receives a message from ${req.params.from}`);
  if (parseInt(timer, 10) < parseInt(req.params.timer, 10)) {
    console.log(`Previous timer ${PORT}: ${timer}`);
    timer = parseInt(req.params.timer, 10);
  }
  console.log(`Current timer ${PORT}: ${timer}`);
  console.log("");
  console.log("########### Message sent ###########");
  console.log("");
  res.json({});
});
