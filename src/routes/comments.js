import express from "express";
import controller from "../controllers/comment.js";
/* import validator from "../middlewares/validator.js";
import schema from "../schemas/comment.js"; */

const { create } = controller;

const router = express.Router();

router.post("/", create);

export default router;
