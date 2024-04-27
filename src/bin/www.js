#!/usr/bin/env node

import app from "../app.js";
import debug from "debug";
const logger = debug("code-up-back:server");
import http from "http";
/* import { connect } from "mongoose"; */

let port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

let server = http.createServer(app);
/* let ready = () => {
  console.log("server ready on port " + port);
  connect(process.env.LINK_DB)
    .then(() => console.log("database connected"))
    .catch(err => console.log(err));
}; */

server.listen(port, () => {
  console.log("server ready on port " + port);
});
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
