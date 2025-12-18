import React from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useAgency } from "../../contexts/AgencyContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ReportFeedbacks() {
  const { chats, users } = usePublicUsers();
  const { currentAgency } = useAgency();
  const navigate = useNavigate();

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

  // CLASSIFY FEEDBACK BY SENTIMENT
  let positive = 0,
    neutral = 0,
    negative = 0;

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
    <div>

      {/* MAIN WHITE CONTAINER */}
      <div className="w-full bg-white p-10 shadow-lg border border-gray-100">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-[#344767]">
          Laporan Maklum Balas Pengguna
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Ringkasan dan butiran maklum balas pelanggan bagi agensi anda.
        </p>

        {/* TABLE CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10 relative">

          {/* TOP BLUE BAR */}
          <div
            className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
            style={{ backgroundColor: "#2196F3" }}
          ></div>

          <h3 className="text-xl font-semibold text-[#344767] mb-5">
            Senarai Maklum Balas
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">

              {/* TABLE HEADER */}
              <thead>
                <tr className="bg-[#bedef8ff] text-[#344767] border-b border-gray-200">
                  <th className="p-4 text-sm font-semibold">Tarikh</th>
                  <th className="p-4 text-sm font-semibold">Nama Pengguna</th>
                  <th className="p-4 text-sm font-semibold">Butiran Respons</th>
                  <th className="p-4 text-sm font-semibold">Kategori</th>
                  <th className="p-4 text-sm font-semibold">Skor</th>
                  <th className="p-4 text-sm font-semibold">Lampiran</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="text-[#344767]">

                {/* EMPTY STATE */}
                {agencyFeedbacks.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8 text-gray-500 italic"
                    >
                      Tiada maklum balas untuk agensi anda.
                    </td>
                  </tr>
                )}

                {/* FEEDBACK ROWS */}
                {agencyFeedbacks.map((f, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-[#fff6d2ff] transition"
                  >
                    <td className="p-5 text-sm">
                      {new Date(f.date).toLocaleDateString("ms-MY")}
                    </td>

                    <td className="p-5 text-sm font-medium">
                      {f.userName}
                    </td>

                    <td className="p-5 text-sm">
                      {f.message}
                    </td>

                    <td className="p-5 text-sm">
                      {f.category}
                    </td>

                    {/* STAR RATING */}
                    <td className="p-5 flex items-center gap-1">
                      {[...Array(f.rating)].map((_, idx) => (
                        <FaStar key={idx} className="text-yellow-400" />
                      ))}
                      {[...Array(5 - f.rating)].map((_, idx) => (
                        <FaRegStar key={idx} className="text-gray-300" />
                      ))}
                    </td>

                    {/* FILE */}
                    <td className="p-5 text-sm">
                      {f.file ? (
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
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
        </div>


        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* CARD 1 */}
          <div className="p-5 bg-white rounded-2xl shadow-md border relative">
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
              style={{ backgroundColor: "#F7D343" }}
            ></div>
            <div className="text-gray-500 text-md font-medium">Purata Skor Kepuasan</div>
            <div className="text-3xl font-bold text-[#344767] mt-1">
              {agencyFeedbacks.length > 0
                ? (
                    agencyFeedbacks.reduce((a, b) => a + b.rating, 0) /
                    agencyFeedbacks.length
                  ).toFixed(1)
                : "-"}
            </div>
          </div>

          {/* CARD 2 */}
          <div className="p-5 bg-white rounded-2xl shadow-md border relative">
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
              style={{ backgroundColor: "#F7D343" }}
            ></div>
            <div className="text-gray-500 text-md font-medium">Jumlah Maklum Balas</div>
            <div className="text-3xl font-bold text-[#344767] mt-1">
              {agencyFeedbacks.length}
            </div>
          </div>

          {/* PIE CHART CARD */}
          <div className="p-5 bg-white rounded-2xl shadow-md border relative flex gap-4 items-center">
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
              style={{ backgroundColor: "#F7D343" }}
            ></div>

            <svg width="120" height="120" className="rotate-[-90deg]">
              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="20"
              />

              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#1ABC9C"
                strokeWidth="20"
                strokeDasharray={`${arcPos} ${circumference}`}
              />

              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#5DADE2"
                strokeWidth="20"
                strokeDasharray={`${arcNeu} ${circumference}`}
                strokeDashoffset={-arcPos}
              />

              <circle
                r={c}
                cx="60"
                cy="60"
                fill="transparent"
                stroke="#2E4053"
                strokeWidth="20"
                strokeDasharray={`${arcNeg} ${circumference}`}
                strokeDashoffset={-(arcPos + arcNeu)}
              />
            </svg>

            <div className="text-sm">
              <div>
                <span className="inline-block w-3 h-3 bg-[#1ABC9C] mr-2"></span>
                Positif ({percentPos}%)
              </div>
              <div>
                <span className="inline-block w-3 h-3 bg-[#5DADE2] mr-2"></span>
                Neutral ({percentNeu}%)
              </div>
              <div>
                <span className="inline-block w-3 h-3 bg-[#2E4053] mr-2"></span>
                Negatif ({percentNeg}%)
              </div>
            </div>
          </div>
        </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/agency/reports")}
            className="px-5 py-2 rounded-lg text-white font-semibold shadow-md mt-5"
            style={{ backgroundColor: "#0A3D62" }}
          >
            Kembali ke Laporan
          </button>

      </div>
    </div>
  );
}
