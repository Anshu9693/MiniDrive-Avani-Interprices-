import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const userAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "user Login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.log("middleware error " + error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
