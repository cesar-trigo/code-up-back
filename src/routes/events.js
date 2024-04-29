import express from "express";
import controller from "../controllers/event.js";

const { create, readAll, updateOne, destroy } = controller;

const router = express.Router();

router.post("/", create);
router.get("/", readAll);
router.patch("/:id", updateOne);
router.delete("/:id", destroy);

export default router;
