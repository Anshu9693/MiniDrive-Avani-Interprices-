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
    <nav className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/user/dashboard" className="text-2xl font-bold text-white">
          Mini<span className="text-indigo-400">Drive</span>
        </Link>

        {/* Hamburger */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/user/dashboard" label="Dashboard" />
          <NavLink to="/user/upload" label="Upload" />
          <NavLink to="/user/shared-with-me" label="Shared With Me" />
          <LogoutButton onClick={handleLogout} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 pt-2">
          <MobileLink to="/user/dashboard" label="Dashboard" close={setOpen} />
          <MobileLink to="/user/upload" label="Upload" close={setOpen} />
          <MobileLink
            to="/user/shared-with-me"
            label="Shared With Me"
            close={setOpen}
          />

          <button
            onClick={handleLogout}
            className="mt-2 w-fit px-4 py-2 rounded-xl bg-red-500/80 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

/* Reusable Components */

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-gray-300 hover:text-white transition">
    {label}
  </Link>
);

const MobileLink = ({ to, label, close }) => (
  <Link
    to={to}
    className="text-gray-300 text-lg"
    onClick={() => close(false)}
  >
    {label}
  </Link>
);

const LogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition"
  >
    Logout
  </button>
);

export default UserNavbar;
