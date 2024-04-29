import express from "express";
import controller from "../controllers/place.js";

const { create, readAll, readOne, updateOne, destroy } = controller;

const router = express.Router();

router.post("/", create);
router.get("/", readAll);
router.get("/:id", readOne);
router.patch("/:id", updateOne);
router.delete("/:id", destroy);

export default router;
