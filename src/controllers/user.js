import User from "../models/User.js";
import bcryptjs from "bcryptjs";

const controller = {
  register: async (req, res, next) => {
    const { name, lastname, email, photo, password, age, genre, events } = req.body;
    const role = "user";
    password = bcryptjs.hashSync(password, 10);

    try {
      await User.create({ name, lastname, email, photo, password, age, genre, role, events });
      res.status(201).json({
        message: "User created successfully",
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
  },
};

export default controller;
