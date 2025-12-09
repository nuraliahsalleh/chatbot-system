import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { usePublicUsers } from "../contexts/PublicUserContext";
import companyLogo from "../assets/logoctsb2.png";
import logoConnect2 from "../assets/logoConnect2.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";



export default function PublicLayout() {
  const { currentUser, logout } = usePublicUsers();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Adakah anda pasti mahu log keluar?");
    if (!confirmLogout) return;

    logout();
    navigate("/public/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header
        className="p-4 shadow"
        style={{ backgroundColor: "#0A3D62" }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-10 object-contain"
          />

          {/* NAVIGATION + PROFILE + LOGOUT */}
          <div className="flex items-center gap-6 text-white">

            <Link
              to="/public/dashboard"
              className="font-medium hover:text-gray-300 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/public/agencies"
              className="font-medium hover:text-gray-300 transition"
            >
              Agensi
            </Link>

            {!currentUser ? (
              <Link
                to="/public/login"
                className="font-medium hover:text-gray-300 transition"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">

                {/* PROFILE ICON */}
                <Link to="/public/profile">
                  <FaUserCircle
                    size={28}
                    className="text-white hover:text-gray-300 transition"
                  />
                </Link>

                {/* LOGOUT BUTTON — white background, red icon remains */}
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 transition"
                  title="Log Keluar"
                >
                  <FaSignOutAlt size={22} />
                </button>


              </div>
            )}
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <div className="mt-6 flex justify-center">
        <img
          src={logoConnect2}
          alt="Footer Logo"
          className="h-100 opacity-80 object-contain"
        />
      </div>

    </div>
  );
}
