// import React, { useState } from "react";
// import { usePublicUsers } from "../../contexts/PublicUserContext";
// import { useNavigate } from "react-router-dom";
// import { FaUsers, FaBolt, FaUserPlus } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";


// export default function Users() {
//   const { users } = usePublicUsers();
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const filtered = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   const exportToExcel = () => {
//   const data = filtered.map((item) => ({
//     "Nama Pengguna": item.name,
//     "Email": item.email,
//     "Jumlah Chat": item.totalChat,
//     "Agensi": item.agencies?.join(", "),
//   }));

//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Pengguna");

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });

//   const file = new Blob([excelBuffer], {
//     type:
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//   });

//   saveAs(file, "Senarai_Pengguna.xlsx");
// };



//   return (
//     <div className="p-10 bg-[#F8F9FC] min-h-screen">

//       {/* PAGE HEADER */}
//       <div className="mb-10">
//         <h2 className="text-4xl font-bold text-[#344767] tracking-tight">
//           Pengurusan Pengguna Awam
//         </h2>

//         <p className="text-gray-500 text-xl mt-3">
//           Senarai dan maklumat pengguna sistem.
//         </p>
//       </div>

//       {/* STATISTICS */}
//       <div className="bg-white border border-gray-200 p-6 shadow-sm mb-8">

//         <h3 className="text-2xl font-semibold text-[#344767] mb-4">
//           Statistik Pengguna
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//           {/* Jumlah Pengguna */}
//           <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-base">Jumlah Pengguna Berdaftar</p>
//               <p className="text-3xl font-bold text-[#344767] mt-1">{users.length}</p>
//             </div>

//             <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
//               <FaUsers size={26} />
//             </div>
//           </div>

//           {/* Pengguna Aktif */}
//           <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-base">Pengguna Aktif</p>
//               <p className="text-3xl font-bold text-[#344767] mt-1">
//                 {Math.floor(users.length * 0.6)}
//               </p>
//             </div>

//             <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
//               <FaBolt size={26} />
//             </div>
//           </div>

//           {/* Pengguna Baru Tahun Ini */}
//           <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-base">Pengguna Baru Tahun Ini</p>
//               <p className="text-3xl font-bold text-[#344767] mt-1">
//                 {Math.floor(users.length * 0.3)}
//               </p>
//             </div>

//             <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
//               <FaUserPlus size={26} />
//             </div>
//           </div>

//         </div>
//       </div>


//       {/* TABLE HEADER */}
//       <div className="bg-white border border-gray-200 p-6 shadow-sm mb-4">

//         <div className="flex flex-wrap items-center justify-between gap-4">

//           <h3 className="text-2xl font-semibold text-[#344767]">
//             Senarai Pengguna Awam
//           </h3>

//           {/* TOOLS BAR */}
//           <div className="flex items-center gap-4 flex-wrap">

//             {/* Amount dropdown */}
//             <div className="flex items-center gap-3 text-base">
//               <span>Jumlah</span>
//               <select className="border border-gray-300 px-3 py-1 bg-white text-base">
//                 <option>150</option>
//                 <option>100</option>
//                 <option>50</option>
//               </select>
//             </div>

//             {/* Excel Export */}
//             <button
//               className="px-4 py-2 bg-gray-100 border border-gray-300 text-base hover:bg-gray-200 transition"
//               onClick={exportToExcel}
//             >
//               Excel
//             </button>


//             {/* SEARCH BOX */}
//             <div className="flex items-center gap-2 text-base">
//               <span>Search:</span>
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="border border-gray-300 px-3 py-1 bg-white text-base"
//                 placeholder="Cari pengguna..."
//               />
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white border border-gray-200 shadow-sm p-6">

//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-base">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="py-3 px-3 font-semibold text-[#344767]">Nama Pengguna</th>
//                 <th className="py-3 px-3 font-semibold text-[#344767]">Email</th>
//                 <th className="py-3 px-3 font-semibold text-[#344767]">Jumlah Chat</th>
//                 <th className="py-3 px-3 font-semibold text-[#344767]">Agensi</th>
//                 <th className="py-3 px-3 font-semibold text-[#344767]">Tindakan</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="py-8 text-center text-gray-500 italic text-lg"
//                   >
//                     Tiada pengguna dijumpai.
//                   </td>
//                 </tr>
//               )}

//               {filtered.map((u) => (
//                 <tr key={u.id} className="border-b hover:bg-gray-50 transition">
//                   <td className="py-3 px-3">{u.name}</td>

//                   <td className="py-3 px-3 text-blue-600 underline cursor-pointer">
//                     {u.email}
//                   </td>

//                   <td className="py-3 px-3">{u.totalChat}</td>

//                   <td className="py-3 px-3">{u.agencies.join(", ")}</td>

//                   <td className="py-3 px-3">
//                     <button
//                       className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 transition text-base rounded"
//                       onClick={() => navigate(`/admin/users/view/${u.id}`)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//             </tbody>
//           </table>
//         </div>

//       </div>

//       {/* FOOTER COUNT */}
//       <div className="mt-3 text-right text-sm text-gray-600">
//         Paparan: 1–{filtered.length} daripada {users.length}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBolt, FaUserPlus, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Users() {
  const { users } = usePublicUsers();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* -----------------------------------------
     EXPORT TO EXCEL — FIXED
  ----------------------------------------- */
  const exportToExcel = () => {
    const data = filtered.map((item) => ({
      "Nama Pengguna": item.name,
      "Email": item.email,
      "Jumlah Chat": item.totalChat,
      "Agensi": Array.isArray(item.agencies)
        ? item.agencies.join(", ")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pengguna");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "Senarai_Pengguna.xlsx");
  };

  return (
    <div className="p-10 bg-[#F8F9FC] min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#344767] tracking-tight">
          Pengurusan Pengguna Awam
        </h2>

        <p className="text-gray-500 text-xl mt-3">
          Senarai dan maklumat pengguna sistem.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="bg-white border border-gray-200 p-6 shadow-sm mb-8">

        <h3 className="text-2xl font-semibold text-[#344767] mb-4">
          Statistik Pengguna
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Jumlah Pengguna */}
          <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-base">Jumlah Pengguna Berdaftar</p>
              <p className="text-3xl font-bold text-[#344767] mt-1">{users.length}</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
              <FaUsers size={26} />
            </div>
          </div>

          {/* Pengguna Aktif */}
          <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-base">Pengguna Aktif</p>
              <p className="text-3xl font-bold text-[#344767] mt-1">
                {Math.floor(users.length * 0.6)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
              <FaBolt size={26} />
            </div>
          </div>

          {/* Pengguna Baru Tahun Ini */}
          <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-base">Pengguna Baru Tahun Ini</p>
              <p className="text-3xl font-bold text-[#344767] mt-1">
                {Math.floor(users.length * 0.3)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
              <FaUserPlus size={26} />
            </div>
          </div>

        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="bg-white border border-gray-200 p-6 shadow-sm mb-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <h3 className="text-2xl font-semibold text-[#344767]">
            Senarai Pengguna Awam
          </h3>

          {/* TOOLS BAR */}
          <div className="flex items-center gap-4 flex-wrap">

            {/* Amount dropdown */}
            <div className="flex items-center gap-3 text-base">
              <span>Jumlah</span>
              <select className="border border-gray-300 px-3 py-1 bg-white text-base">
                <option>150</option>
                <option>100</option>
                <option>50</option>
              </select>
            </div>

            {/* Excel Export */}
            <button
              className="px-4 py-2 bg-gray-100 border border-gray-300 text-base hover:bg-gray-200 transition"
              onClick={exportToExcel}
            >
              Excel
            </button>

            {/* SEARCH BOX */}
            <div className="flex items-center gap-2 text-base">
              <span>Search:</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-white text-base"
                placeholder="Cari pengguna..."
              />
            </div>

          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 shadow-sm p-6">

        <div className="overflow-x-auto">
          <table className="w-full text-left text-base">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-3 font-semibold text-[#344767]">Nama Pengguna</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Email</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Jumlah Chat</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Agensi</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Tindakan</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-8 text-center text-gray-500 italic text-lg"
                  >
                    Tiada pengguna dijumpai.
                  </td>
                </tr>
              )}

              {filtered.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition">

                  <td className="py-3 px-3">{u.name}</td>

                  <td className="py-3 px-3 text-blue-600 underline cursor-pointer">
                    {u.email}
                  </td>

                  <td className="py-3 px-3">{u.totalChat}</td>

                  <td className="py-3 px-3">
                    {Array.isArray(u.agencies) && u.agencies.length > 0
                      ? u.agencies.join(", ")
                      : "—"}
                  </td>

                  <td className="py-3 px-3">
                  <button
                    className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 transition text-base rounded flex items-center gap-2"
                    onClick={() => navigate(`/admin/users/view/${u.id}`)}
                  >
                    <FaEye className="text-[#344767]" />
                    View
                  </button>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>

      {/* FOOTER COUNT */}
      <div className="mt-3 text-right text-sm text-gray-600">
        Paparan: 1–{filtered.length} daripada {users.length}
      </div>

    </div>
  );
}
