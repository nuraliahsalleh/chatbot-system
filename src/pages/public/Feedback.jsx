import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBuilding, FaPaperPlane } from "react-icons/fa";
import dashboardLogo from "../../assets/logoConnect2.png";


export default function PublicFeedback() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const agencyName = query.get("agency") || "Agensi";
  const chatId = query.get("chatId") || "";

  const [form, setForm] = useState({
    category: "",
    rating: 0,
    message: "",
    file: null,
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (!form.category || !form.message || form.rating === 0) {
      alert("Sila lengkapkan semua ruangan termasuk skor kepuasan.");
      return;
    }


    // SIMPAN FEEDBACK KE DALAM public_chats
    const stored = JSON.parse(localStorage.getItem("public_chats")) || [];
    const index = stored.findIndex((c) => c.id === chatId);

    if (index !== -1) {
      stored[index].feedback = {
        date: new Date().toISOString(),
        category: form.category,
        rating: form.rating,
        message: form.message,
        fileName: form.file?.name || null,
      };

      localStorage.setItem("public_chats", JSON.stringify(stored));
    }

    alert("Aduan berjaya dihantar!");
    navigate("/public/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-10 border border-gray-100">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-4xl font-bold text-[#344767]">
          Aduan & Maklum Balas
        </h2>

        <p className="text-gray-600 text-lg">
          Hantarkan maklum balas atau aduan berkaitan perkhidmatan kepada agensi berikut.
        </p>
      </div>

      {/* LOGO ON RIGHT */}
      <img
        src={dashboardLogo}
        alt="Dashboard Logo"
        className="h-9 object-contain opacity-90 animate-pulse transition-all duration-700 -mt-14"
      />
    </div>


        {/* AGENCY BOX*/}
        
        <div className="bg-white p-6 rounded-2xl shadow-md border relative overflow-hidden mb-8">

          {/* TOP BORDER COLOR */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: "#0077FF" }}  
          ></div>

          <div className="flex items-start gap-4 mt-2">
            <div className="p-3 rounded-xl bg-[#0077FF] text-white shadow-md">
              <FaBuilding size={26} />
            </div>

            <div>
              <div className="text-sm text-gray-500">Agensi Dituju:</div>
              <div className="text-xl font-semibold text-[#344767]">{agencyName}</div>
              <div className="text-xs text-gray-400 mt-1">Chat ID: {chatId}</div>
            </div>
          </div>
        </div>


        {/* FORM (styled same as Dashboard cards) */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6">

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 font-medium text-[#344767]">
              Kategori Aduan <span className="text-red-500">*</span>
            </label>

            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-[#0A3D62]"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Cadangan">Cadangan</option>
              <option value="Maklum Balas / Aduan">Maklum Balas / Aduan</option>
              <option value="Penghargaan">Penghargaan</option>
              <option value="Pertanyaan">Pertanyaan</option>
            </select>
          </div>

          {/* STAR RATING */}
          <div>
            <label className="block mb-2 font-medium text-[#344767]">
              Skor Kepuasan <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-2 mb-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = hoverRating >= star || form.rating >= star;
                return (
                  <span
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setForm({ ...form, rating: star })}
                    style={{
                      cursor: "pointer",
                      fontSize: "32px",
                      color: filled ? "#facc15" : "#e5e7eb",
                      transition: "0.2s",
                    }}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <div className="text-sm text-gray-500">
              {form.rating === 0
                ? "Tiada skor dipilih"
                : `Anda memilih ${form.rating} / 5 bintang`}
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block mb-2 font-medium text-[#344767]"> 
              Maklum Balas / Aduan <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 h-32 focus:ring-2 focus:ring-[#0A3D62]"
              placeholder="Sila nyatakan aduan atau maklum balas anda..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="block mb-2 font-medium text-[#344767]">Lampirkan Fail (Opsyenal)</label>
            <input
              className="block"
              type="file"
              onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="text-right">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg text-white font-medium shadow-md flex items-center gap-2 ml-auto"
              style={{ backgroundColor: "#0A3D62" }}
            >
              <FaPaperPlane size={16} />
              Hantar Aduan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
