
// src/pages/agency/CategoryFAQ.jsx
import React, { useEffect, useState } from "react";
import { useAgency } from "../../contexts/AgencyContext";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "faq_categories";

export default function CategoryFAQ() {
  const { currentAgency } = useAgency();
  const navigate = useNavigate();

  const agencyId = currentAgency?.id;
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!agencyId) return;
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setCategories(all.filter((c) => c.agencyId === agencyId));
  }, [agencyId]);

  const saveCategories = (updated) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const others = all.filter((c) => c.agencyId !== agencyId);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...others, ...updated])
    );

    setCategories(updated);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Sila isi nama kategori FAQ terlebih dahulu.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      agencyId,
      name: newCategory.trim(),
      createdAt: new Date().toISOString(),
    };

    saveCategories([...categories, newItem]);
    setNewCategory("");
  };

  const handleDeleteCategory = (id) => {
    if (!window.confirm("Padam kategori ini beserta semua soalan FAQ?")) return;

    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);

    const allItems = JSON.parse(localStorage.getItem("faq_items") || "[]");
    const remain = allItems.filter((i) => i.categoryId !== id);
    localStorage.setItem("faq_items", JSON.stringify(remain));
  };

  if (!agencyId) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Kemaskini FAQ</h2>
        <p className="text-gray-600">Sila log masuk sebagai agensi untuk menguruskan FAQ.</p>
      </div>
    );
  }

  return (
    <div>
      
      {/* MAIN BODY – SAME AS DASHBOARD */}
      <div className="w-full bg-white p-10 shadow-lg border border-gray-100">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-[#344767]">
          Kemaskini Kategori FAQ
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Uruskan kategori FAQ untuk agensi anda.
        </p>


        {/* ADD CATEGORY CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10 relative">

          {/* TOP BLUE BAR */}
          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: "#2196F3" }}></div>

          <h3 className="text-xl font-semibold text-[#344767] mb-2">Tambah Kategori FAQ</h3>
          <p className="text-sm text-gray-500 mb-4">
            Sila isi nama kategori baru untuk ditambahkan.
          </p>

          <div className="flex gap-3 mb-4">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-[#344767] focus:ring-2 focus:ring-[#0A3D62]"
              placeholder="Isikan nama kategori FAQ..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <button
              className="px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
              style={{ backgroundColor: "#0A3D62" }}
              onClick={handleAddCategory}
            >
              Tambah
            </button>
          </div>
        </div>


        {/* LIST CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-8">

          <h3 className="text-xl font-bold text-[#344767] mb-3">Senarai Kategori FAQ</h3>

          {categories.length === 0 && (
            <p className="text-gray-500 text-sm">Tiada kategori FAQ buat masa ini.</p>
          )}

          <div className="space-y-3 mt-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm flex justify-between items-center"
              >
                <span className="font-semibold text-[#344767]">{cat.name}</span>

                <div className="flex gap-3">

                  <button
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:brightness-110"
                    style={{ backgroundColor: "#0A3D62", color: "white" }}
                    onClick={() => navigate(`/agency/faq?categoryId=${cat.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition hover:brightness-110"
                    style={{ backgroundColor: "#F7D343", color: "#344767" }}
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    Padam
                  </button>

                </div>
              </div>
            ))}
          </div>


        </div>

      </div>
    </div>
  );
}
