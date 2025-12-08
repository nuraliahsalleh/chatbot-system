// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="max-w-2xl w-full bg-white rounded-xl shadow p-10">
        
//         {/* Title */}
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Log Masuk Admin
//         </h2>

//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
//             👤
//           </div>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">
//           <input
//             className="input-pill"
//             placeholder="Email atau Username"
//           />
          
//           <input
//             className="input-pill"
//             placeholder="Kata Laluan"
//             type="password"
//           />

//           <div className="flex justify-between items-center">
//             <div className="text-sm text-gray-600 hover:underline cursor-pointer">
//               Forgot password?
//             </div>

//             <button
//               className="btn-black"
//               onClick={() => navigate("/admin/dashboard")}
//             >
//               Log Masuk
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow p-10">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Log Masuk Admin
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
            👤
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            className="input-pill"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="input-pill"
            placeholder="Kata Laluan"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 hover:underline cursor-pointer">
              Terlupa kata laluan?
            </div>

            <button className="btn-black" onClick={handleLogin}>
              Log Masuk
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
