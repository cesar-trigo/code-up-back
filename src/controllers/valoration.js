import Event from "../models/Event.js";
import Valoration from "../models/Valoration.js";

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

    const valoration = new Valoration({
      valoration: payload.valoration,
      userId: payload.userId,
      eventId: payload.eventId,
    });

    try {
      const valorationCreated = await valoration.save();
      return res.status(201).json({
        res: valorationCreated,
        message: "Valoration created successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
