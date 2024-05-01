import express from "express";
import controller from "../controllers/event.js";
import validator from "../middlewares/validator.js";
import schema from "../schemas/event.js";

const { create, readAll, updateOne, destroy } = controller;

const router = express.Router();

router.post("/", validator(schema), create);
router.get("/", readAll);
router.patch("/:id", updateOne);
router.delete("/:id", destroy);

export default router;
