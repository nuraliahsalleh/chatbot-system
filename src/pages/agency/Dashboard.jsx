import React, { useMemo } from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useAgency } from "../../contexts/AgencyContext";
import { useNavigate } from "react-router-dom";
import { FaComments, FaSignal, FaCheckCircle, FaCalendarCheck, FaClock } from "react-icons/fa";


export default function AgencyDashboard() {
  const { chats, users, setChats } = usePublicUsers();
  const { currentAgency } = useAgency();
  const navigate = useNavigate();

  const agencyId = currentAgency?.id;

  const filtered = useMemo(() => {
    if (!agencyId) return [];

    const agencyChats = chats
      .filter((c) => c.agencyId === agencyId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return Object.values(
      agencyChats.reduce((acc, chat) => {
        const prev = acc[chat.userId];
        if (!prev || new Date(chat.updatedAt) > new Date(prev.updatedAt)) {
          acc[chat.userId] = chat;
        }
        return acc;
      }, {})
    );
  }, [chats, agencyId]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const aktif = filtered.filter((c) => c.status === "active").length;
    const selesai = filtered.filter((c) => c.status === "done").length;
    return { total, aktif, selesai };
  }, [filtered]);

  const updateStatus = (chatId, newStatus) => {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, status: newStatus } : c))
    );
  };

  const getUserInfo = (userId) => users.find((u) => u.id === userId) || {};

  return (
    <div className="min-h-screen bg-[#ffffffff] p-6 flex">

      {/* Outer White Container - LEFT ALIGNED */}
      <div className="w-full bg-white p-10 shadow-lg border border-gray-100">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-[#344767]">
          Selamat Datang, {currentAgency?.name}
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Berikut adalah ringkasan aktiviti chatbot untuk agensi anda.
        </p>


        {/* STAT CARDS */}
        <div className="grid grid-cols-4 gap-6 mt-10 mb-10">
          {[
            { label: "Jumlah Chat", value: stats.total, icon: <FaComments />, color: "#2196F3" },
            { label: "Chat Aktif", value: stats.aktif, icon: <FaSignal />, color: "#2196F3" },
            { label: "Chat Selesai", value: stats.selesai, icon: <FaCheckCircle />, color: "#2196F3" },
            { label: "Masa Respons Purata", value: "-", icon: <FaClock />, color: "#2196F3" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-2xl shadow-md border relative"
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: item.color }} />

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


        {/* CHAT TERKINI */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="font-bold text-2xl mb-2 text-[#344767]">
            Chat Terkini
          </h2>
          <p className="text-gray-500 mb-5">
            Aktiviti chat terbaru dari pengguna
          </p>

          {filtered.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              Tiada chat buat masa ini.
            </div>
          )}

          <div className="flex flex-col gap-5">
            {filtered.map((chat) => {
              const user = getUserInfo(chat.userId);
              const lastMsg = chat.messages[chat.messages.length - 1]?.text;

              return (
                <div
                  key={chat.id}
                  className="p-5 border rounded-xl shadow-sm bg-white flex justify-between items-start"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300" />

                    <div>
                      <div className="font-semibold text-lg text-[#344767]">
                        {chat.userName ||
                          user.name ||
                          user.fullname ||
                          user.username}
                      </div>

                      <div className="text-gray-500">{lastMsg}</div>
                      <div className="text-gray-400 text-sm mt-1">
                        {new Date(chat.updatedAt).toLocaleString("ms-MY")}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {/* STATUS DROPDOWN */}
                    <select
                      value={chat.status}
                      onChange={(e) => updateStatus(chat.id, e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="active">Aktif</option>
                      <option value="pending">Menunggu</option>
                      <option value="done">Selesai</option>
                    </select>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3">

                      {/* UPDATED YELLOW BUTTON */}
                      <button
                        onClick={() =>
                          navigate(`/agency/maklumat-asas/${chat.userId}`)
                        }
                        className="px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:brightness-110 transition"
                        style={{
                          backgroundColor: "#F7D343",
                          color: "#344767",
                        }}
                      >
                        Butiran Maklumat Asas
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/agency/chats/view/${chat.id}`)
                        }
                        className="px-4 py-1.5 bg-[#0A3D62] text-white rounded-lg text-sm hover:brightness-110"
                      >
                        Lihat Chat
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex gap-3 mt-8 justify-end">
          <button
            onClick={() => navigate("/agency/reports")}
            className="px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
            style={{
              backgroundColor: "#E5E7EB",
              color: "#ffffffff",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#F7D343")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0A3D62")}
          >
            Lihat Laporan Penuh
          </button>

          <button
            onClick={() => navigate("/agency/settings")}
            className="px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
            style={{
              backgroundColor: "#E5E7EB",
              color: "#ffffffff",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#F7D343")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0A3D62")}
          >
            Tetapan Chatbot
          </button>

          <button
            onClick={() => navigate("/agency/faq-categories")}
            className="px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
            style={{
              backgroundColor: "#E5E7EB",
              color: "#ffffffff",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#F7D343")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0A3D62")}
          >
            Kemaskini FAQ
          </button>

          </div>
        </div>
      </div>
    </div>
  );
}
