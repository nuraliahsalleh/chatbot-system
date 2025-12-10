
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaSignal, FaCheckCircle, FaCalendarCheck } from "react-icons/fa";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import dashboardLogo from "../../assets/logoConnect2.png"; 


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

  const stats = [
    { label: "Jumlah Chat", value: chats.length, icon: <FaComments />, color: "#2196F3" },
    { label: "Chat Aktif", value: chats.filter((c) => c.status === "active").length, icon: <FaSignal />, color: "#2196F3" },
    { label: "Chat Selesai", value: chats.filter((c) => c.status === "closed").length, icon: <FaCheckCircle />, color: "#2196F3" },
    { label: "Tarikh Sertai", value: new Date(currentUser.createdAt).toLocaleDateString("ms-MY"), icon: <FaCalendarCheck />, color: "#2196F3" },
  ];

  return (
    <div className="min-h-screen bg-[#ffffffff] p-6 flex justify-center">

      {/* Outer Container (Modern Style) */}
      <div className="w-full max-w-6xl bg-white shadow-lg p-10 border border-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-4xl font-bold text-[#344767]">
            Selamat Datang, {currentUser.name}
          </h2>

          <p className="text-gray-600 text-lg">
            Berikut adalah ringkasan aktiviti chat anda.
          </p>
        </div>

        {/* LOGO ON RIGHT */}
        <img
          src={dashboardLogo}
          alt="Dashboard Logo"
          className="h-9 object-contain opacity-90 animate-pulse transition-all duration-500"
        />
      </div>


        {/* Statistic Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-2xl shadow-md border relative overflow-hidden"
            >
              {/* Top Colored Border */}
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: item.color }}
              ></div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                  <div className="text-2xl font-bold text-[#344767] mt-1">
                    {item.value}
                  </div>
                </div>

                <div
                  className="p-3 rounded-xl text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat History */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h3 className="font-bold text-2xl mb-5 text-[#344767]">
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
                className="border-b py-5 last:border-b-0 flex items-start justify-between"
              >
                <div>
                  <div className="font-semibold text-lg text-[#344767]">
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

                    {/* View Button */}
                    <button
                      className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm"
                      style={{
                        backgroundColor: "#0A3D62",
                        color: "white",
                      }}
                      onClick={() => navigate(`/public/chat?chatId=${c.id}`)}
                    >
                      Lihat
                    </button>

                    {/* FAQ */}
                    {agencyCategories.length === 0 ? (
                      <button className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed text-sm">
                        Soalan Lazim (Tiada)
                      </button>
                    ) : (
                      <select
                        className="px-4 py-1.5 rounded-lg border text-sm"
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

                    {/* Feedback Button */}
                    <button
                      className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:brightness-110 transition"
                      style={{
                        backgroundColor: "#F7D343",
                        color: "#344767",
                      }}
                      onClick={() =>
                        navigate(`/public/feedback?chatId=${c.id}&agency=${c.agencyName}`)
                      }
                    >
                      Aduan & Maklum Balas
                    </button>

                  </div>

                  <div className="text-sm">
                    {c.status === "active" ? (
                      <span className="text-green-700 font-semibold">Aktif</span>
                    ) : (
                      <span className="text-gray-600">Selesai</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* New Chat Button */}
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
