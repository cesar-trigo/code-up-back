import express from "express";
import controller from "../controllers/user.js";
import validator from "../middlewares/validator.js";
import schema from "../schemas/user.js";
import accountExistsSignIn from "../middlewares/accountExistsSignIn.js";
import passport from "../middlewares/passport.js";

const { register, readAll, readOne, registerForEvent, destroy, updateOne, signin, loginWithToken } =
  controller;

const router = express.Router();

router.post("/", validator(schema), register);
router.post("/signin", accountExistsSignIn, signin);
router.post("/token", passport.authenticate("jwt", { session: false }), loginWithToken);
router.get("/", readAll);
router.post("/registerEvent", passport.authenticate("jwt", { session: false }), registerForEvent);
router.get("/:id", readOne);
router.delete("/:id", destroy);
router.patch("/:id", updateOne);
router.patch("/:id/password", updateOne);

export default router;
