
import {useNavigate}  from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-10 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Mini Drive
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Secure • Simple • Smart file management
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          
          {/* User Button */}
          <button
            onClick={() => navigate("/user/login")}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>
            Continue as User
          </button>

          {/* Admin Button */}
          <button
            onClick={() => navigate("/admin/login")}    
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>
            Continue as Admin
          </button>

        </div>  

        {/* Footer Text */}
        <p className="mt-10 text-sm text-gray-400">
          © {new Date().getFullYear()} Mini Drive • All rights reserved
        </p>
      </div>
    </div>
  );
};

export default HomePage;
