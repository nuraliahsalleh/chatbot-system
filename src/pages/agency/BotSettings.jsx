// src/pages/agency/BotSetting.jsx
import React, { useState } from "react";
import { useAgency } from "../../contexts/AgencyContext";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function BotSettings() {
  const { currentAgency, updateAgency } = useAgency();

  if (!currentAgency) {
    return <div className="p-6">Tiada data agensi ditemui.</div>;
  }

  const [form, setForm] = useState({
    name: currentAgency.name || "",
    code: currentAgency.code || "",
    logo: currentAgency.logo || "",
    services: currentAgency.services || [],
    serviceInput: "",
    description: currentAgency.description || "",
    phone: currentAgency.phone || "",
    email: currentAgency.email || "",
    apiType: currentAgency.apiType || "Normal API",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addService = () => {
    if (!form.serviceInput.trim()) return;
    update("services", [...form.services, form.serviceInput.trim()]);
    update("serviceInput", "");
  };

  const removeService = (index) => {
    update(
      "services",
      form.services.filter((_, i) => i !== index)
    );
  };

  const onSave = () => {
    updateAgency(currentAgency.id, {
      name: form.name,
      code: form.code,
      logo: form.logo,
      services: form.services,
      description: form.description,
      phone: form.phone,
      email: form.email,
      apiType: form.apiType,
    });
    alert("Perubahan berjaya disimpan!");
  };

  return (
    <div className="w-full bg-white p-10 shadow-lg border border-gray-100">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#344767]">
        Tetapan Chatbot
      </h1>
      <p className="text-gray-600 text-lg mt-2">
        Kemaskini maklumat asas chatbot dan konfigurasi agensi.
      </p>

      {/* MAIN CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10 relative">

        {/* BLUE BAR ON TOP */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#2196F3]" />

        {/* MAKLUMAT ASAS */}
        <h3 className="text-xl font-semibold text-[#344767] mb-4 mt-2">
          Maklumat Asas
        </h3>

        <label className="block mb-1 text-sm text-gray-600">Nama Agensi</label>
        <input
          className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 mb-3 focus:ring-2 focus:ring-[#0A3D62]"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <label className="block mb-1 text-sm text-gray-600">Logo (nama fail)</label>
        <input
          className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 mb-3 focus:ring-2 focus:ring-[#0A3D62]"
          value={form.logo}
          onChange={(e) => update("logo", e.target.value)}
        />

        <label className="block mb-1 text-sm text-gray-600">Kod Agensi</label>
        <input
          className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 mb-6 focus:ring-2 focus:ring-[#0A3D62]"
          value={form.code}
          onChange={(e) => update("code", e.target.value)}
        />


        {/* PERKHIDMATAN */}
        <h3 className="text-xl font-semibold text-[#344767] mb-4">
          Perkhidmatan
        </h3>

        <div className="flex gap-3">
          <input
            className="flex-1 border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0A3D62]"
            placeholder="Tambah perkhidmatan..."
            value={form.serviceInput}
            onChange={(e) => update("serviceInput", e.target.value)}
          />
          <button
            onClick={addService}
            className="px-4 py-3 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition bg-[#0A3D62] flex items-center gap-2"
          >
            <FaPlus /> Tambah
          </button>
        </div>

        {/* SERVICE TAGS */}
        <div className="flex flex-wrap gap-3 mt-4">
          {form.services.map((s, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 shadow-sm flex items-center gap-2 text-sm"
            >
              {s}
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeService(i)}
              >
                <FaTimes />
              </button>
            </span>
          ))}
        </div>

        <label className="block mt-5 mb-1 text-sm text-gray-600">Deskripsi</label>
        <textarea
          className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-[#0A3D62]"
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />


        {/* API SETTINGS */}
        <h3 className="text-xl font-semibold text-[#344767] mt-8 mb-4">
          Tetapan API
        </h3>

        <label className="block mb-1 text-sm text-gray-600">Jenis API</label>
        <select
          className="border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-[#0A3D62]"
          value={form.apiType}
          onChange={(e) => update("apiType", e.target.value)}
        >
          <option>Normal API</option>
          <option>Own API</option>
        </select>


        {/* LOGIN INFORMATION */}
        <h3 className="text-xl font-semibold text-[#344767] mt-10 mb-4">
          Maklumat Log Masuk
        </h3>

        <label className="block mb-1 text-sm text-gray-600">Email</label>
        <input
          className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 mb-3 focus:ring-2 focus:ring-[#0A3D62]"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <label className="block mb-1 text-sm text-gray-600">No. Telefon</label>
        <input
          className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 mb-6 focus:ring-2 focus:ring-[#0A3D62]"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />

        {/* SAVE BUTTON */}
        <button
          onClick={onSave}
          className="mt-6 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:brightness-110 transition"
          style={{ backgroundColor: "#0A3D62" }}
        >
          Simpan Perubahan
        </button>

      </div>
    </div>
  );
}
