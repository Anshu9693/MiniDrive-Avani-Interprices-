import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Admin" if admins can upload files too
    // required: true,
  },
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  fileType: {
    type: String,
    enum: ["image", "pdf"],
    // required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  sharedWith: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      permissions: { type: String, enum: ["view", "edit"], default: "view" },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
