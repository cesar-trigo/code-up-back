import "dotenv/config.js";
import "./config/database.js";
import createHttpError from "http-errors";
import express from "express";
import __dirname from "./utils.js";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// routes
import indexRouter from "./routes/index.js";
/* import usersRouter from "./routes/users.js";
 */
// app

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);

export default app;
