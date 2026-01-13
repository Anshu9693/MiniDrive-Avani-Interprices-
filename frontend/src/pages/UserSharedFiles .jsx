import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNabar";

const UserSharedFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ FIX
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchSharedFiles = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/files/shared-with-me`,
        { withCredentials: true }
      );
      setFiles(res.data.files || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedFiles();
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">
          Shared With Me
        </h1>

        {loading && <p className="text-gray-400">Loading files...</p>}

        {!loading && files.length === 0 && (
          <p className="text-gray-400">No files shared with you.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {files.map((file) => (
            <div
              key={file._id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-all"
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
                <p className="text-sm text-white truncate">
                  {file.fileName}
                </p>

                <p className="text-xs text-gray-400 truncate">
                  Shared by: {file.owner?.fullName || file.owner?.email}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      navigate(`/user/file/view/${file._id}`)
                    }
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs"
                  >
                    <FaEye /> View
                  </button>

                  {file.permission === "edit" && (
                    <button
                      onClick={() =>
                        navigate(`/user/file/edit/${file._id}`)
                      }
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSharedFiles;
