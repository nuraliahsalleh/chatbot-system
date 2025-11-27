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
      <div className="p-6">
        <p className="text-lg text-red-600">Maklumat pengguna tidak dijumpai.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
      </div>
    );
  }

  // Rekod chat sebenar untuk pengguna ini
  const userChats = chats
    .filter((c) => c.userId === user.id)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Maklumat Asas Pengguna Awam</h2>
      <p className="text-gray-500 mb-6">
        Dashboard &gt; Maklumat Pengguna
      </p>

      <div className="grid grid-cols-2 gap-6">

        {/* ================= LEFT ================= */}
        <div className="p-5 bg-white shadow rounded border">
          <h3 className="font-semibold text-lg mb-4">
            Butiran Maklumat Asas
          </h3>

          <p className="text-sm font-semibold mt-2">Nama Penuh</p>
          <p>{user.name}</p>

          <p className="text-sm font-semibold mt-2">No. Kad Pengenalan</p>
          <p>{user.ic}</p>

          <p className="text-sm font-semibold mt-2">Email</p>
          <p>{user.email}</p>

          <p className="text-sm font-semibold mt-2">No. Telefon</p>
          <p>{user.phone}</p>

          <p className="text-sm font-semibold mt-2">Status Akaun</p>
          <p className="text-green-600">Aktif</p>

          <p className="text-sm font-semibold mt-2">Tarikh Daftar</p>
          <p>{new Date(user.createdAt).toLocaleDateString("ms-MY")}</p>

          <button
            className="mt-6 px-4 py-2 bg-gray-300 rounded"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="p-5 bg-white shadow rounded border">
          <h3 className="font-semibold text-lg mb-4">Rekod Chat Terkini</h3>

          {userChats.length === 0 ? (
            <p className="text-gray-500">Tiada rekod chat.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2">Tarikh</th>
                  <th className="p-2">Agensi</th>
                  <th className="p-2">Servis</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {userChats.map((chat, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">
                      {new Date(chat.updatedAt).toLocaleString("ms-MY")}
                    </td>

                    <td className="p-2">{chat.agencyName}</td>

                    <td className="p-2">{chat.serviceName || "-"}</td>

                    <td
                      className={`p-2 font-semibold ${
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
