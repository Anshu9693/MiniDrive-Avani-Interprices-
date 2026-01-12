import { uploadFile } from "../services/services.storage.js";
import { v4 as uuid } from "uuid";
import FileModel from "../models/file.model.js";

export const createFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    const uploadResult = await uploadFile(req.file.buffer, uuid());
    const type = req.file.mimetype.startsWith("image") ? "image" : "pdf";
    const createdFile = await FileModel.create({
      owner: req.user._id,
      fileName: uploadResult.name,
      fileType: type,
      fileUrl: uploadResult.url,
    });
    const file = await FileModel.findById(createdFile._id).populate(
      "owner",
      "fullName email"
    );
    res.status(201).json({ success: true, file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// all items files for adimn
export const getAllFiles = async (req, res) => {
  try {
    const files = await FileModel.find({})
      .populate("owner", "fullName email");

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({
      message: "getAllFiles error: " + error.message,
    });
  }
};

// files which is uploaded by particular user

export const getUserFiles = async (req, res) => {
  try {
    // const {ownerId} = req.params;
    const files = await FileModel.find({ owner: req.user._id });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete file by id
export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Find the file first
    const file = await FileModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Check ownership or admin
    // Assuming req.user for normal users, req.admin for admin
    if (
      (!req.user || file.owner.toString() !== req.user._id.toString()) &&
      !req.admin
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this file" });
    }

    await FileModel.findByIdAndDelete(fileId);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
