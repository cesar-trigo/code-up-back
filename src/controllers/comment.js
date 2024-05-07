import Comment from "../models/Comment.js";
import Event from "../models/Event.js";

const controller = {
  create: async (req, res, next) => {
    const payload = req.body;

    const event = await Event.findById(payload.eventId);

    if (event.date > Date.now()) {
      return res.status(400).json({
        message: "Event has ended",
        success: false,
      });
    }

    const newComment = new Comment({
      comment: payload.comment,
      userId: payload.userId,
      eventId: payload.eventId,
    });

    try {
      const comment = await newComment.save();
      return res.status(201).json({
        res: comment,
        message: "Comment created successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
