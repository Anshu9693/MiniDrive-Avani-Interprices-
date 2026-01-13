import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserNavbar = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [open, setOpen] = useState(false);

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
    <nav className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black/70 backdrop-blur-xl border-b border-white/10 px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/user/dashboard"
          className="text-2xl font-bold text-white"
        >
          Mini<span className="text-indigo-400">Drive</span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/user/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/user/upload" className="text-gray-300 hover:text-white">
            Upload
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link
            to="/user/dashboard"
            className="text-gray-300"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/user/upload"
            className="text-gray-300"
            onClick={() => setOpen(false)}
          >
            Upload
          </Link>
          <button
            onClick={handleLogout}
            className="w-fit px-4 py-2 rounded-xl bg-red-500/80 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
