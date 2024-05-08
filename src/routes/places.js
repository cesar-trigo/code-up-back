import express from "express";
import controller from "../controllers/place.js";
import validator from "../middlewares/validator.js";
import schema from "../schemas/place.js";
import passport from "passport";
const { create, readAll, readOne, updateOne, destroy } = controller;

const router = express.Router();

router.post("/", validator(schema), passport.authenticate("jwt", { session: false }), create);
router.get("/", readAll);
router.get("/:id", readOne);
router.patch("/:id", updateOne);
router.delete("/:id", destroy);

export default router;
