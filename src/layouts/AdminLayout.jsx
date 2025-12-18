import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";
import companyLogo from "../assets/logoctsb2.png";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [animatePage, setAnimatePage] = useState(false);

  useEffect(() => {
    setAnimatePage(false);
    const timeout = setTimeout(() => setAnimatePage(true), 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const handleLogout = () => {
    if (!window.confirm("Adakah anda pasti mahu log keluar dari sistem?")) return;
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-[#F4F6FA] overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className="w-72 bg-[#2C3E50] text-white shadow-xl p-6 flex flex-col
        transition-all duration-500 ease-out"
      >
        {/* LOGO */}
        <div className="mb-10 flex justify-center animate-fade-in">
          <img
            src={companyLogo}
            alt="Logo"
            className="h-16 object-contain drop-shadow-lg"
          />
        </div>

        {/* MENU */}
        <nav className="space-y-3 text-base font-medium">
          {[
            { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
            { path: "/admin/agencies", label: "Pengurusan Agensi", icon: <FaBuilding /> },
            { path: "/admin/users", label: "Pengurusan Pengguna", icon: <FaUsers /> },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${isActive(item.path)
                  ? "bg-[#F4B026] text-white shadow-md scale-[1.02]"
                  : "hover:bg-[#3B4F63] hover:translate-x-1"//
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header
          className="sticky top-0 bg-[#2C3E50] text-white shadow-md px-6 py-4 
          flex justify-between items-center z-20 transition-all duration-300"
        >
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin
          </h1>

          <div className="flex items-center gap-4">

            <span className="text-sm text-gray-200">
              Signed in as <span className="font-semibold text-white">Admin</span>
            </span>

            {/* logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 rounded-full 
                border border-gray-300 bg-[#2C3E50]
                hover:bg-red-100 hover:border-red-400 hover:text-red-600
                transition-all duration-300 hover:scale-110 active:scale-90 shadow-md"
              title="Log Keluar"
            >
              <FaSignOutAlt className="text-lg" />
            </button>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main
          className={`p-8 transform transition-all duration-500 
            ${animatePage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
