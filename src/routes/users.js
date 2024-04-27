import express from "express";
import controller from "../controllers/user.js";

const { register, readAll } = controller;

const router = express.Router();

/* GET users listing. */
router.post("/", register);
router.get("/", readAll);

export default router;
