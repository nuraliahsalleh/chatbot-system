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

  const allChats = getChatsForUser(currentUser.id);

  // Take latest chat per agency
  const chats = Object.values(
    allChats.reduce((acc, chat) => {
      const prev = acc[chat.agencyId];
      if (!prev || new Date(chat.updatedAt) > new Date(prev.updatedAt)) {
        acc[chat.agencyId] = chat;
      }
      return acc;
    }, {})
  );

  const allCategories = JSON.parse(localStorage.getItem("faq_categories") || "[]");

  return (
    <div className="min-h-screen bg-white p-6 flex justify-center">

      {/* Middle Container */}
      <div
        className="w-full max-w-6xl p-8 rounded-xl shadow-sm"
        style={{
          backgroundColor: "#FFF3EC", // very light orange
        }}
      >

        {/* Title Section */}
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#0A3D62" }}>
          Selamat Datang {currentUser.name}
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          Berikut adalah ringkasan aktiviti chat anda dengan pelbagai agensi kerajaan.
        </p>

        {/* Statistic Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Jumlah Chat", value: chats.length },
            { label: "Chat Aktif", value: chats.filter((c) => c.status === "active").length },
            { label: "Chat Selesai", value: chats.filter((c) => c.status === "closed").length },
            { label: "Tarikh Sertai", value: new Date(currentUser.createdAt).toLocaleDateString("ms-MY") }
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow-md border"
              style={{ borderColor: "#FFC9A9" }}
            >
              <div className="text-sm text-gray-600">{item.label}</div>
              <div className="text-2xl font-bold text-gray-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chat History */}
        <div
          className="bg-white p-6 rounded-xl shadow-md border"
          style={{ borderColor: "#FFC9A9" }}
        >
          <h3
            className="font-semibold text-xl mb-4"
            style={{ color: "#0A3D62" }}
          >
            Sejarah Chat
          </h3>

          {chats.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              Tiada sejarah chat.{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => navigate("/public/agencies")}
              >
                Mulakan Chat Baru
              </button>
            </div>
          )}

          {chats.map((c) => {
            const agencyCategories = allCategories.filter(
              (cat) => cat.agencyId === c.agencyId
            );

            return (
              <div
                key={c.id}
                className="border-b last:border-b-0 py-4 flex items-start justify-between"
                style={{ borderColor: "#FFE0C2" }}
              >
                <div>
                  <div
                    className="font-semibold text-lg"
                    style={{ color: "#0A3D62" }}
                  >
                    {c.agencyName}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {c.messages?.[c.messages.length - 1]?.text || "Tiada mesej"}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    {new Date(c.updatedAt).toLocaleString("ms-MY")}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm"
                      style={{ backgroundColor: "#0A3D62", color: "white" }}
                      onClick={() =>
                        navigate(`/public/chat?chatId=${c.id}`)
                      }
                    >
                      Lihat
                    </button>

                    {/* FAQ Dropdown */}
                    {agencyCategories.length === 0 ? (
                      <button className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed text-sm">
                        Soalan Lazim (Tiada)
                      </button>
                    ) : (
                      <select
                        className="px-4 py-1.5 rounded-lg border text-sm"
                        style={{ backgroundColor: "white" }}
                        defaultValue=""
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value)
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

                    <button
                      className="px-4 py-1.5 rounded-lg text-sm shadow-sm"
                      style={{ backgroundColor: "#FF8F54", color: "white" }}
                      onClick={() =>
                        navigate(
                          `/public/feedback?chatId=${c.id}&agency=${c.agencyName}`
                        )
                      }
                    >
                      Aduan & Maklum Balas
                    </button>
                  </div>

                  <div className="text-sm">
                    {c.status === "active" ? (
                      <span className="text-green-700 font-semibold">
                        Aktif
                      </span>
                    ) : (
                      <span className="text-gray-600">Selesai</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-6 text-right">
            <button
              className="px-5 py-2 rounded-lg text-white font-medium shadow-md"
              style={{ backgroundColor: "#0A3D62" }}
              onClick={() => navigate("/public/agencies")}
            >
              Mulakan Chat Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
