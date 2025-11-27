import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function PublicRegister() {
  const navigate = useNavigate();
  const { addUser } = usePublicUsers();

  // Form state
  const [form, setForm] = useState({
    name: "",
    ic: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle field updates
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const { name, ic, email, phone, password, confirmPassword } = form;

    // Required checking
    if (!name || !ic || !email || !phone || !password || !confirmPassword) {
      alert("Sila isi semua ruangan bertanda * sebelum mendaftar.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Kata laluan dan pengesahan kata laluan tidak sama.");
      return;
    }

    // Save user into context
    // addUser({ name, ic, email, phone });
    addUser({ name, ic, email, phone, password });



    alert(
      "Pendaftaran berjaya! Sila ke halaman log masuk untuk mengakses akaun anda."
    );

    navigate("/public/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Daftar Akaun</h2>
        <p className="text-center text-gray-600 mb-6">
          Cipta akaun baharu untuk menggunakan platform
        </p>

        {/* Tabs */}
        <div className="flex w-full mb-6">
          <button className="w-1/2 py-2 font-medium rounded-l-lg bg-black text-white">
            Pengguna Awam
          </button>

          <button
            className="w-1/2 py-2 font-medium rounded-r-lg bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate("/agency/register")}
          >
            Agensi Kerajaan
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Penuh <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="Cth: Abu bin Ali"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* IC */}
          <div>
            <label className="block text-sm font-medium mb-1">
              No. Kad Pengenalan <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="Cth: 012345-67-8910"
              value={form.ic}
              onChange={(e) => updateField("ic", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="Cth: ahmad.rahman@gmail.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              No. Telefon <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="Cth: 0123456789"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Kata Laluan <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sah Kata Laluan <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
            onClick={handleSubmit}
          >
            Daftar
          </button>

          {/* Google Sign In */}
          <div className="mt-3 w-full flex justify-center">
            <button
              className="border px-4 py-2 rounded-lg w-full text-center hover:bg-gray-100"
              onClick={() =>
                alert(
                  "Integrasi Google belum disetkan. Anda boleh tambah Firebase Authentication jika mahu."
                )
              }
            >
              Sign in with Google
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm mt-2">
            Sudah ada akaun?{" "}
            <button
              onClick={() => navigate("/public/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Log masuk di sini
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

