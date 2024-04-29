import User from "../models/User.js";

async function accountExistsSignIn(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: "incorrect password or email",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}

export default accountExistsSignIn;
