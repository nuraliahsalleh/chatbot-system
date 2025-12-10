import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useAgency } from "../../contexts/AgencyContext";

export default function MaklumatAsas() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, chats } = usePublicUsers();
  const { currentAgency } = useAgency();

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="w-full bg-white p-10 shadow-lg border rounded-2xl">
        <p className="text-lg text-red-600">Maklumat pengguna tidak dijumpai.</p>
        <button
          className="mt-4 px-4 py-2 bg-[#0A3D62] text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
      </div>
    );
  }

  const userChats = chats
    .filter((c) => c.userId === user.id)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="w-full bg-white p-10 shadow-lg border border-gray-100 rounded-2xl">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#344767]">
        Maklumat Asas Pengguna Awam
      </h1>
      <p className="text-gray-600 text-lg mt-2">
        Dashboard &gt; Maklumat Pengguna
      </p>

      <div className="grid grid-cols-2 gap-10 mt-10">

        {/* LEFT SECTION: USER INFO */}
        <div className="p-8 bg-white rounded-2xl shadow-md border relative">
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: "#F7D343" }}
          ></div>

          <h3 className="font-bold text-2xl mb-4 text-[#344767]">
            Butiran Maklumat Asas
          </h3>

          <div className="text-gray-600 text-md">

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">Nama Penuh</p>
              <p className="text-lg text-[#344767]">{user.name}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">No. Kad Pengenalan</p>
              <p className="text-lg text-[#344767]">{user.ic}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">Email</p>
              <p className="text-lg text-[#344767]">{user.email}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">No. Telefon</p>
              <p className="text-lg text-[#344767]">{user.phone}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">Status Akaun</p>
              <p className="text-green-600 font-semibold">Aktif</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">Tarikh Daftar</p>
              <p className="text-lg text-[#344767]">
                {new Date(user.createdAt).toLocaleDateString("ms-MY")}
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:brightness-110 transition"
            style={{
              backgroundColor: "#F7D343",
              color: "#344767",
            }}
          >
            Kembali
          </button>
        </div>

        {/* RIGHT SECTION: CHAT RECORDS */}
        <div className="p-8 bg-white rounded-2xl shadow-md border relative">
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: "#F7D343" }}
          ></div>

          <h3 className="font-bold text-2xl mb-2 text-[#344767]">
            Rekod Chat Terkini
          </h3>
          <p className="text-gray-500 mb-5">
            Aktiviti chat terbaru pengguna
          </p>

          {userChats.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              Tiada rekod chat.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ backgroundColor: "#A7CCF5" }}>
                  <th className="p-3 text-gray-600">Tarikh</th>
                  <th className="p-3 text-gray-600">Agensi</th>
                  <th className="p-3 text-gray-600">Servis</th>
                  <th className="p-3 text-gray-600">Status</th>
                </tr>
              </thead>

              <tbody>
                {userChats.map((chat, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3 text-[#344767]">
                      {new Date(chat.updatedAt).toLocaleString("ms-MY")}
                    </td>

                    <td className="p-3 text-[#344767]">{chat.agencyName}</td>

                    <td className="p-3 text-[#344767]">
                      {chat.serviceName || "-"}
                    </td>

                    <td
                      className={`p-3 font-semibold ${
                        chat.status === "active"
                          ? "text-green-600"
                          : chat.status === "done"
                          ? "text-blue-600"
                          : "text-orange-500"
                      }`}
                    >
                      {chat.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
