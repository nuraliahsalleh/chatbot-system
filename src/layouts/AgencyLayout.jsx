
// import React from "react";
// import { Outlet, Link } from "react-router-dom";
// import { useAgency } from "../contexts/AgencyContext"; // <-- path betul

// export default function AgencyLayout() {
//   const { currentAgency } = useAgency();

//   return (
//     <div className="min-h-screen flex">
//       <aside className="w-64 p-5 bg-white border-r">
//         <div className="mb-4 font-bold text-lg">SF-C360 Agency</div>

//         <nav className="space-y-2 text-sm">
//           <Link
//             to="/agency/dashboard"
//             className="block py-2 px-3 rounded hover:bg-gray-100"
//           >
//             Dashboard
//           </Link>

//           <Link
//             to="/agency/settings"
//             className="block py-2 px-3 rounded hover:bg-gray-100"
//           >
//             Tetapan Chatbot
//           </Link>

//           <Link
//             to="/agency/faq-categories"
//             className="block py-2 px-3 rounded hover:bg-gray-100"
//           >
//             FAQ
//           </Link>

//           <Link
//             to="/agency/reports"
//             className="block py-2 px-3 rounded hover:bg-gray-100"
//           >
//             Laporan
//           </Link>
//         </nav>
//       </aside>

//       <div className="flex-1 p-6">
//         <header className="flex justify-between items-center mb-6">
//           <h1 className="text-lg font-semibold">Agency Panel</h1>

//           {/* ------------ DISPLAY AGENCY NAME + CODE HERE ----------- */}
//           <div className="text-sm text-gray-700 font-medium">
//             {currentAgency
//               ? `Signed in as ${currentAgency.name} (${currentAgency.code})`
//               : "Signed in as Pegawai"}
//           </div>
//           {/* -------------------------------------------------------- */}
//         </header>

//         <main>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAgency } from "../contexts/AgencyContext";

export default function AgencyLayout() {
  const { currentAgency, logoutAgency } = useAgency(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    // --- Confirmation Popup ---
    const confirmLogout = window.confirm(
      "Adakah anda pasti mahu log keluar dari sistem?"
    );
    if (!confirmLogout) return;
    // ---------------------------

    logoutAgency(); // clear session agency
    navigate("/agency-login"); // redirect ke login agency
  };


  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-5 bg-white border-r">
        <div className="mb-4 font-bold text-lg">SF-C360 Agency</div>

        <nav className="space-y-2 text-sm">
          <Link
            to="/agency/dashboard"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            to="/agency/settings"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            Tetapan Chatbot
          </Link>

          <Link
            to="/agency/faq-categories"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            FAQ
          </Link>

          <Link
            to="/agency/reports"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            Laporan
          </Link>
        </nav>
      </aside>

      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">Agency Panel</h1>

          {/* AGENCY INFO + LOGOUT BUTTON */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700 font-medium">
              {currentAgency
                ? `Signed in as ${currentAgency.name} (${currentAgency.code})`
                : "Signed in as Pegawai"}
            </div>

            {/* ===== Logout Button (Same Style as Admin) ===== */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm"
              title="Log Keluar"
            >
              {/* Icon */}
              <span className="text-red-600 text-lg leading-none">↩</span>

              {/* Text */}
              <span className="text-gray-700">Log Keluar</span>
            </button>
            {/* ---------------------------------------------------------- */}
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
