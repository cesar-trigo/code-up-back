import express from "express";
import controller from "../controllers/user.js";
import accountExistsSignIn from "../middlewares/accountExistsSignIn.js";

const { register, readAll, readOne, destroy, updateOne, signin } = controller;

const router = express.Router();

router.post("/", register);
router.post("/signin", accountExistsSignIn, signin);
router.get("/", readAll);
router.get("/:id", readOne);
router.delete("/:id", destroy);
router.patch("/:id", updateOne);

export default router;
