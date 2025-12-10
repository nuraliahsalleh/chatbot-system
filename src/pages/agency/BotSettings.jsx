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
    <div className="p-6 bg-[#ffffff] min-h-screen">
      <h2 className="text-3xl font-bold text-[#344767] mb-6">
        Tetapan Chatbot
      </h2>

      <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 space-y-10">

        {/* Maklumat Asas */}
        <section>
          <h3 className="font-semibold text-xl text-[#344767] mb-4">
            Maklumat Asas
          </h3>

          <label className="block mb-1 text-sm text-gray-600">
            Nama Agensi
          </label>
          <input
            className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <label className="block mt-4 mb-1 text-sm text-gray-600">
            Logo (nama fail)
          </label>
          <input
            className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.logo}
            onChange={(e) => update("logo", e.target.value)}
          />

          <label className="block mt-4 mb-1 text-sm text-gray-600">
            Kod Agensi
          </label>
          <input
            className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.code}
            onChange={(e) => update("code", e.target.value)}
          />
        </section>

        {/* Perkhidmatan */}
        <section>
          <h3 className="font-semibold text-xl text-[#344767] mb-4">
            Perkhidmatan
          </h3>

          <div className="flex gap-3">
            <input
              className="flex-1 border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Tambah perkhidmatan..."
              value={form.serviceInput}
              onChange={(e) => update("serviceInput", e.target.value)}
            />

            <button
              onClick={addService}
              className="px-4 py-2 rounded-xl bg-[#0A3D62] text-white shadow-sm hover:brightness-110 transition flex items-center gap-2"
            >
              <FaPlus /> Tambah
            </button>
          </div>

          {/* SERVICE TAGS */}
          <div className="flex flex-wrap gap-3 mt-4">
            {form.services.map((s, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-gray-100 shadow-sm flex items-center gap-2 text-sm"
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

          <label className="block mt-5 mb-1 text-sm text-gray-600">
            Deskripsi
          </label>
          <textarea
            className="w-full border rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </section>

        {/* Log Masuk */}
        <section>
          <h3 className="font-semibold text-xl text-[#344767] mb-4">
            Maklumat Log Masuk
          </h3>

          <label className="block mb-1 text-sm text-gray-600">
            Email
          </label>
          <input
            className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <label className="block mt-4 mb-1 text-sm text-gray-600">
            No. Telefon
          </label>
          <input
            className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </section>

        {/* Tetapan API */}
        <section>
          <h3 className="font-semibold text-xl text-[#344767] mb-4">
            Tetapan API
          </h3>

          <label className="block mb-1 text-sm text-gray-600">
            Jenis API
          </label>
          <select
            className="border rounded-xl px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.apiType}
            onChange={(e) => update("apiType", e.target.value)}
          >
            <option>Normal API</option>
            <option>Own API</option>
          </select>
        </section>

        {/* SAVE BUTTON */}
        <button
          onClick={onSave}
          className="px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:brightness-110 transition"
          style={{ backgroundColor: "#0A3D62" }}
        >
          Simpan Perubahan
        </button>

      </div>
    </div>
  );
}
