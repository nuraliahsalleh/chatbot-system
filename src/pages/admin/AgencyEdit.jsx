// src/pages/admin/AgencyEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";

export default function AgencyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agencies, updateAgency } = useAgency();

  const agency = agencies.find((a) => a.id === id);
  const [status, setStatus] = useState(agency?.status || "Dalam Permohonan");

  useEffect(() => {
    if (agency) setStatus(agency.status);
  }, [agency]);

  if (!agency) {
    return (
      <div className="p-6">
        <div className="text-red-500">Permohonan tidak ditemui.</div>
      </div>
    );
  }

  const handleConfirm = () => {
    const ok = window.confirm("Anda pasti ingin mengesahkan semua perubahan permohonan?");
    if (!ok) return;

    updateAgency(id, { status });

    alert("Admin telah mengemaskini status permohonan. Tindakan selesai.");
    navigate("/admin/agencies");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Agensi</h2>

      <div className="bg-white border rounded p-4 max-w-2xl">
        {/* Display all fields (read-only) */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Nama Agensi</label>
            <input value={agency.name} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium">Kategori Perkhidmatan</label>
            <input value={agency.category} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium">Kod Agensi</label>
            <input value={agency.code} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium">Senarai Perkhidmatan</label>
            <div className="flex gap-2 flex-wrap">
              {agency.services.map((s, i) => (
                <div key={i} className="px-3 py-1 bg-gray-100 rounded-full">{s}</div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Logo</label>
            <div className="mt-2 p-2 border rounded bg-white max-w-xs">
              {agency.logo ? <div className="text-sm">{agency.logo}</div> : <div className="text-sm text-gray-400">No logo</div>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea value={agency.description} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input value={agency.email} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium">No. Telefon</label>
              <input value={agency.phone} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" />
            </div>
          </div>

          {/* Status dropdown */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="Dalam Permohonan">Dalam Permohonan</option>
              <option value="Aktif">Aktif</option>
              <option value="Digantung">Digantung</option>
            </select>
          </div>

          <div className="flex gap-3 mt-3">
            <button onClick={handleConfirm} className="px-4 py-2 bg-black text-white rounded">
              Sahkan
            </button>
            <button onClick={() => navigate("/admin/agencies")} className="px-4 py-2 border rounded">
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
