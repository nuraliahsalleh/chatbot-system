import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();

  const [reportType, setReportType] = useState("prestasi");

  const handleGenerate = () => {
    if (reportType === "feedback") {
      navigate("/agency/report-feedbacks");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Laporan Penuh</h2>
      <p className="text-gray-600 mb-6">
        Bahagian ini memaparkan keseluruhan laporan prestasi sistem chatbot berdasarkan data interaksi dan aktiviti harian.
      </p>

      {/* FILTER ROW */}
      <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded shadow mb-6">

        {/* TARIKH MULA */}
        <div>
          <label className="block text-sm mb-1">Tarikh Mula</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>

        {/* TARIKH TAMAT */}
        <div>
          <label className="block text-sm mb-1">Tarikh Tamat</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>

        {/* JENIS LAPORAN */}
        <div>
          <label className="block text-sm mb-1">Jenis Laporan</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="prestasi">Pretasi Chat</option>
            <option value="feedback">Aduan & Maklum Balas</option>
          </select>
        </div>

        {/* BUTTON */}
        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            className="w-full bg-black text-white px-4 py-2 rounded"
          >
            Jana Laporan
          </button>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <h3 className="text-xl font-semibold mb-3">Ringkasan Statistik</h3>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Jumlah Chat Diterima</div>
          <div className="text-2xl font-bold">1,260</div>
          <div className="text-green-600 text-sm mt-1">▲ 12%</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Jumlah Chat Selesai</div>
          <div className="text-2xl font-bold">1,112</div>
          <div className="text-green-600 text-sm mt-1">▲ 9%</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Chat Menunggu</div>
          <div className="text-2xl font-bold">136</div>
          <div className="text-red-600 text-sm mt-1">▼ 3%</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Purata Masa Respons</div>
          <div className="text-2xl font-bold">1.8 minit</div>
          <div className="text-green-600 text-sm mt-1">▲ 6%</div>
        </div>
      </div>

      {/* MOCK CHART BOX */}
      <div className="bg-white p-6 rounded shadow">
        <div className="text-gray-500 text-sm mb-2">Aktiviti Chat Harian (7 Hari Lepas)</div>
        <div className="w-full h-40 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}
