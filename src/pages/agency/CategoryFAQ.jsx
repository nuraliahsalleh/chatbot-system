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

  // Load categories for current agency
  useEffect(() => {
    if (!agencyId) return;
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setCategories(all.filter((c) => c.agencyId === agencyId));
  }, [agencyId]);

  // Save categories (merge with other agencies)
  const saveCategories = (updatedForThisAgency) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const others = all.filter((c) => c.agencyId !== agencyId);
    const merged = [...others, ...updatedForThisAgency];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setCategories(updatedForThisAgency);
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

    const updated = [...categories, newItem];
    saveCategories(updated);
    setNewCategory("");
  };

  const handleDeleteCategory = (id) => {
    if (!window.confirm("Padam kategori ini beserta semua soalan FAQ?")) return;
    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);

    // Juga buang semua soalan berkaitan kategori ini
    const allItems = JSON.parse(localStorage.getItem("faq_items") || "[]");
    const remain = allItems.filter((i) => i.categoryId !== id);
    localStorage.setItem("faq_items", JSON.stringify(remain));
  };

  if (!agencyId) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Kemaskini FAQ</h2>
        <p className="text-gray-600">
          Sila log masuk sebagai agensi untuk menguruskan FAQ.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Kemaskini FAQ</h2>
      <p className="text-sm text-gray-600 mb-6">
        Kemaskini tetapan chatbot bagi mengekalkan ketepatan maklumat dan kelancaran perkhidmatan agensi.
      </p>

      <div className="bg-white border rounded-lg p-5 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-center mb-4">Kategori FAQ</h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Sila isi kategori FAQ di bawah untuk membuat penambahan kategori FAQ.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm bg-gray-50"
            placeholder="Isikan jenis kategori FAQ..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-black text-white rounded text-sm"
            onClick={handleAddCategory}
          >
            Tambah Kategori
          </button>
        </div>

        {/* Senarai kategori */}
        <div className="space-y-2">
          {categories.length === 0 && (
            <div className="text-sm text-gray-500">
              Tiada kategori FAQ lagi. Sila tambah kategori baru.
            </div>
          )}

          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50"
            >
              <span className="font-medium text-sm">{cat.name}</span>

              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border rounded text-sm bg-white hover:bg-gray-100"
                  onClick={() =>
                    navigate(`/agency/faq?categoryId=${cat.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 border rounded text-sm bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  Padam Kategori
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
