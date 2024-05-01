import express from "express";
import controller from "../controllers/user.js";
import validator from "../middlewares/validator.js";
import schema from "../schemas/user.js";
import accountExistsSignIn from "../middlewares/accountExistsSignIn.js";

const { register, readAll, readOne, registerForEvent, destroy, updateOne, signin } = controller;

const router = express.Router();

router.post("/", validator(schema), register);
router.post("/signin", accountExistsSignIn, signin);
router.get("/", readAll);
router.post("/registerForEvent", registerForEvent);
router.get("/:id", readOne);
router.delete("/:id", destroy);
router.patch("/:id", updateOne);

export default router;
