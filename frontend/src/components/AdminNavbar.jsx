import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth (cookie-based logout API optional)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/logout`, {}, { withCredentials: true })
      .catch((error) => {
        console.log("Admin logout error:", error);
      });
    navigate("/admin/login");
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-br from-slate-900 via-gray-60 to-black/70  border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 text-white font-bold text-xl"
        >
          <FaUserShield className="text-indigo-500" />
          Admin Panel
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/admin/dashboard"
            className="text-gray-300 hover:text-white transition"
          >
            Dashboard
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm font-semibold transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
