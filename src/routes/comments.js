import express from "express";
import controller from "../controllers/comment.js";
import passport from "passport";
/* import validator from "../middlewares/validator.js";
import schema from "../schemas/comment.js"; */

const { create } = controller;

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), create);

export default router;
