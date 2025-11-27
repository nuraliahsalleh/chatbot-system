import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";

export default function Agencies() {
  const { agencies } = useAgency();
  const navigate = useNavigate();

  // Search filter
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Agencies loaded:", agencies);
  }, [agencies]);

  // Filtered list
  const filteredAgencies = agencies.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pengurusan Agensi</h2>

      {/* Statistik Agensi */}
      <div className="p-4 border rounded bg-white mb-6">
        <div className="text-sm text-gray-500 mb-2">Statistik Agensi</div>

        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="p-4 border rounded bg-gray-50">
            Jumlah Agensi Berdaftar: <span className="font-bold">{agencies.length}</span>
          </div>

          <div className="p-4 border rounded bg-gray-50">
            Agensi Aktif:{" "}
            <span className="font-bold">
              {agencies.filter((a) => a.status === "Aktif").length}
            </span>
          </div>

          <div className="p-4 border rounded bg-gray-50">
            Agensi Dalam Permohonan:{" "}
            <span className="font-bold">
              {agencies.filter((a) => a.status === "Dalam Permohonan").length}
            </span>
          </div>
        </div>
      </div>

      {/* Senarai Agensi Header */}
      <div className="bg-white border rounded p-4 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Senarai Agensi</h3>

          <div className="flex items-center gap-3">
            {/* Amount dropdown (UI only) */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Jumlah</span>
              <select className="border px-2 py-1 rounded text-sm">
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>Semua</option>
              </select>
            </div>

            {/* Excel export placeholder */}
            <button className="px-3 py-1 border rounded bg-gray-100 text-sm hover:bg-gray-200">
              Excel
            </button>

            {/* Search */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Search:</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
                placeholder="Cari agensi..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded p-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Nama Agensi</th>
                <th className="py-2">Kategori</th>
                <th className="py-2">Email</th>
                <th className="py-2">No. Telefon</th>
                <th className="py-2">Senarai Perkhidmatan</th>
                <th className="py-2">Status</th>
                <th className="py-2">Tindakan</th>
              </tr>
            </thead>

            <tbody>
              {filteredAgencies.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    Tiada permohonan agensi dijumpai.
                  </td>
                </tr>
              )}

              {filteredAgencies.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="py-2">{a.name}</td>
                  <td className="py-2">{a.category}</td>
                  <td className="py-2">{a.email}</td>
                  <td className="py-2">{a.phone}</td>
                  <td className="py-2">
                    {a.services?.slice(0, 2).join(", ")}
                    {a.services?.length > 2 ? ` +${a.services.length - 2}` : ""}
                  </td>

                  <td className="py-2 font-semibold">
                    <span
                      className={
                        a.status === "Aktif"
                          ? "text-green-600"
                          : a.status === "Digantung"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="py-2">
                    <button
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                      onClick={() => navigate(`/admin/agencies/edit/${a.id}`)}
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
