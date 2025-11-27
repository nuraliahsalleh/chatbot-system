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

  // Load category + items
  useEffect(() => {
    const allCats = JSON.parse(localStorage.getItem(CATS_KEY) || "[]");
    const cat = allCats.find((c) => c.id === categoryId);
    setCategory(cat || null);

    const allItems = JSON.parse(localStorage.getItem(ITEMS_KEY) || "[]");
    setItems(allItems.filter((i) => i.categoryId === categoryId));
  }, [categoryId]);

  const saveItems = (updatedForCategory) => {
    const all = JSON.parse(localStorage.getItem(ITEMS_KEY) || "[]");
    const others = all.filter((i) => i.categoryId !== categoryId);
    const merged = [...others, ...updatedForCategory];
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

  if (!categoryId || !category) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Kemaskini FAQ</h2>
        <p className="text-gray-600 mb-4">
          Kategori FAQ tidak ditemui. Sila pilih kategori dari halaman{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => navigate("/agency/faq-categories")}
          >
            Kategori FAQ
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Kemaskini FAQ</h2>
      <p className="text-sm text-gray-600 mb-4">
        Isi maklumat soalan dan jawapan yang ingin dikongsikan kepada pengguna.
      </p>

      <div className="mb-4 text-sm text-gray-500">
        Kategori: <span className="font-semibold">{category.name}</span>
      </div>

      {/* Tambah soalan baru */}
      <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
        <h3 className="font-semibold mb-3 text-center">Tambah Soalan FAQ</h3>
        <input
          className="w-full border rounded px-3 py-2 text-sm bg-gray-50 mb-3"
          placeholder="Isikan soalan FAQ di sini..."
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
        />
        <textarea
          className="w-full border rounded px-3 py-2 text-sm bg-gray-50 h-24 mb-3"
          placeholder="Isikan jawapan bagi soalan di atas..."
          value={newA}
          onChange={(e) => setNewA(e.target.value)}
        />
        <div className="text-right">
          <button
            className="px-4 py-2 bg-black text-white rounded text-sm"
            onClick={handleAddItem}
          >
            Tambah Jawapan
          </button>
        </div>
      </div>

      {/* Senarai soalan sedia ada */}
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3 text-center">Soalan FAQ</h3>

        {items.length === 0 && (
          <div className="text-sm text-gray-500">
            Belum ada soalan bagi kategori ini. Sila tambah soalan di atas.
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded px-3 py-2 bg-gray-50 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">
                  Soalan
                </span>
                <button
                  className="px-3 py-1 border rounded text-sm bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Padam Soalan
                </button>
              </div>
              <input
                className="w-full border rounded px-3 py-2 text-sm bg-white"
                value={item.question}
                onChange={(e) =>
                  handleChangeItem(item.id, "question", e.target.value)
                }
              />

              <span className="text-sm font-semibold">Jawapan</span>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm bg-white h-24"
                value={item.answer}
                onChange={(e) =>
                  handleChangeItem(item.id, "answer", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 border rounded text-sm bg-gray-100 hover:bg-gray-200"
            onClick={() => navigate("/agency/faq-categories")}
          >
            Kembali ke Kategori
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded text-sm"
            onClick={handleSaveAll}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
