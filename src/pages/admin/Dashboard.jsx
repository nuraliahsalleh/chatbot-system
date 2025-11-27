// src/pages/admin/Dashboard.jsx
import React from "react";
import { useAgency } from "../../contexts/AgencyContext";

export default function Dashboard() {
  const { agencies } = useAgency();

  const total = agencies.length;
  const aktif = agencies.filter((a) => a.status === "Aktif").length;
  const digantung = agencies.filter((a) => a.status === "Digantung").length;
  const dalam = agencies.filter((a) => a.status === "Dalam Permohonan").length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border rounded bg-white">
          <div className="text-sm text-gray-500">Jumlah Agensi Berdaftar</div>
          <div className="text-xl font-semibold">{total}</div>
        </div>
        <div className="p-4 border rounded bg-white">
          <div className="text-sm text-gray-500">Agensi Aktif</div>
          <div className="text-xl font-semibold">{aktif}</div>
        </div>
        <div className="p-4 border rounded bg-white">
          <div className="text-sm text-gray-500">Agensi Digantung</div>
          <div className="text-xl font-semibold">{digantung}</div>
        </div>
        <div className="p-4 border rounded bg-white">
          <div className="text-sm text-gray-500">Dalam Permohonan</div>
          <div className="text-xl font-semibold">{dalam}</div>
        </div>
      </div>

      {/* Placeholder charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-48 border rounded bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">[Chart placeholder — pie]</div>
        </div>
        <div className="h-48 border rounded bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">[Chart placeholder — bar]</div>
        </div>
        <div className="h-48 border rounded bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">[Chart placeholder — trend]</div>
        </div>
      </div>
    </div>
  );
}
