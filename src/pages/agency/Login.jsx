// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function AgencyLogin() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center mb-2">Log Masuk</h2>
//         <p className="text-center text-gray-600 mb-6">
//           Masukkan maklumat agensi anda untuk log masuk
//         </p>

//         {/* Tabs */}
//         <div className="flex w-full mb-6">
//           <button
//             className="w-1/2 py-2 font-medium rounded-l-lg bg-gray-200 hover:bg-gray-300"
//             onClick={() => navigate("/public/login")}
//           >
//             Pengguna Awam
//           </button>

//           <button
//             className="w-1/2 py-2 font-medium rounded-r-lg bg-black text-white"
//           >
//             Agensi Kerajaan
//           </button>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               className="w-full border rounded-lg px-3 py-2 bg-gray-50"
//               placeholder="example@gmail.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Kata Laluan <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="password"
//               className="w-full border rounded-lg px-3 py-2 bg-gray-50"
//               placeholder="•••••••"
//             />
//           </div>

//           <div className="flex justify-between items-center text-sm">
//             <div className="flex items-center gap-2">
//               <input type="checkbox" />
//               <span>Reminder for 30 days</span>
//             </div>

//             <button className="text-blue-600 hover:underline">
//               Forgot Password
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             className="w-full bg-black text-white py-2 rounded-lg font-semibold"
//             onClick={() => navigate("/agency/dashboard")}
//           >
//             Log Masuk
//           </button>

//           {/* Register link */}
//           <div className="text-center text-sm mt-2">
//             Tidak mempunyai sebarang akaun?{" "}
//             <button
//               onClick={() => navigate("/agency/register")}
//               className="text-blue-600 font-semibold hover:underline"
//             >
//               Daftar di sini
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/agency/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";

export default function AgencyLogin() {
  const navigate = useNavigate();
  const { loginAgency } = useAgency();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const result = loginAgency(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    navigate("/agency/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-2">Log Masuk</h2>
        <p className="text-center text-gray-600 mb-6">
          Masukkan maklumat agensi anda untuk log masuk
        </p>

        {/* Tabs */}
        <div className="flex w-full mb-6">
          <button
            className="w-1/2 py-2 font-medium rounded-l-lg bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate("/public/login")}
          >
            Pengguna Awam
          </button>

          <button className="w-1/2 py-2 font-medium rounded-r-lg bg-black text-white">
            Agensi Kerajaan
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="cth: jpn@gov.my"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kata Laluan</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
            onClick={handleLogin}
          >
            Log Masuk
          </button>

          {/* Register link */}
          <div className="text-center text-sm mt-2">
            Tidak mempunyai akaun?{" "}
            <button
              onClick={() => navigate("/agency/register")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Daftar di sini
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
