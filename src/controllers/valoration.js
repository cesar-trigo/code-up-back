import Event from "../models/Event.js";
import Valoration from "../models/Valoration.js";

const controller = {
  create: async (req, res, next) => {
    const payload = req.body;
    const { user } = req;
    const event = await Event.findById(payload.eventId);

    if (event.date > Date.now()) {
      return res.status(400).json({
        message: "Event has ended",
        success: false,
      });
    }

    const userEn = event.attendees.some(id => id.equals(user._id));

    if (!userEn) {
      return res.status(400).json({
        message: `not user in event}`,
        success: false,
      });
    }

    const newValoration = new Valoration({
      valoration: payload.valoration,
      userId: user._id,
      eventId: payload.eventId,
    });

    try {
      const valoration = await newValoration.save();
      return res.status(201).json({
        res: valoration,
        message: `Valoration created successfully`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
