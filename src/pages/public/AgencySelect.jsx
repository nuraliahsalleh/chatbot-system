
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function AgencySelect() {
  const { agencies } = useAgency();
  const { currentUser, startChat } = usePublicUsers();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Load semua kategori FAQ
  const allCategories = JSON.parse(localStorage.getItem("faq_categories") || "[]");

  const filtered = agencies.filter((a) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (a.name || "").toLowerCase().includes(q) ||
      (a.description || "").toLowerCase().includes(q) ||
      (a.code || "").toLowerCase().includes(q)
    );
  });

  const handleStart = (agency) => {
    if (!currentUser) {
      alert("Sila log masuk dahulu sebelum mula chat.");
      navigate("/public/login");
      return;
    }
    const chatId = startChat(currentUser.id, agency);
    navigate(`/public/chat?chatId=${chatId}`);
  };

  
  return (
  <div className="px-6 py-8 max-w-6xl mx-auto bg-[#f4f7fe] min-h-screen">


    {/* Title */}
    {/* <div  className="text-center mb-10 p-8"
        style={{ backgroundColor: "#0077ffff" }}>

      <h2 className="text-4xl font-bold leading-tight">
        <span className="text-white">Platform Chatbot</span> <br />
      <span className="text-[#F7D343]">
        Pelbagai Agensi Malaysia
      </span>
      </h2>
      <p className="text-white text-lg mt-2">
        Dapatkan bantuan segera dari pelbagai agensi kerajaan Malaysia.
      </p>
    </div> */}
    {/* Title */}
    <div
      className="text-center mb-10 p-10 shadow-md"
      style={{
        background: "linear-gradient(90deg, #0077FF, #2196F3)",
      }}
    >

      {/* Main Title */}
      <h2 className="text-4xl font-extrabold leading-tight tracking-wide drop-shadow-sm">

        <span className="text-white block">
          Platform Chatbot
        </span>

        <span className="text-[#F7D343] drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)] tracking-wider">
          Pelbagai Agensi Malaysia
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-white text-lg mt-4 opacity-95">
        Dapatkan bantuan segera dari pelbagai agensi kerajaan Malaysia.
      </p>
    </div>



    {/* Search Bar */}
    <div className="flex items-center gap-3 mb-8">
      <input
        className="border border-gray-300 px-4 py-3 rounded-xl flex-1 shadow-sm text-[#344767] focus:ring-2 focus:ring-[#0A3D62]"
        placeholder="Cari agensi atau perkhidmatan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-5 py-3 rounded-xl text-white font-medium shadow-md"
        style={{ backgroundColor: "#0A3D62" }}
        onClick={() => setQuery("")}
      >
        Reset
      </button>
    </div>

    {/* Agency Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filtered.length === 0 && (
        <div className="text-gray-500 col-span-3 text-center py-10">
          Tiada agensi ditemui.
        </div>
      )}

      {filtered.map((a) => {
        const agencyCategories = allCategories.filter(
          (cat) => cat.agencyId === a.id
        );

        return (
          <div
            key={a.id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition relative overflow-hidden"
          >
            {/* TOP BORDER COLOR (Dashboard style) */}
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: "#0077FF" }}
            ></div>

            {/* Logo + Name */}
            <div className="flex items-start gap-4 mt-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex justify-center items-center shadow-sm">
                {a.logo ? (
                  <img
                    src={`/${a.logo}`}
                    alt={a.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Logo</span>
                )}
              </div>

              <div className="flex-1">
                <div className="font-bold text-xl text-[#344767] leading-tight">
                  {a.name}
                </div>
                <div className="text-sm text-gray-600 mt-1">{a.description}</div>
              </div>
            </div>

            {/* Perkhidmatan */}
            <div className="mt-4">
              <div className="text-sm font-semibold text-[#344767]">
                Perkhidmatan :
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {(a.services || []).map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-gray-100 border border-gray-200 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ + Start Chat */}
            <div className="mt-6 flex flex-col gap-3">

              {/* DROPDOWN FAQ */}
              {agencyCategories.length === 0 ? (
                <button
                  className="px-3 py-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                  disabled
                >
                  Soalan Lazim (Tiada)
                </button>
              ) : (
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm hover:bg-gray-100 focus:ring-2 focus:ring-[#0A3D62]"
                  defaultValue=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;
                    navigate(`/public/faq?agencyId=${a.id}&categoryId=${value}`);
                  }}
                >
                  <option value="">Soalan Lazim (FAQ)</option>
                  {agencyCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Mula Chat Button */}
              <button
                className="w-full py-2 rounded-lg font-semibold shadow-md transition-all duration-300 text-white"
                style={{ backgroundColor: "#0A3D62" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F7D343";
                  e.target.style.color = "#344767";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0A3D62";
                  e.target.style.color = "white";
                }}
                onClick={() => handleStart(a)}
              >
                Mula Chat
              </button>

            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-8 text-right text-sm text-gray-500">
      Kemas kini: {new Date().toLocaleDateString("ms-MY")}
    </div>
  </div>
);

}
