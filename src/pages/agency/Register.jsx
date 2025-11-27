// src/pages/agency/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";

export default function Register() {
  const navigate = useNavigate();
  const { addAgency } = useAgency();

  const [form, setForm] = useState({
    name: "",
    category: "",
    code: "",
    services: [],
    serviceInput: "",
    logo: "", // we'll store file name only (no upload backend)
    description: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const addService = () => {
    const t = form.serviceInput.trim();
    if (!t) return;
    update("services", [...form.services, t]);
    update("serviceInput", "");
  };

  const removeService = (i) => {
    update(
      "services",
      form.services.filter((_, idx) => idx !== i)
    );
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (file) update("logo", file.name);
  };

  const validateRequired = () => {
    const required = [
      "name",
      "category",
      "code",
      "services",
      "logo",
      "description",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];
    for (const key of required) {
      if (key === "services") {
        if (!form.services.length) return false;
      } else if (!form[key] || form[key].toString().trim() === "") {
        return false;
      }
    }
    if (form.password !== form.confirmPassword) {
      alert("Kata laluan dan pengesahan kata laluan tidak sama.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateRequired()) {
      alert("Sila isi semua ruangan bertanda * sebelum menghantar permohonan.");
      return;
    }

    // Build payload
    const payload = {
      name: form.name,
      category: form.category,
      code: form.code,
      services: form.services,
      logo: form.logo,
      description: form.description,
      email: form.email,
      phone: form.phone,
      password: form.password, // in-memory only
    };

    console.log("Submitting form:", payload);


    addAgency(payload);

    alert(
      "Permohonan berjaya dihantar. Sila tunggu pengesahan / kelulusan daripada admin. Anda akan dimaklumkan apabila permohonan diluluskan."
    );

    // Redirect to agency login page (they must wait for admin approval)
    navigate("/agency/login");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Daftar Akaun</h2>
        <p className="text-center text-gray-600 mb-4">
          Cipta akaun baharu untuk menggunakan platform
        </p>

        {/* Tabs */}
        <div className="flex w-full mb-6">
          <button
            className="w-1/2 py-2 font-medium rounded-l-lg bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate("/public/register")}
          >
            Pengguna Awam
          </button>
          <button className="w-1/2 py-2 font-medium rounded-r-lg bg-black text-white">
            Agensi Kerajaan
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Nama Agensi */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Agensi <span className="text-red-500">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Jabatan Pendaftaran Negara"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <input
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="contoh: Percukaian, Pendaftaran Awam"
            />
          </div>

          {/* Kod */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Kod Agensi <span className="text-red-500">*</span>
            </label>
            <input
              value={form.code}
              onChange={(e) => update("code", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="JPN"
            />
          </div>

          {/* Services tag input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Senarai Perkhidmatan <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                value={form.serviceInput}
                onChange={(e) => update("serviceInput", e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Tambah perkhidmatan, contohnya: MyKad Application"
              />
              <button
                onClick={addService}
                className="px-3 py-2 bg-gray-200 rounded"
                type="button"
              >
                +
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {form.services.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
                >
                  <span>{s}</span>
                  <button
                    onClick={() => removeService(i)}
                    className="text-red-500"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Logo <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 items-center">
              <input type="file" onChange={handleLogo} />
              <div className="text-sm text-gray-600">
                {form.logo ? `Selected: ${form.logo}` : "png/jpg"}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Rasmi <span className="text-red-500">*</span>
            </label>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="cth: jpn@gov.my"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              No. Telefon <span className="text-red-500">*</span>
            </label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="cth: 07-22145678"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Kata Laluan <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Confirm */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sah Kata Laluan <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-lg mt-3"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}
