
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAgency } from "../../contexts/AgencyContext";
// import { usePublicUsers } from "../../contexts/PublicUserContext";

// export default function AgencySelect() {
//   const { agencies } = useAgency();
//   const { currentUser, startChat } = usePublicUsers();
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const filtered = agencies.filter((a) => {
//     const q = query.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       (a.name || "").toLowerCase().includes(q) ||
//       (a.description || "").toLowerCase().includes(q) ||
//       (a.code || "").toLowerCase().includes(q)
//     );
//   });

//   const handleStart = (agency) => {
//     if (!currentUser) {
//       alert("Sila log masuk dahulu sebelum mula chat.");
//       navigate("/public/login");
//       return;
//     }

//     const chatId = startChat(currentUser.id, agency);
//     navigate(`/public/chat?chatId=${chatId}`);
//   };

//   return (
//     <div className="px-6 py-4 max-w-6xl mx-auto">

//       {/* Title */}
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold">Platform Chatbot — Pilih Agensi</h2>
//         <p className="text-gray-600 mt-2">
//           Dapatkan bantuan segera dari pelbagai agensi kerajaan Malaysia.
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center gap-3 mb-6">
//         <input
//           className="border px-4 py-3 rounded-lg flex-1 shadow-sm"
//           placeholder="Cari agensi atau perkhidmatan..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           className="px-5 py-3 bg-black text-white rounded-lg"
//           onClick={() => setQuery("")}
//         >
//           Reset
//         </button>
//       </div>

//       {/* Agency Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filtered.length === 0 && (
//           <div className="text-gray-500 col-span-3 text-center py-10">
//             Tiada agensi ditemui.
//           </div>
//         )}

//         {filtered.map((a) => (
//           <div
//             key={a.id}
//             className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition"
//             style={{ minHeight: "340px" }}
//           >
//             {/* Top part with logo & name */}
//             <div className="flex items-start gap-4">
//               <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex justify-center items-center">
//                 {a.logo ? (
//                   <img
//                     src={`/${a.logo}`}
//                     alt={a.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-400 text-sm">Logo</span>
//                 )}
//               </div>

//               <div className="flex-1">
//                 <div className="font-bold text-lg leading-tight">
//                   {a.name}
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">
//                   {a.description}
//                 </div>
//               </div>
//             </div>

//             {/* Perkhidmatan */}
//             <div className="mt-4">
//               <div className="text-sm font-semibold text-gray-700">
//                 Perkhidmatan :
//               </div>

//               <div className="mt-2 flex flex-wrap gap-2">
//                 {(a.services || []).map((s, i) => (
//                   <span
//                     key={i}
//                     className="text-xs px-3 py-1 bg-gray-100 border rounded-full"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* FAQ + Start Chat Button */}
//             {/* <div className="mt-5">
//               <select className="w-full border px-3 py-2 rounded-lg mb-3">
//                 <option>Soalan Lazim (FAQ)</option>
//                 <option>Waktu Operasi</option>
//                 <option>Cara Buat Permohonan</option>
//                 <option>Hubungi Kami</option>
//               </select> */}
//               {/* DROPDOWN KATEGORI FAQ */}
//                   {agencyCategories.length === 0 ? (
//                     <button
//                       className="px-3 py-1 border rounded bg-gray-50 text-gray-400 cursor-not-allowed"
//                       disabled
//                     >
//                       Soalan Lazim (Tiada)
//                     </button>
//                   ) : (
//                     <select
//                       className="px-3 py-1 border rounded bg-white text-sm hover:bg-gray-100"
//                       defaultValue=""
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (!value) return;
//                         navigate(
//                           `/public/faq?agencyId=${c.agencyId}&categoryId=${value}`
//                         );
//                       }}
//                     >
//                       <option value="">Soalan Lazim (FAQ)</option>
//                       {agencyCategories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   )}

//               <button
//                 className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black"
//                 onClick={() => handleStart(a)}
//               >
//                 Mula Chat
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer update date */}
//       <div className="mt-6 text-right text-sm text-gray-500">
//         Kemas kini: {new Date().toLocaleDateString("ms-MY")}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function AgencySelect() {
  const { agencies } = useAgency();
  const { currentUser, startChat } = usePublicUsers();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Load semua kategori FAQ
  const allCategories = JSON.parse(localStorage.getItem("faq_categories") || "[]");

  const filtered = agencies.filter((a) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (a.name || "").toLowerCase().includes(q) ||
      (a.description || "").toLowerCase().includes(q) ||
      (a.code || "").toLowerCase().includes(q)
    );
  });

  const handleStart = (agency) => {
    if (!currentUser) {
      alert("Sila log masuk dahulu sebelum mula chat.");
      navigate("/public/login");
      return;
    }
    const chatId = startChat(currentUser.id, agency);
    navigate(`/public/chat?chatId=${chatId}`);
  };

  return (
    <div className="px-6 py-4 max-w-6xl mx-auto">

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Platform Chatbot — Pilih Agensi</h2>
        <p className="text-gray-600 mt-2">
          Dapatkan bantuan segera dari pelbagai agensi kerajaan Malaysia.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <input
          className="border px-4 py-3 rounded-lg flex-1 shadow-sm"
          placeholder="Cari agensi atau perkhidmatan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-5 py-3 bg-black text-white rounded-lg"
          onClick={() => setQuery("")}
        >
          Reset
        </button>
      </div>

      {/* Agency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <div className="text-gray-500 col-span-3 text-center py-10">
            Tiada agensi ditemui.
          </div>
        )}

        {filtered.map((a) => {
          const agencyCategories = allCategories.filter(
            (cat) => cat.agencyId === a.id
          );

          return (
            <div
              key={a.id}
              className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition"
              style={{ minHeight: "340px" }}
            >
              {/* Logo + Name */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex justify-center items-center">
                  {a.logo ? (
                    <img
                      src={`/${a.logo}`}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Logo</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-bold text-lg leading-tight">{a.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{a.description}</div>
                </div>
              </div>

              {/* Perkhidmatan */}
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700">Perkhidmatan :</div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {(a.services || []).map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-100 border rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQ + Start Chat */}
              <div className="mt-5 flex flex-col gap-3">

                {/* DROPDOWN FAQ */}
                {agencyCategories.length === 0 ? (
                  <button
                    className="px-3 py-2 border rounded bg-gray-50 text-gray-400 cursor-not-allowed"
                    disabled
                  >
                    Soalan Lazim (Tiada)
                  </button>
                ) : (
                  <select
                    className="px-3 py-2 border rounded bg-white text-sm hover:bg-gray-100"
                    defaultValue=""
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) return;
                      navigate(`/public/faq?agencyId=${a.id}&categoryId=${value}`);
                    }}
                  >
                    <option value="">Soalan Lazim (FAQ)</option>
                    {agencyCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black"
                  onClick={() => handleStart(a)}
                >
                  Mula Chat
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-right text-sm text-gray-500">
        Kemas kini: {new Date().toLocaleDateString("ms-MY")}
      </div>
    </div>
  );
}
