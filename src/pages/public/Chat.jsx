import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function Chat() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const chatId = query.get("chatId");

  const { currentUser, getChatsForUser } = usePublicUsers();
  const chats = currentUser ? getChatsForUser(currentUser.id) : [];
  const chat = chats.find((c) => c.id === chatId);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `Selamat datang ke Sistem Chat ${
        chat?.agencyName || "C360"
      }! Bagaimana saya boleh bantu anda hari ini?`,
      time: "09:00 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: "Baik, mesej anda telah diterima! (Dummy Response)",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  // === AVATARS ===
  const RobotAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-[#0A3D62] flex items-center justify-center shadow">
      <span className="text-xl text-white">🤖</span>
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
        <RobotAvatar />
        <div>
          <h2 className="text-2xl font-bold text-[#0A3D62]">
            {chat?.agencyName || "Chatbot C360"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Sila taip soalan anda. Chatbot akan membantu anda.
          </p>
        </div>
      </div>

      {/* CHAT BOX */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col h-[70vh] mt-5 border border-blue-200 overflow-hidden">

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50/40">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from === "bot" && <RobotAvatar />}

              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow ${
                  msg.from === "user"
                    ? "text-white rounded-br-none"
                    : "bg-white text-gray-700 border border-blue-100 rounded-bl-none"
                }`}
                style={{
                  backgroundColor: msg.from === "user" ? "#0A3D62" : "white",
                }}
              >
                <p className="text-sm">{msg.text}</p>
                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {msg.time}
                </div>
              </div>

              {msg.from === "user" && <UserAvatar />}
            </div>
          ))}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t bg-white flex gap-3 items-center">
          <input
            className="flex-1 border rounded-full px-4 py-2 bg-blue-50/70 focus:outline-none"
            style={{
              borderColor: "#0A3D62",
              boxShadow: "0 0 0 1px #0A3D62 inset",
            }}
            placeholder="Taip mesej anda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
            style={{ backgroundColor: "#0A3D62" }}
            onClick={sendMessage}
          >
            Hantar
          </button>
        </div>

      </div>
    </div>
  );
}
