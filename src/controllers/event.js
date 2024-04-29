import {
  createService,
  readAllService,
  updateOneService,
  destroyService,
} from "../services/eventService/eventService.js";

const contoller = {
  create: async (req, res, next) => {
    const payload = req.body;

    try {
      const event = await createService(payload);

      res.status(201).json({
        res: event,
        message: "event created successfully",
        success: true,
      });
    } catch (error) {
      if (error.message === "Unauthorized") {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to create events",
        });
      }

      next(error);
    }
  },

  readAll: async (req, res, next) => {
    let order = { name: req.query.name };
    try {
      const events = await readAllService(order);
      res.status(200).json({
        res: events,
        message: `${events.length} events read successfully`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  updateOne: async (req, res, next) => {
    const payload = req.body;
    const { id } = req.params;
    try {
      const event = await updateOneService(id, payload);
      res.status(201).json({
        res: event,
        message: "event updated successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    const { id } = req.params;
    try {
      const event = await destroyService(id);
      res.status(200).json({
        res: event,
        message: "event deleted successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default contoller;
