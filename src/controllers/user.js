import {
  registerService,
  signinService,
  readOneService,
  readAllService,
  updateOneService,
  destroyService,
} from "../services/userService/userService.js";

const controller = {
  register: async (req, res, next) => {
    const payload = req.body;
    try {
      const user = await registerService(payload);
      res.status(201).json({
        res: user,
        message: "User created successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  signin: async (req, res, next) => {
    const payload = req.body;
    const { user } = req;

    try {
      const signin = await signinService(user, payload);
      return res.status(200).json({
        response: signin,
        success: true,
        message: `Welcome ${user.name}`,
      });
    } catch (error) {
      next(error);
    }
  },

  readAll: async (req, res, next) => {
    let order = { name: req.query.name };

    try {
      const users = await readAllService(order);
      res.status(200).json({
        res: users,
        message: `${users.length} users read successfully`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  readOne: async (req, res, next) => {
    const { id } = req.params;

    try {
      const userid = await readOneService(id);
      res.status(200).json({
        res: userid,
        message: "user read successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  updateOne: async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    try {
      const userid = await updateOneService(id, payload);
      res.status(200).json({
        res: userid,
        message: "user updated successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    const { id } = req.params;

    try {
      const userid = await destroyService(id);
      res.status(200).json({
        res: userid,
        message: "user deleted successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
