import {
  createService,
  readAllService,
  readOneService,
  updateOneService,
  destroyService,
} from "../services/placeService/placeService.js";

const controller = {
  create: async (req, res, next) => {
    const payload = req.body;
    const { user } = req;

    try {
      const place = await createService(payload, user);
      res.status(201).json({
        res: place,
        message: "place created successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  readAll: async (req, res, next) => {
    const payload = req.query;

    try {
      const places = await readAllService(payload);
      res.status(200).json({
        res: places,
        message: `${places.length} places read successfully`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  readOne: async (req, res, next) => {
    const { id } = req.params;
    const placeid = await readOneService(id);
    try {
      res.status(200).json({
        res: placeid,
        message: "place read successfully",
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
      const place = await updateOneService(id, payload);
      res.status(201).json({
        res: place,
        message: "place updated successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    const { id } = req.params;
    try {
      const place = await destroyService(id);
      res.status(200).json({
        res: place,
        message: "place deleted successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
