

import React, { useState } from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { users } = usePublicUsers();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Pengurusan Pengguna Awam</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Jumlah Pengguna Berdaftar</div>
          <div className="text-2xl font-bold mt-2">{users.length}</div>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Pengguna Aktif</div>
          <div className="text-2xl font-bold mt-2">
            {Math.floor(users.length * 0.6)}
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Pengguna Baru Tahun Ini</div>
          <div className="text-2xl font-bold mt-2">
            {Math.floor(users.length * 0.3)}
          </div>
        </div>
      </div>

      {/* Table header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <label>Jumlah</label>
          <select className="border px-2 py-1 rounded">
            <option>150</option>
            <option>100</option>
            <option>50</option>
          </select>
          <button className="border px-3 py-1 rounded bg-white shadow">
            Excel
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label>Search:</label>
          <input
            className="border rounded px-2 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pengguna…"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3">Nama Pengguna</th>
              <th className="p-3">Email</th>
              <th className="p-3">Jumlah Chat</th>
              <th className="p-3">Agensi</th>
              <th className="p-3">Tindakan</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Tiada pengguna dijumpai.
                </td>
              </tr>
            )}

            {filtered.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.name}</td>
                <td className="p-3 text-blue-600 underline">{u.email}</td>
                <td className="p-3">{u.totalChat}</td>
                <td className="p-3">{u.agencies.join(", ")}</td>
                <td className="p-3">
                  <button
                    className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                    onClick={() => navigate(`/admin/users/view/${u.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-right text-sm text-gray-600">
        Paparan: 1–{filtered.length} daripada {users.length}
      </div>
    </div>
  );
}
