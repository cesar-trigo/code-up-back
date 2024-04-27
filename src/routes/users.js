import express from "express";
import controller from "../controllers/user.js";

const { register } = controller;

const router = express.Router();

/* GET users listing. */
router.post("/", register);

export default router;
