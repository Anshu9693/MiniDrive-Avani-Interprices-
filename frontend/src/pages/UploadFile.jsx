import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import UserNavbar from "../components/UserNabar";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/files/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully");
      setFile(null);
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    <UserNavbar />
    <div className="min-h-[88vh] bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
        
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 text-center">

        {/* Icon */}
        <FaCloudUploadAlt className="text-indigo-400 text-6xl mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-2">
          Upload File
        </h2>
        <p className="text-gray-400 mb-6">
          Upload images or PDFs to your Mini Drive
        </p>

        {/* Form */}
        <form onSubmit={handleUpload} className="space-y-6">

          {/* File Input */}
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-500 file:text-white
              hover:file:bg-indigo-600 transition"
          />

          {/* Selected File */}
          {file && (
            <p className="text-sm text-gray-300 truncate">
              Selected: {file.name}
            </p>
          )}

          {/* Upload Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default UploadFile;
