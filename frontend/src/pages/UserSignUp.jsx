import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserSignUp = () => {

    const navigate = useNavigate();
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);




 const handleSubmit = async (e) => {
  e.preventDefault(); 

  if (!fullName || !email || !password) {
    alert("Please fill all the fields");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
      { fullName, email, password },
      { withCredentials: true }
    );

    setLoading(false);
    alert(res.data.message || "Signup successful");
    navigate("/user/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
    console.log(error.message+"sign up anshu")
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign up to access Mini Drive
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              placeholder="John Doe"
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-indigo-500 transition"
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
            disabled={loading}
          >
           {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span className="text-indigo-400 cursor-pointer hover:underline">
          <Link to="/user/login">  Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
