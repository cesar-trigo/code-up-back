import express from "express";
import users from "./users.js";
import places from "./places.js";
import events from "./events.js";
import comments from "./comments.js";

const router = express.Router();

router.use("/api/users", users);
router.use("/api/places", places);
router.use("/api/events", events);
router.use("/api/comments", comments);

export default router;
