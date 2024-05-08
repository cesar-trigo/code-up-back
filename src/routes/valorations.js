import exspress from "express";
import controller from "../controllers/valoration.js";
import passport from "passport";

const { create } = controller;
const router = exspress.Router();

router.post("/", passport.authenticate("jwt", { session: false }), create);

export default router;
