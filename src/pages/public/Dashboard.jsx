
// src/pages/public/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function Dashboard() {
  const { currentUser, getChatsForUser } = usePublicUsers();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Selamat Datang User,</h2>
        <p className="text-gray-600 mt-2">
          Sila log masuk untuk melihat profil dan sejarah chat anda.
        </p>
      </div>
    );
  }

  // const chats = getChatsForUser(currentUser.id);
  // Chat asal
const allChats = getChatsForUser(currentUser.id);

// Gabungkan chat ikut agensi (ambil chat terbaru sahaja)
const chats = Object.values(
  allChats.reduce((acc, chat) => {
    if (!acc[chat.agencyId]) {
      acc[chat.agencyId] = chat; // simpan chat pertama
    } else {
      // sentiasa ambil chat paling baru
      const prev = acc[chat.agencyId];
      if (new Date(chat.updatedAt) > new Date(prev.updatedAt)) {
        acc[chat.agencyId] = chat;
      }
    }
    return acc;
  }, {})
);


  // Semua kategori FAQ (untuk dropdown)
  const allCategories =
    JSON.parse(localStorage.getItem("faq_categories") || "[]");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">
        Selamat Datang {currentUser.name}
      </h2>
      <p className="text-gray-600 mb-6">
        Berikut adalah ringkasan aktiviti chat anda dengan pelbagai agensi
        kerajaan.
      </p>

      {/* Statistik ringkas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Jumlah Chat</div>
          <div className="text-xl font-bold">{chats.length}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Chat Aktif</div>
          <div className="text-xl font-bold">
            {chats.filter((c) => c.status === "active").length}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Chat Selesai</div>
          <div className="text-xl font-bold">
            {chats.filter((c) => c.status === "closed").length}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Tarikh Sertai</div>
          <div className="text-xl font-bold">
            {new Date(currentUser.createdAt).toLocaleDateString("ms-MY")}
          </div>
        </div>
      </div>

      {/* Sejarah Chat */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Sejarah Chat</h3>

        {chats.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Tiada sejarah chat lagi. Klik{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => navigate("/public/agencies")}
            >
              Mulakan Chat Baru
            </button>{" "}
            untuk mula.
          </div>
        )}

        {chats.map((c) => {
          const agencyCategories = allCategories.filter(
            (cat) => cat.agencyId === c.agencyId
          );

          return (
            <div
              key={c.id}
              className="border-b last:border-b-0 py-3 flex items-start justify-between"
            >
              <div>
                <div className="font-semibold">{c.agencyName}</div>
                <div className="text-gray-500 text-sm">
                  {c.messages?.[c.messages.length - 1]?.text || "Tiada mesej"}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {new Date(c.updatedAt).toLocaleString("ms-MY")}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
                    onClick={() => navigate(`/public/chat?chatId=${c.id}`)}
                  >
                    Lihat
                  </button>

                  {/* DROPDOWN KATEGORI FAQ */}
                  {agencyCategories.length === 0 ? (
                    <button
                      className="px-3 py-1 border rounded bg-gray-50 text-gray-400 cursor-not-allowed"
                      disabled
                    >
                      Soalan Lazim (Tiada)
                    </button>
                  ) : (
                    <select
                      className="px-3 py-1 border rounded bg-white text-sm hover:bg-gray-100"
                      defaultValue=""
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) return;
                        navigate(
                          `/public/faq?agencyId=${c.agencyId}&categoryId=${value}`
                        );
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

                  {/* Aduan & Maklum Balas */}
                  {/* {c.feedback ? (
                    <span className="px-3 py-1 text-green-600 font-semibold">
                      ✓ Dihantar
                    </span>
                  ) : (
                    <button
                      className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
                      onClick={() =>
                        navigate(
                          `/public/feedback?chatId=${c.id}&agency=${c.agencyName}`
                        )
                      }
                    >
                      Aduan & Maklum Balas
                    </button>
                  )} */}
                  <button
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
                    onClick={() =>
                      navigate(
                        `/public/feedback?chatId=${c.id}&agency=${c.agencyName}`
                      )
                    }
                  >
                    Aduan & Maklum Balas
                  </button>

                </div>

                <div className="text-sm text-gray-500">
                  {c.status === "active" ? (
                    <span className="text-green-600">Aktif</span>
                  ) : (
                    <span className="text-gray-600">Selesai</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-4 text-right">
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => navigate("/public/agencies")}
          >
            Mulakan Chat Baru
          </button>
        </div>
      </div>
    </div>
  );
}
