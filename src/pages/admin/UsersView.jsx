// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { usePublicUsers } from "../../contexts/PublicUserContext";

// export default function UsersView() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { users } = usePublicUsers();

//   const user = users.find((u) => u.id === id);

//   if (!user) {
//     return (
//       <div className="p-6">
//         <p>User tidak dijumpai.</p>
//         <button className="mt-4 px-4 py-2 bg-gray-200 rounded" onClick={() => navigate(-1)}>
//           Kembali
//         </button>
//       </div>
//     );
//   }

//   // Fake chat records
//   const chatRecords = [
//     { date: "05/10/2025", agency: "JPN", service: "Permohonan MyKad", status: "Selesai", color: "text-blue-600" },
//     { date: "18/10/2025", agency: "LHDN", service: "Pemfailan Cukai", status: "Aktif", color: "text-green-600" },
//     { date: "06/12/2026", agency: "JKR", service: "Isu Jalan Raya", status: "Menunggu", color: "text-orange-500" },
//     { date: "28/08/2026", agency: "KKM", service: "Maklumat hospital", status: "Menunggu", color: "text-orange-500" }
//   ];

//   return (
//     <div className="p-6">

//       <h2 className="text-2xl font-bold">Pengurusan Pengguna Awam</h2>
//       <p className="text-gray-500 mb-6">Dashboard &gt; Pengurusan Pengguna Awam &gt; View</p>

//       <div className="grid grid-cols-2 gap-6">

//         {/* LEFT CARD */}
//         <div className="p-5 bg-white shadow rounded border">
//           <h3 className="font-semibold text-lg mb-4">Butiran Maklumat Asas Pengguna Awam</h3>

//           <p className="text-sm font-semibold mt-2">Nama Penuh</p>
//           <p>{user.name}</p>

//           <p className="text-sm font-semibold mt-2">No. Kad Pengenalan</p>
//           <p>{user.ic}</p>

//           <p className="text-sm font-semibold mt-2">Email</p>
//           <p>{user.email}</p>

//           <p className="text-sm font-semibold mt-2">No. Telefon</p>
//           <p>{user.phone}</p>

//           <p className="text-sm font-semibold mt-2">Status Akaun</p>
//           <p className="text-green-600">Aktif</p>

//           <p className="text-sm font-semibold mt-2">Tarikh Daftar</p>
//           <p>{new Date(user.createdAt).toLocaleDateString("ms-MY")}</p>
//         </div>

//         {/* RIGHT CARD */}
//         <div className="p-5 bg-white shadow rounded border">
//           <h3 className="font-semibold text-lg mb-4">Rekod Chat Terkini</h3>

//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="p-2">Tarikh</th>
//                 <th className="p-2">Agensi</th>
//                 <th className="p-2">Perkhidmatan</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {chatRecords.map((r, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="p-2">{r.date}</td>
//                   <td className="p-2">{r.agency}</td>
//                   <td className="p-2">{r.service}</td>
//                   <td className={`p-2 font-semibold ${r.color}`}>{r.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/admin/UsersView.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function UsersView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, chats } = usePublicUsers();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-lg text-red-600">Pengguna tidak dijumpai.</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
      </div>
    );
  }

  // Rekod chat sebenar berdasarkan ID pengguna
  const userChats = chats
    .filter((c) => c.userId === user.id)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    function translateStatus(status) {
        switch (status) {
          case "active":
            return "Aktif";
          case "pending":
            return "Menunggu";
          case "done":
            return "Selesai";
          default:
            return status;
        }
      }

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold">Pengurusan Pengguna Awam</h2>
      <p className="text-gray-500 mb-6">
        Dashboard &gt; Pengurusan Pengguna Awam &gt; View
      </p>

      <div className="grid grid-cols-2 gap-6">

        {/* ========== LEFT CARD ========== */}
        <div className="p-5 bg-white shadow rounded border">
          <h3 className="font-semibold text-lg mb-4">
            Butiran Maklumat Asas Pengguna Awam
          </h3>

          <p className="text-sm font-semibold mt-2">Nama Penuh</p>
          <p>{user.name}</p>

          <p className="text-sm font-semibold mt-2">No. Kad Pengenalan</p>
          <p>{user.ic}</p>

          <p className="text-sm font-semibold mt-2">Email</p>
          <p>{user.email}</p>

          <p className="text-sm font-semibold mt-2">No. Telefon</p>
          <p>{user.phone}</p>

          <p className="text-sm font-semibold mt-2">Status Akaun</p>
          <p className="text-green-600">Aktif</p>

          <p className="text-sm font-semibold mt-2">Tarikh Daftar</p>
          <p>{new Date(user.createdAt).toLocaleDateString("ms-MY")}</p>

          <button
            className="mt-6 px-4 py-2 bg-gray-300 rounded"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
        </div>

        

        {/* ========== RIGHT CARD ========== */}
        <div className="p-5 bg-white shadow rounded border">
          <h3 className="font-semibold text-lg mb-4">Rekod Chat Terkini</h3>

          {userChats.length === 0 ? (
            <p className="text-gray-500">Tiada rekod chat.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2">Tarikh</th>
                  <th className="p-2">Agensi</th>
                  <th className="p-2">Servis</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {userChats.map((chat, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">
                      {new Date(chat.updatedAt).toLocaleString("ms-MY")}
                    </td>

                    <td className="p-2">{chat.agencyName}</td>

                    <td className="p-2">{chat.serviceName || "-"}</td>

                    {/* <td
                      className={`p-2 font-semibold ${
                        chat.status === "active"
                          ? "text-green-600"
                          : chat.status === "done"
                          ? "text-blue-600"
                          : "text-orange-500"
                      }`}
                    >
                      {chat.status}
                    </td> */}
                    <td
                    className={`p-2 font-semibold ${
                      chat.status === "active"
                        ? "text-green-600"
                        : chat.status === "done"
                        ? "text-blue-600"
                        : "text-orange-500"
                    }`}
                    >
                    {translateStatus(chat.status)}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}
