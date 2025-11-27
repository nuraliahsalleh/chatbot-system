// src/pages/agency/ChatView.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useAgency } from "../../contexts/AgencyContext";

export default function ChatView() {
  const { id } = useParams();               // <-- CHAT ID dari URL
  const chatId = id;
  const navigate = useNavigate();

  const { chats, setChats, users } = usePublicUsers();
  const { currentAgency } = useAgency();

  // Cari chat berdasarkan ID
  const chat = chats.find((c) => c.id === chatId);

  // Jika chat tiada → kembali ke Dashboard
  if (!chat) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Chat tidak dijumpai.
        </h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/agency/dashboard")}
        >
          Kembali
        </button>
      </div>
    );
  }

  const userInfo = users.find((u) => u.id === chat.userId) || {};

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const messages = chat.messages || [];

  // Auto scroll bawah
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Pegawai hantar mesej
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      from: "agency",
      senderName: currentAgency.name,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: new Date().toISOString(),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );

    setInput("");
    scrollToBottom();
  };

  // === AVATARS ===
  const BotAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
      <span className="text-xl text-white">🏛️</span>
    </div>
  );

  const UserAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shadow">
      <span className="text-xl text-gray-700">👤</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4">

      {/* HEADER */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 border border-blue-200 flex items-center gap-3">
        <BotAvatar />
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            Chat Dengan {userInfo.name || "Pengguna"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Anda sedang berkomunikasi dengan pengguna awam.
          </p>
        </div>
      </div>

      {/* CHAT BOX */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col h-[70vh] mt-5 border border-blue-200 overflow-hidden">

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50/40">
          {messages.map((msg, i) => {
            const isAgency = msg.from === "agency";

            return (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  isAgency ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar kiri (user) */}
                {!isAgency && <UserAvatar />}

                {/* Bubble */}
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow ${
                    isAgency
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-700 border border-blue-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {isAgency ? currentAgency.name : userInfo.name}
                  </p>

                  <p className="text-sm">{msg.text}</p>

                  <div className="text-[10px] text-gray-300 mt-1 text-right">
                    {msg.time}
                  </div>
                </div>

                {/* Avatar kanan (agency) */}
                {isAgency && <BotAvatar />}
              </div>
            );
          })}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t bg-white flex gap-3 items-center">
          <input
            className="flex-1 border border-blue-300 rounded-full px-4 py-2 bg-blue-50/70 focus:outline-blue-400"
            placeholder="Taip mesej untuk pengguna..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full shadow-md"
            onClick={sendMessage}
          >
            Hantar
          </button>
        </div>
      </div>
    </div>
  );
}
