import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "../../assets/logoConnect2.png";
import bg from "../../assets/bgLoginAdmin.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();

  // Save default admin account
  useEffect(() => {
    const admin = localStorage.getItem("admin_account");
    if (!admin) {
      localStorage.setItem(
        "admin_account",
        JSON.stringify({
          username: "ctsb",
          password: "ctsb360",
        })
      );
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const admin = JSON.parse(localStorage.getItem("admin_account"));

    if (!admin) {
      setError("Admin tidak wujud dalam sistem.");
      return;
    }

    if (username !== admin.username || password !== admin.password) {
      setError("Username atau Kata Laluan tidak sah!");
      return;
    }

    localStorage.setItem("admin_logged_in", "true");
    navigate("/admin/dashboard");
  };

  return (
  <div
  className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
    style={{
      backgroundImage: `
        linear-gradient(135deg, rgba(24, 202, 205, 0.55), rgba(180, 193, 255, 0.75)),
        url(${bg})
      `,
      backgroundSize: "100%",     
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >

    {/* DARK GRADIENT MASK */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

    {/* SOFT SPOTLIGHT */}
    <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),rgba(0,0,0,0.85))]">
    </div>

    {/* LOGIN CARD */}
    <div
      className="
        relative w-full max-w-md 
        bg-white/55 backdrop-blur-2xl 
        shadow-2xl rounded-2xl p-10 
        transform transition-all duration-500 
        hover:scale-[1.02]
        border border-white/20   /* transparent soft border */
      "
    >

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src={companyLogo}
          alt="Admin Logo"
          className="h-16 animate-logoFloat drop-shadow-xl"
        />
      </div>

      <h2 className="text-3xl font-bold text-center text-[#0A3D62] mb-6">
        Admin Panel
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <input
          className="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:ring-2 focus:ring-[#0A3D62] focus:outline-none transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:ring-2 focus:ring-[#0A3D62] focus:outline-none transition"
          placeholder="Kata Laluan"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-200 cursor-pointer hover:underline">
            Terlupa kata laluan?
          </div>

          <button
            onClick={handleLogin}
            className="px-6 py-2 rounded-xl text-white font-semibold shadow-md
                      transition-all bg-[#0A3D62]
                      hover:bg-[#083353] hover:shadow-lg 
                      hover:scale-105 active:scale-95"
          >
            Log Masuk
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
