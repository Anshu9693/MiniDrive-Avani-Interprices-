import express from "express";
import multer from "multer";
import { createFile, deleteFile, getAllFiles, getUserFiles } from "../controllers/file.controller.js";
import { userAuthMiddleware } from "../middleware/user.auth.middleware.js";
import { adminAuthMiddleware } from "../middleware/admin.auth.middleware.js";

const router = express.Router();

const uploads = multer({
  storage: multer.memoryStorage(),
});

// [POST] /api/files/upload
router.post("/upload", userAuthMiddleware ,uploads.single("file"), createFile);

//[GET] /api/files/all
router.get("/all", adminAuthMiddleware, getAllFiles);

//[get] /api/files/peruser
router.get("/peruser/", userAuthMiddleware, getUserFiles);

//[DELETE] /api/files/admin/:fileId
router.delete("/admin/:fileId", adminAuthMiddleware, deleteFile);

//[DELETE] /api/files/user/:fileId
router.delete("/user/:fileId", userAuthMiddleware, deleteFile);
  

export default router;
