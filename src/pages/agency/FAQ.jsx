// src/pages/agency/FAQ.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";

const ITEMS_KEY = "faq_items";
const CATS_KEY = "faq_categories";

export default function FAQ() {
  const { currentAgency } = useAgency();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const categoryId = query.get("categoryId");

  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  useEffect(() => {
    // Load category details
    const allCats = JSON.parse(localStorage.getItem(CATS_KEY) || "[]");
    const selected = allCats.find((c) => c.id === categoryId);
    setCategory(selected || null);

    // Load FAQ items for this category
    const allItems = JSON.parse(localStorage.getItem(ITEMS_KEY) || "[]");
    setItems(allItems.filter((i) => i.categoryId === categoryId));
  }, [categoryId]);

  const saveItems = (updatedForCategory) => {
    const all = JSON.parse(localStorage.getItem(ITEMS_KEY) || "[]");

    const merged = [
      ...all.filter((i) => i.categoryId !== categoryId),
      ...updatedForCategory,
    ];

    localStorage.setItem(ITEMS_KEY, JSON.stringify(merged));
    setItems(updatedForCategory);
  };

  const handleAddItem = () => {
    if (!newQ.trim() || !newA.trim()) {
      alert("Sila isi soalan dan jawapan terlebih dahulu.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      agencyId: currentAgency?.id,
      categoryId,
      question: newQ.trim(),
      answer: newA.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [...items, newItem];
    saveItems(updated);

    setNewQ("");
    setNewA("");
  };

  const handleChangeItem = (id, field, value) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, [field]: value } : i
    );
    setItems(updated);
  };

  const handleDeleteItem = (id) => {
    if (!window.confirm("Padam soalan FAQ ini?")) return;

    const updated = items.filter((i) => i.id !== id);
    saveItems(updated);
  };

  const handleSaveAll = () => {
    saveItems(items);
    alert("Perubahan FAQ berjaya disimpan.");
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-6 flex">
        <div className="w-full bg-white p-10 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-[#344767] mb-2">
            Kemaskini FAQ
          </h2>

          <p className="text-gray-600 mb-4 text-lg">
            Kategori FAQ tidak ditemui.
          </p>

          <button
            onClick={() => navigate("/agency/faq-categories")}
            className="px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
            style={{ backgroundColor: "#0A3D62" }}
          >
            Kembali ke Kategori FAQ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>

      {/* MAIN WHITE CONTAINER */}
      <div className="w-full bg-white p-10 shadow-lg border border-gray-100">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-[#344767]">
          Kemaskini Soalan FAQ
        </h1>

        <p className="text-gray-600 text-lg mt-2">
          Uruskan soalan dan jawapan bagi kategori:
          <span className="font-semibold text-[#344767]"> {category.name}</span>
        </p>


        {/* ADD QUESTION CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10 relative">
          {/* TOP BLUE BAR */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: "#2196F3" }}
          />

          <h3 className="text-xl font-semibold text-[#344767] mb-3">
            Tambah Soalan FAQ
          </h3>

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-sm mb-3 focus:ring-2 focus:ring-[#0A3D62]"
            placeholder="Isikan soalan FAQ di sini..."
            value={newQ}
            onChange={(e) => setNewQ(e.target.value)}
          />

          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 h-28 text-sm focus:ring-2 focus:ring-[#0A3D62]"
            placeholder="Isikan jawapan bagi soalan di atas..."
            value={newA}
            onChange={(e) => setNewA(e.target.value)}
          />

          <div className="text-right mt-3">
            <button
              onClick={handleAddItem}
              className="px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
              style={{ backgroundColor: "#0A3D62" }}
            >
              Tambah Jawapan
            </button>
          </div>
        </div>


        {/* LIST OF QUESTIONS */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-8">

          <h3 className="text-xl font-bold text-[#344767] mb-5">
            Senarai Soalan FAQ
          </h3>

          {items.length === 0 && (
            <p className="text-gray-500">Belum ada soalan FAQ untuk kategori ini.</p>
          )}

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl bg-gray-50 p-5 shadow-sm space-y-3"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#344767]">Soalan</span>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:brightness-110"
                    style={{ backgroundColor: "#F7D343", color: "#344767" }}
                  >
                    Padam
                  </button>
                </div>

                {/* QUESTION INPUT */}
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm"
                  value={item.question}
                  onChange={(e) =>
                    handleChangeItem(item.id, "question", e.target.value)
                  }
                />

                {/* ANSWER */}
                <span className="font-semibold text-[#344767]">Jawapan</span>

                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm h-24"
                  value={item.answer}
                  onChange={(e) =>
                    handleChangeItem(item.id, "answer", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between mt-6">

            <button
              onClick={() => navigate("/agency/faq-categories")}
              className="px-5 py-2 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
              style={{ backgroundColor: "#0A3D62" }}
            >
              Kembali ke Kategori
            </button>

            <button
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
              style={{ backgroundColor: "#F7D343", color: "#344767" }}
            >
              Simpan Perubahan
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
