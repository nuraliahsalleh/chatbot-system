// src/pages/agency/BotSetting.jsx
import React, { useState } from "react";
import { useAgency } from "../../contexts/AgencyContext";

export default function BotSettings() {
  const { currentAgency, updateAgency } = useAgency();

  if (!currentAgency) {
    return <div className="p-6">Tiada data agensi ditemui.</div>;
  }

  // Fill form with existing agency data
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tetapan Chatbot</h2>

      <div className="bg-white p-6 rounded shadow space-y-8">

        {/* Maklumat Asas */}
        <section>
          <h3 className="font-semibold mb-2">Maklumat Asas</h3>

          <label className="block mb-1 text-sm">Nama Agensi</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <label className="block mb-1 text-sm">Logo (fail name)</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            value={form.logo}
            onChange={(e) => update("logo", e.target.value)}
          />

          <label className="block mb-1 text-sm">Kod Agensi</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={form.code}
            onChange={(e) => update("code", e.target.value)}
          />
        </section>

        {/* Perkhidmatan */}
        <section>
          <h3 className="font-semibold mb-2">Perkhidmatan</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Tambah perkhidmatan..."
              value={form.serviceInput}
              onChange={(e) => update("serviceInput", e.target.value)}
            />
            <button
              onClick={addService}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {form.services.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
              >
                {s}
                <button
                  className="text-red-500"
                  onClick={() => removeService(i)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <label className="block mt-4 mb-1 text-sm">Deskripsi</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </section>

        {/* Log Masuk */}
        <section>
          <h3 className="font-semibold mb-2">Maklumat Log Masuk</h3>

          <label className="block mb-1 text-sm">Email</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <label className="block mb-1 text-sm">No. Telefon</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </section>

        {/* Tetapan API */}
        <section>
          <h3 className="font-semibold mb-2">Tetapan API</h3>

          <label className="block mb-1 text-sm">Jenis API</label>
          <select
            className="border px-3 py-2 rounded w-full"
            value={form.apiType}
            onChange={(e) => update("apiType", e.target.value)}
          >
            <option>Normal API</option>
            <option>Own API</option>
          </select>
        </section>

        <button
          onClick={onSave}
          className="px-6 py-2 bg-black text-white rounded"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
