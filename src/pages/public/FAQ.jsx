// src/pages/public/FAQ.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ITEMS_KEY = "faq_items";
const CATS_KEY = "faq_categories";

export default function FAQ() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const agencyId = query.get("agencyId");
  const categoryId = query.get("categoryId");

  const [category, setCategory] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const allCats = JSON.parse(localStorage.getItem(CATS_KEY) || "[]");
    const cat = allCats.find((c) => c.id === categoryId);
    setCategory(cat || null);

    const allItems = JSON.parse(localStorage.getItem(ITEMS_KEY) || "[]");
    const filtered = allItems.filter(
      (i) => i.categoryId === categoryId && (!agencyId || i.agencyId === agencyId)
    );
    setFaqs(filtered);
  }, [agencyId, categoryId]);

  if (!categoryId || !category) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Soalan Lazim (FAQ)</h2>
          <p className="text-sm text-gray-600">
            Sila pilih kategori FAQ daripada dashboard untuk melihat soalan dan
            jawapan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
        <div className="text-xs text-gray-500">
          Utama &gt; Soalan Lazim (FAQ)
        </div>
        <p className="mt-3 text-sm text-gray-700">
          Rujuk soalan lazim di bawah:
        </p>
      </div>

      <div className="bg-white border rounded-lg shadow-sm divide-y">
        {faqs.length === 0 && (
          <div className="p-4 text-sm text-gray-500">
            Tiada soalan FAQ untuk kategori ini buat masa sekarang.
          </div>
        )}

        {faqs.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="p-4">
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="font-semibold text-sm">
                  {item.question}
                </span>
                <span className="text-xl">
                  {isOpen ? "–" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="mt-2 text-sm text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
