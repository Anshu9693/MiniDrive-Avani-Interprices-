import AdminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const adminAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await AdminModel.findById(decoded.userId).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.admin = admin; // ✅ assign admin object
    next();
  } catch (error) {
    console.log("Admin middleware error: " + error.message);
    res.status(500).json({ message: error.message });
  }
};
