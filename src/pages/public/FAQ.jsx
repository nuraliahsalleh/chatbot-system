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
      (i) =>
        i.categoryId === categoryId &&
        (!agencyId || i.agencyId === agencyId)
    );

    setFaqs(filtered);
  }, [agencyId, categoryId]);

  // IF NO CATEGORY SELECTED
  if (!categoryId || !category) {
    return (
      <div className="p-6 flex justify-center">
        <div className="max-w-6xl w-full bg-white shadow-lg p-10 border border-gray-100 rounded-2xl">
          <h2 className="text-3xl font-bold text-[#344767]">Soalan Lazim (FAQ)</h2>
          <p className="text-gray-600 mt-2">
            Sila pilih kategori FAQ melalui dashboard untuk melihat senarai soalan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg p-10 border border-gray-100 rounded-2xl">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-[#344767]">{category.name}</h2>

          <div className="text-sm text-gray-500 mt-1">
            Dashboard &gt; FAQ &gt; {category.name}
          </div>

          <p className="text-gray-600 text-lg mt-3">
            Rujuk soalan lazim di bawah:
          </p>
        </div>

        {/* FAQ Container */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 relative overflow-hidden">

          {/* Yellow Top Border */}
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: "#F7D343" }}
          ></div>

          {/* FAQ List */}
          {faqs.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-sm">
              Tiada soalan FAQ ditemui untuk kategori ini.
            </div>
          )}

          <div className="space-y-4">
          {faqs.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`
                  rounded-xl border transition-all duration-300 overflow-hidden 
                  ${isOpen ? "bg-blue-50 border-blue-300 shadow-md" : "bg-white border-gray-200 shadow-sm"}
                  hover:shadow-lg
                `}
              >
                {/* Question Button */}
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="font-semibold text-xl text-[#344767]">
                    {item.question}
                  </span>

                  {/* Arrow Icon (Animated) */}
                  <span
                    className={`
                      text-[#344767] text-2xl font-bold transform transition-transform duration-300
                      ${isOpen ? "rotate-180" : "rotate-0"}
                    `}
                  >
                    ▼
                  </span>
                </button>

                {/* Animated Answer Section */}
                <div
                  className={`
                    px-5 overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="text-base text-gray-700 leading-relaxed mt-2">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>



        </div>
      </div>
    </div>
  );
}
