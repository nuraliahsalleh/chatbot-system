// src/pages/admin/AgencyEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";
import {
  FaBuilding,
  FaClipboardList,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

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
      <div className="p-10 bg-[#F8F9FC] min-h-screen">
        <div className="text-red-600 text-xl font-semibold">
          Permohonan tidak ditemui.
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    const ok = window.confirm(
      "Anda pasti ingin mengesahkan semua perubahan permohonan?"
    );
    if (!ok) return;

    updateAgency(id, { status });

    alert("Admin telah mengemaskini status permohonan. Tindakan selesai.");
    navigate("/admin/agencies");
  };

  return (
    <div className="p-10 bg-[#F8F9FC] min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#344767] tracking-tight">
          Kemaskini Agensi
        </h2>
        <p className="text-gray-500 text-lg mt-2">
          Semak dan kemaskini maklumat permohonan agensi.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white border border-gray-200 shadow-sm p-10 rounded-2xl max-w-4xl">

        {/* SECTION TITLE */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-9 bg-[#344767] rounded-md"></div>
          <h3 className="text-2xl font-semibold text-[#344767]">
            Maklumat Permohonan Agensi
          </h3>
        </div>

        {/* FIELD BLOCKS */}
        <div className="space-y-7">

          {/* Nama Agensi */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Nama Agensi
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 flex items-center gap-3">
              <FaBuilding className="text-[#344767]" />
              <span className="text-lg">{agency.name}</span>
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Kategori Perkhidmatan
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 flex items-center gap-3">
              <FaClipboardList className="text-[#344767]" />
              <span className="text-lg">{agency.category}</span>
            </div>
          </div>

          {/* Kod Agensi */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Kod Agensi
            </label>
            <input
              value={agency.code}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 text-lg"
            />
          </div>

          {/* Senarai Perkhidmatan */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Senarai Perkhidmatan
            </label>
            <div className="flex flex-wrap gap-3 mt-3">
              {agency.services.map((s, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Logo
            </label>
            <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              {agency.logo ? (
                <span className="text-[#344767]">{agency.logo}</span>
              ) : (
                <span className="text-gray-400">Tiada logo</span>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Deskripsi
            </label>
            <textarea
              value={agency.description}
              readOnly
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-base font-semibold text-[#344767]">
                Email
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 flex items-center gap-3">
                <FaEnvelope className="text-[#344767]" />
                <span>{agency.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#344767]">
                No. Telefon
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 flex items-center gap-3">
                <FaPhone className="text-[#344767]" />
                <span>{agency.phone}</span>
              </div>
            </div>

          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-base font-semibold text-[#344767]">
              Status Permohonan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 mt-2 bg-white"
            >
              <option value="Dalam Permohonan">Dalam Permohonan</option>
              <option value="Aktif">Aktif</option>
              <option value="Digantung">Digantung</option>
            </select>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-[#344767] text-white rounded-lg shadow hover:bg-[#2d3c59] transition"
          >
            Sahkan Perubahan
          </button>

          <button
            onClick={() => navigate("/admin/agencies")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Batal
          </button>
        </div>

      </div>
    </div>
  );
}
