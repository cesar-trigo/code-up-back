import express from "express";
import users from "./users.js";

const router = express.Router();

/* GET home page. */
router.use("/api/users", users);

export default router;
