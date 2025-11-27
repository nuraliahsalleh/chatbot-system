// import React from "react";

// export default function ReportFeedbacks() {
//   const chats = JSON.parse(localStorage.getItem("public_chats")) || [];

//   const feedbacks = chats
//     .filter((c) => c.feedback)
//     .map((c) => ({
//       date: c.feedback.date,
//       userName: c.userName,
//       message: c.feedback.message,
//       category: c.feedback.category,
//       rating: c.feedback.rating,
//       file: c.feedback.fileName || null,
//     }));

//   // ============================
//   // 📊 KLASIFIKASI FEEDBACK
//   // ============================
//   let positive = 0;
//   let neutral = 0;
//   let negative = 0;

//   feedbacks.forEach((f) => {
//     if (f.rating <= 2) negative++;
//     else if (f.rating === 3) neutral++;
//     else positive++;
//   });

//   const total = positive + neutral + negative;

//   const percentPos = total ? Math.round((positive / total) * 100) : 0;
//   const percentNeu = total ? Math.round((neutral / total) * 100) : 0;
//   const percentNeg = total ? Math.round((negative / total) * 100) : 0;

//   // Pie chart arc sizes
//   const c = 42;         // radius
//   const circumference = 2 * Math.PI * c;

//   const arcPos = (percentPos / 100) * circumference;
//   const arcNeu = (percentNeu / 100) * circumference;
//   const arcNeg = (percentNeg / 100) * circumference;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-2">Laporan Maklum Balas</h2>
//       <p className="text-gray-600 mb-6">Senarai maklum balas pengguna awam.</p>

//       {/* TABLE */}
//       <div className="bg-white p-4 rounded shadow overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b bg-gray-100">
//               <th className="p-3">Tarikh</th>
//               <th className="p-3">Nama Pengguna</th>
//               <th className="p-3">Butiran Respons</th>
//               <th className="p-3">Jenis</th>
//               <th className="p-3">Skor Kepuasan</th>
//               <th className="p-3">Lampiran</th>
//             </tr>
//           </thead>

//           <tbody>
//             {feedbacks.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   Tiada maklum balas ditemui.
//                 </td>
//               </tr>
//             )}

//             {feedbacks.map((f, i) => (
//               <tr key={i} className="border-b">
//                 <td className="p-3">{new Date(f.date).toLocaleDateString("ms-MY")}</td>
//                 <td className="p-3">{f.userName}</td>
//                 <td className="p-3">{f.message}</td>
//                 <td className="p-3">{f.category}</td>
//                 <td className="p-3">
//                   {"★".repeat(f.rating)}
//                   <span className="text-gray-300">
//                     {"★".repeat(5 - f.rating)}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   {f.file ? (
//                     <span className="text-blue-600 underline cursor-pointer">
//                       {f.file}
//                     </span>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* SUMMARY CARDS + PIE CHART */}
//       <div className="grid grid-cols-3 gap-4 mt-8">
        
//         {/* Purata Skor */}
//         <div className="p-4 bg-white rounded shadow">
//           <div className="text-gray-500 text-sm">Purata Skor Kepuasan</div>
//           <div className="text-2xl font-bold">
//             {feedbacks.length > 0
//               ? (
//                   feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length
//                 ).toFixed(1)
//               : "-"}
//           </div>
//         </div>

//         {/* Jumlah */}
//         <div className="p-4 bg-white rounded shadow">
//           <div className="text-gray-500 text-sm">Jumlah Maklum Balas</div>
//           <div className="text-2xl font-bold">{feedbacks.length}</div>
//         </div>

//         {/* PIE CHART */}
//         <div className="p-4 bg-white rounded shadow flex gap-4 items-center">
//           <div>
//             <svg width="120" height="120">
//               <circle
//                 r={c}
//                 cx="60"
//                 cy="60"
//                 fill="transparent"
//                 stroke="#d1d5db"
//                 strokeWidth="20"
//               />

//               {/* POSITIF */}
//               <circle
//                 r={c}
//                 cx="60"
//                 cy="60"
//                 fill="transparent"
//                 stroke="#4b5563"
//                 strokeWidth="20"
//                 strokeDasharray={`${arcPos} ${circumference}`}
//                 strokeDashoffset={0}
//               />

//               {/* NEUTRAL */}
//               <circle
//                 r={c}
//                 cx="60"
//                 cy="60"
//                 fill="transparent"
//                 stroke="#9ca3af"
//                 strokeWidth="20"
//                 strokeDasharray={`${arcNeu} ${circumference}`}
//                 strokeDashoffset={-arcPos}
//               />

//               {/* NEGATIF */}
//               <circle
//                 r={c}
//                 cx="60"
//                 cy="60"
//                 fill="transparent"
//                 stroke="#6b7280"
//                 strokeWidth="20"
//                 strokeDasharray={`${arcNeg} ${circumference}`}
//                 strokeDashoffset={-(arcPos + arcNeu)}
//               />
//             </svg>
//           </div>

//           <div className="text-sm">
//             <div><span className="inline-block w-3 h-3 bg-gray-700 mr-2"></span> Positif ({percentPos}%)</div>
//             <div><span className="inline-block w-3 h-3 bg-gray-400 mr-2"></span> Neutral ({percentNeu}%)</div>
//             <div><span className="inline-block w-3 h-3 bg-gray-500 mr-2"></span> Negatif ({percentNeg}%)</div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import React from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useAgency } from "../../contexts/AgencyContext";

export default function ReportFeedbacks() {
  const { chats, users } = usePublicUsers();
  const { currentAgency } = useAgency();

  // ============================
  // 🔥 FILTER FEEDBACK IKUT AGENSI LOGIN
  // ============================
  const agencyFeedbacks = chats
    .filter((c) => c.feedback && c.agencyId === currentAgency?.id)
    .map((c) => ({
      date: c.feedback.date,
      userName: users.find((u) => u.id === c.userId)?.name || "Pengguna",
      message: c.feedback.message,
      category: c.feedback.category,
      rating: c.feedback.rating,
      file: c.feedback.fileName || null,
    }));

  // ============================
  // 📊 KLASIFIKASI FEEDBACK
  // ============================
  let positive = 0;
  let neutral = 0;
  let negative = 0;

  agencyFeedbacks.forEach((f) => {
    if (f.rating <= 2) negative++;
    else if (f.rating === 3) neutral++;
    else positive++;
  });

  const total = positive + neutral + negative;

  const percentPos = total ? Math.round((positive / total) * 100) : 0;
  const percentNeu = total ? Math.round((neutral / total) * 100) : 0;
  const percentNeg = total ? Math.round((negative / total) * 100) : 0;

  const c = 42;
  const circumference = 2 * Math.PI * c;

  const arcPos = (percentPos / 100) * circumference;
  const arcNeu = (percentNeu / 100) * circumference;
  const arcNeg = (percentNeg / 100) * circumference;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Laporan Maklum Balas</h2>
      <p className="text-gray-600 mb-6">Senarai maklum balas pengguna awam.</p>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">Tarikh</th>
              <th className="p-3">Nama Pengguna</th>
              <th className="p-3">Butiran Respons</th>
              <th className="p-3">Jenis</th>
              <th className="p-3">Skor Kepuasan</th>
              <th className="p-3">Lampiran</th>
            </tr>
          </thead>

          <tbody>
            {agencyFeedbacks.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Tiada maklum balas untuk agensi anda.
                </td>
              </tr>
            )}

            {agencyFeedbacks.map((f, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{new Date(f.date).toLocaleDateString("ms-MY")}</td>
                <td className="p-3">{f.userName}</td>
                <td className="p-3">{f.message}</td>
                <td className="p-3">{f.category}</td>
                <td className="p-3">
                  {"★".repeat(f.rating)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - f.rating)}
                  </span>
                </td>
                <td className="p-3">
                  {f.file ? (
                    <span className="text-blue-600 underline cursor-pointer">
                      {f.file}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUMMARY CARDS + PIE CHART */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Purata Skor Kepuasan</div>
          <div className="text-2xl font-bold">
            {agencyFeedbacks.length > 0
              ? (
                  agencyFeedbacks.reduce((a, b) => a + b.rating, 0) /
                  agencyFeedbacks.length
                ).toFixed(1)
              : "-"}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Jumlah Maklum Balas</div>
          <div className="text-2xl font-bold">{agencyFeedbacks.length}</div>
        </div>

        <div className="p-4 bg-white rounded shadow flex gap-4 items-center">
          <div>
            <svg width="120" height="120">
              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#d1d5db"
                strokeWidth="20"
              />

              {/* POSITIF */}
              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#4b5563"
                strokeWidth="20"
                strokeDasharray={`${arcPos} ${circumference}`}
                strokeDashoffset={0}
              />

              {/* NEUTRAL */}
              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#9ca3af"
                strokeWidth="20"
                strokeDasharray={`${arcNeu} ${circumference}`}
                strokeDashoffset={-arcPos}
              />

              {/* NEGATIF */}
              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#6b7280"
                strokeWidth="20"
                strokeDasharray={`${arcNeg} ${circumference}`}
                strokeDashoffset={-(arcPos + arcNeu)}
              />
            </svg>
          </div>

          <div className="text-sm">
            <div><span className="inline-block w-3 h-3 bg-gray-700 mr-2"></span> Positif ({percentPos}%)</div>
            <div><span className="inline-block w-3 h-3 bg-gray-400 mr-2"></span> Neutral ({percentNeu}%)</div>
            <div><span className="inline-block w-3 h-3 bg-gray-500 mr-2"></span> Negatif ({percentNeg}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
