import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { usePublicUsers } from "../contexts/PublicUserContext";

export default function PublicLayout() {
  const { currentUser } = usePublicUsers(); // NEW — track login

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">SF-C360</div>

          <nav className="space-x-4 text-sm flex items-center">
            <Link to="/public/dashboard">Dashboard</Link>
            <Link to="/public/agencies">Agensi</Link>
            

            {!currentUser ? (
              <Link to="/public/login">Login</Link>
            ) : (
              <Link to="/public/profile">
                <FaUserCircle size={26} className="text-gray-700 hover:text-black" />
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-gray-500 p-6">
        © 2025 SF-C360
      </footer>
    </div>
  );
}
