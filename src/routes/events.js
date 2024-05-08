import express from "express";
import controller from "../controllers/event.js";
import validator from "../middlewares/validator.js";
import schema from "../schemas/event.js";
import passport from "../middlewares/passport.js";

const { create, readAll, updateOne, destroy } = controller;

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), validator(schema), create);
router.get("/", readAll);
router.patch("/:id", passport.authenticate("jwt", { session: false }), updateOne);
router.delete("/:id", destroy);

export default router;
