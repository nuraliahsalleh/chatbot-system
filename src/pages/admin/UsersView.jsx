// src/pages/admin/UsersView.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import {
  FaUser, FaIdCard, FaEnvelope, FaPhone, FaCheckCircle, FaCalendarAlt} from "react-icons/fa";


export default function UsersView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, chats } = usePublicUsers();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="p-10 bg-[#F8F9FC] min-h-screen">
        <p className="text-xl text-red-600 font-semibold">
          Pengguna tidak dijumpai.
        </p>
        <button
          className="mt-4 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
      </div>
    );
  }

  // Rekod chat pengguna
  const userChats = chats
    .filter((c) => c.userId === user.id)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  function translateStatus(status) {
    switch (status) {
      case "active":
        return "Aktif";
      case "pending":
        return "Menunggu";
      case "done":
        return "Selesai";
      default:
        return status;
    }
  }

  return (
    <div className="p-10 bg-[#F8F9FC] min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#344767] tracking-tight">
          Pengurusan Pengguna Awam
        </h2>

        <p className="text-gray-500 text-lg mt-2">
          Dashboard &gt; Pengurusan Pengguna Awam &gt; View
        </p>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT CARD */}
        <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-2xl">

          {/* SECTION HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-[#344767] rounded-md"></div>
            <h3 className="text-2xl font-semibold text-[#344767]">
              Maklumat Asas Pengguna
            </h3>
          </div>

          <div className="space-y-5 text-base">

            {/* INFO BLOCKS WITH ICONS */}
            {[
              ["Nama Penuh", user.name, <FaUser className="text-[#344767]" />],
              ["No. Kad Pengenalan", user.ic, <FaIdCard className="text-[#344767]" />],
              ["Email", <span className="text-blue-600 underline">{user.email}</span>, <FaEnvelope className="text-[#344767]" />],
              ["No. Telefon", user.phone, <FaPhone className="text-[#344767]" />],
            ].map(([label, value, icon], index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start gap-3"
              >
                <div className="text-xl">{icon}</div>

                <div>
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="text-lg text-[#344767] font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* STATUS */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <div>
                <p className="text-gray-500 text-sm">Status Akaun</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Aktif
                </span>
              </div>
            </div>

            {/* TARIKH DAFTAR */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start gap-3">
              <FaCalendarAlt className="text-[#344767] text-xl" />
              <div>
                <p className="text-gray-500 text-sm">Tarikh Daftar</p>
                <p className="text-lg text-[#344767]">
                  {new Date(user.createdAt).toLocaleDateString("ms-MY")}
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="
                mt-4 px-6 py-2 
                border border-gray-300 
                rounded-lg 
                transition 
                text-[#344767]
                hover:bg-[#344767] 
                hover:text-white
              "
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-2xl">

          {/* SECTION HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-[#344767] rounded-md"></div>
            <h3 className="text-2xl font-semibold text-[#344767]">
              Rekod Chat Terkini
            </h3>
          </div>

          {userChats.length === 0 ? (
            <p className="text-gray-500 text-base">Tiada rekod chat.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-base">

                <thead className="bg-[#344767]">
                  <tr className="text-[#ffffff] border-b">
                    <th className="py-4 px-4 font-semibold">Tarikh</th>
                    <th className="py-4 px-4 font-semibold">Agensi</th>
                    <th className="py-4 px-4 font-semibold">Servis</th>
                    <th className="py-4 px-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {userChats.map((chat, i) => (
                    <tr
                      key={i}
                      className={`transition ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="py-4 px-4">
                        {new Date(chat.updatedAt).toLocaleString("ms-MY")}
                      </td>

                      <td className="py-4 px-4 text-[#344767] font-medium">
                        {chat.agencyName}
                      </td>

                      <td className="py-4 px-4 text-gray-700">
                        {chat.serviceName || "-"}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            chat.status === "active"
                              ? "bg-green-100 text-green-700"
                              : chat.status === "done"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {translateStatus(chat.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
