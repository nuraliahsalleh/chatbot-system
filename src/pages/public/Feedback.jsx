
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    // ============================================
    // 🔥 SIMPAN FEEDBACK KE DALAM public_chats
    // ============================================
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Aduan & Maklum Balas</h2>
      <p className="text-gray-600 mb-6">
        Hantarkan maklum balas atau aduan berkaitan perkhidmatan kepada agensi berikut.
      </p>

      {/* AGENCY BOX */}
      <div className="p-4 bg-white border rounded-lg shadow mb-6">
        <div className="text-sm text-gray-500">Agensi Dituju:</div>
        <div className="text-xl font-semibold mt-1">{agencyName}</div>
        <div className="text-xs text-gray-400 mt-1">Chat ID: {chatId}</div>
      </div>

      {/* FORM */}
      <div className="p-5 bg-white shadow rounded-lg space-y-4">

        {/* CATEGORY */}
        <div>
          <label className="block mb-1 font-medium">Kategori Aduan *</label>
          <select
            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
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
          <label className="block mb-1 font-medium">Skor Kepuasan *</label>

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
          <label className="block mb-1 font-medium">Maklum Balas / Aduan *</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 h-32"
            placeholder="Sila nyatakan aduan atau maklum balas anda..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* FILE UPLOAD */}
        <div>
          <label className="block mb-1 font-medium">Lampirkan Fail (Opsyenal)</label>
          <input
            type="file"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Hantar Aduan
          </button>
        </div>
      </div>
    </div>
  );
}
