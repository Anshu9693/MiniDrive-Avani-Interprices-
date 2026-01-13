import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import UserNavbar from "../../../components/UserNabar";

const EditFile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleReplace = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.put(
        `${BACKEND_URL}/api/files/replace/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File updated successfully");
      navigate("/user/shared-with-me");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
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
          <FaCloudUploadAlt className="text-green-400 text-6xl mx-auto mb-4" />

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-2">
            Replace File
          </h2>
          <p className="text-gray-400 mb-6">
            Upload a new version of this file
          </p>

          {/* Form */}
          <form onSubmit={handleReplace} className="space-y-6">

            {/* File Input */}
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-green-500 file:text-white
                hover:file:bg-green-600 transition"
            />

            {/* Selected File */}
            {file && (
              <p className="text-sm text-gray-300 truncate">
                Selected: {file.name}
              </p>
            )}

            {/* Replace Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Replace File"}
            </button>
          </form>

          {/* Cancel */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditFile;
