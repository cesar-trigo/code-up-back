import exspress from "express";
import controller from "../controllers/valoration.js";

const { create } = controller;
const router = exspress.Router();

router.post("/", create);

export default router;
