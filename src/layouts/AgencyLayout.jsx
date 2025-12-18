import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAgency } from "../contexts/AgencyContext";
import companyLogo from "../assets/logoctsb2.png";
import { FaSignOutAlt } from "react-icons/fa";

export default function AgencyLayout() {
  const { currentAgency, logoutAgency } = useAgency();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Adakah anda pasti mahu log keluar dari sistem?"
    );
    if (!confirmLogout) return;

    logoutAgency();
    navigate("/agency-login");
  };

  return (
    <div className="min-h-screen flex">
      
      {/* SIDEBAR */}
      <aside
        className="w-64 p-5 text-white"
        style={{ backgroundColor: "#0A3D62" }}
      >
        <div className="mb-6 flex justify-center">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-14 object-contain"
          />
        </div>

        <nav className="space-y-2 text-sm">
          <Link to="/agency/dashboard" className="block py-2 px-3 rounded hover:bg-white/20">
            Dashboard
          </Link>
          <Link to="/agency/settings" className="block py-2 px-3 rounded hover:bg-white/20">
            Tetapan Chatbot
          </Link>
          <Link to="/agency/faq-categories" className="block py-2 px-3 rounded hover:bg-white/20">
            FAQ
          </Link>
          <Link to="/agency/reports" className="block py-2 px-3 rounded hover:bg-white/20">
            Laporan
          </Link>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header
          className="
            sticky top-0 z-20
            bg-[#0A3D62] text-white
            shadow-md
            px-6 py-4
            flex justify-between items-center
          "
        >
          <h1 className="text-2xl font-semibold tracking-tight">
            Agensi
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-200">
              {currentAgency ? (
                <>
                  Signed in as{" "}
                  <span className="font-semibold text-white">
                    {currentAgency.name} ({currentAgency.code})
                  </span>
                </>
              ) : (
                "Signed in as Pegawai"
              )}
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Log Keluar"
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                border border-gray-300
                bg-[#2C3E50] text-white
                shadow-md
                transition-all duration-300
                hover:bg-red-100 hover:border-red-400 hover:text-red-600
                hover:scale-110 active:scale-95
              "
            >
              <FaSignOutAlt className="text-lg" />
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
