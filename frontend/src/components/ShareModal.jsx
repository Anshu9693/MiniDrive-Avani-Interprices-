import React, { useState } from "react";
import axios from "axios";

const ShareModal = ({ file, onClose }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleShare = async () => {
    if (!email) return alert("Enter user email");

    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/files/share/${file._id}`,
        { email, permission },
        { withCredentials: true }
      );
      alert("File shared successfully");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Share failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl text-white font-semibold mb-4">
          Share File
        </h2>

        <input
          type="email"
          placeholder="User email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white outline-none mb-4"
        />

        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white outline-none mb-6"
        >
          <option value="view">View only</option>
          <option value="edit">Edit</option>
        </select>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
