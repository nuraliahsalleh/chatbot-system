import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaCheckCircle, FaClock, FaSignal } from "react-icons/fa";


export default function Reports() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("prestasi");

  const handleGenerate = () => {
    if (reportType === "feedback") {
      navigate("/agency/report-feedbacks");
    }
  };

  return (
    <div>

      {/* MAIN CONTAINER */}
      <div className="w-full bg-white p-10 shadow-lg border border-gray-100">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-[#344767]">
          Laporan Penuh
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Paparan keseluruhan laporan prestasi sistem chatbot untuk agensi anda.
        </p>

        {/* FILTER SECTION */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10 relative">
          {/* TOP BLUE BAR */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: "#2196F3" }}
          ></div>

          <h3 className="text-xl font-semibold text-[#344767] mb-5">
            Penapis Laporan
          </h3>

          <div className="grid grid-cols-4 gap-6">

            {/* TARIKH MULA */}
            <div>
              <label className="text-sm font-medium text-[#344767]">
                Tarikh Mula
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 mt-1 focus:ring-2 focus:ring-[#0A3D62]"
              />
            </div>

            {/* TARIKH TAMAT */}
            <div>
              <label className="text-sm font-medium text-[#344767]">
                Tarikh Tamat
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 mt-1 focus:ring-2 focus:ring-[#0A3D62]"
              />
            </div>

            {/* JENIS LAPORAN */}
            <div>
              <label className="text-sm font-medium text-[#344767]">
                Jenis Laporan
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white mt-1 focus:ring-2 focus:ring-[#0A3D62]"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="prestasi">Prestasi Chat</option>
                <option value="feedback">Aduan & Maklum Balas</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                className="w-full px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
                style={{ backgroundColor: "#0A3D62" }}
              >
                Jana Laporan
              </button>
            </div>
          </div>
        </div>

        
        {/* STATISTIC CARDS */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#344767] mb-4">
            Ringkasan Statistik
          </h3>

          <div className="grid grid-cols-4 gap-6">
            {[
              {
                label: "Jumlah Chat Diterima",
                value: "1,260",
                change: "▲ 12%",
                color: "#2196F3",
                changeColor: "text-green-600",
                icon: <FaComments />,
              },
              {
                label: "Jumlah Chat Selesai",
                value: "1,112",
                change: "▲ 9%",
                color: "#4CAF50",
                changeColor: "text-green-600",
                icon: <FaCheckCircle />,
              },
              {
                label: "Chat Menunggu",
                value: "136",
                change: "▼ 3%",
                color: "#FF7043",
                changeColor: "text-red-600",
                icon: <FaClock />,
              },
              {
                label: "Purata Masa Respons",
                value: "1.8 minit",
                change: "▲ 6%",
                color: "#9C27B0",
                changeColor: "text-green-600",
                icon: <FaSignal />,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl shadow-md border border-gray-200 relative"
              >
                {/* Top Colored Bar */}
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ backgroundColor: stat.color }}
                ></div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500 text-md font-medium">{stat.label}</div>
                    <div className="text-2xl font-bold text-[#344767] mt-1">
                      {stat.value}
                    </div>
                    <div className={`${stat.changeColor} text-sm mt-1`}>
                      {stat.change}
                    </div>
                  </div>

                  {/* ICON BOX */}
                  <div
                    className="p-3 rounded-xl text-white shadow-md"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* MOCK CHART */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10 mb-20">
          <h3 className="text-xl font-bold text-[#344767] mb-3">
            Aktiviti Chat Harian (7 Hari Lepas)
          </h3>
          <div className="w-full h-48 bg-gray-100 rounded"></div>
        </div>

      </div>

    </div>
  );
}
