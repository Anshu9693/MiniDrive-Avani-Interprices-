import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      setLoading(false);
      alert(res.data.message || "Login successful");
      navigate("/user/dashboard"); // change route if needed
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Login failed");
      console.log("login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Login to your Mini Drive account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span className="text-indigo-400 cursor-pointer hover:underline">
            <Link to="/user/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
