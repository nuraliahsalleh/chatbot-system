import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function AdminLayout() {
  const navigate = useNavigate();

  // Function Logout
  const handleLogout = () => {

    // === Confirmation popup ditambah ===
    const confirmLogout = window.confirm(
      "Adakah anda pasti mahu log keluar dari sistem?"
    );

    if (!confirmLogout) return; // Jika tekan cancel, berhenti di sini
    // ==================================

    localStorage.removeItem("admin_logged_in"); // padam session
    navigate("/admin/login"); // redirect ke login semula
  };

  return (
    <div className="min-h-screen flex">
      
      {/* ========== SIDEBAR ========== */}
      <aside className="w-72 p-6 bg-white border-r">
        <div className="mb-6">
          <img src="/src/assets/logo.svg" alt="logo" className="w-36" />
          <div className="font-bold text-lg mt-2">SF-C360 Admin</div>
        </div>

        <nav className="space-y-2 text-sm">
          <Link to="/admin/dashboard" className="block py-2 px-3 rounded hover:bg-gray-100">
            Dashboard
          </Link>
          <Link to="/admin/agencies" className="block py-2 px-3 rounded hover:bg-gray-100">
            Pengurusan Agensi
          </Link>
          <Link to="/admin/users" className="block py-2 px-3 rounded hover:bg-gray-100">
            Pengurusan Pengguna
          </Link>
        </nav>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 p-6">

        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          
          <h1 className="text-xl font-semibold">Admin Panel</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Signed in as Admin</span>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition text-sm"
              title="Log Keluar"
            >
              {/* Icon */}
              <span className="text-red-600 text-lg leading-none">↩</span>

              {/* Text */}
              <span className="text-gray-700">Log Keluar</span>
            </button>
          </div>

        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
