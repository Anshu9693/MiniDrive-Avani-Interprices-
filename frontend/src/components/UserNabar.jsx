import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserNavbar = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <nav className="w-full  bg-gradient-to-br from-slate-900 via-gray-60 to-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link
        to="/user/dashboard"
        className="text-2xl font-bold text-white tracking-wide"
      >
        Mini<span className="text-indigo-400">Drive</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/user/dashboard"
          className="text-gray-300 hover:text-white transition"
        >
          Dashboard
        </Link>

        <Link
          to="/user/upload"
          className="text-gray-300 hover:text-white transition"
        >
          Upload
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
