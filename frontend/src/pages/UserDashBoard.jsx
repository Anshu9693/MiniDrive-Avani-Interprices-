import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import UserNavbar from "../components/UserNabar";

const UserDashBoard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/files/peruser`, {
        withCredentials: true,
      });
      setFiles(res.data.files || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/files/user/${fileId}`, {
        withCredentials: true,
      });
      setFiles(files.filter((file) => file._id !== fileId));
    } catch (error) {
      alert("Failed to delete file");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Your Files</h1>

        {/* Loading */}
        {loading && <p className="text-gray-400">Loading files...</p>}

        {/* Empty */}
        {!loading && files.length === 0 && (
          <p className="text-gray-400">You haven't uploaded any files yet.</p>
        )}

        {/* Files Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {files.map((file) => (
            <div
              key={file._id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-all cursor-pointer"
              onClick={() => setSelectedFile(file)}
            >
              {/* Preview */}
              <div className="h-40 flex items-center justify-center bg-black/30">
                {file.fileType === "image" ? (
                  <img
                    src={file.fileUrl}
                    alt={file.fileName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaFilePdf className="text-red-500 text-6xl" />
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm text-white truncate">{file.fileName}</p>
              </div>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(file._id);
                }}
                className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* FULL PAGE PREVIEW MODAL */}
        {selectedFile && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white text-3xl"
              onClick={() => setSelectedFile(null)}
            >
              ✕
            </button>

            {/* Preview */}
            {selectedFile.fileType === "image" ? (
              <img
                src={selectedFile.fileUrl}
                alt={selectedFile.fileName}
                className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              />
            ) : (
              <iframe
                src={selectedFile.fileUrl}
                title="PDF Preview"
                className="w-[90vw] h-[90vh] rounded-xl"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashBoard;
