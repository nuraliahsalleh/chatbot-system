import React, { useState, useEffect } from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";

export default function PublicProfile() {
  const { currentUser, updateUser } = usePublicUsers();

  const [form, setForm] = useState({
    name: "",
    ic: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
  });

  // Load user data into form
  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        ic: currentUser.ic,
        email: currentUser.email,
        phone: currentUser.phone,
        password: currentUser.password || "",
        newPassword: "",
      });
    }
  }, [currentUser]);

  // If no user logged in
  if (!currentUser) {
    return (
      <div className="p-6 text-center text-gray-600">
        Anda belum log masuk.
      </div>
    );
  }

  // Save changes
  const handleSave = () => {
    // If new password empty, keep old password
    const updated = {
      ...form,
      password: form.newPassword !== "" ? form.newPassword : form.password,
    };

    updateUser(currentUser.id, updated);
    alert("Profil berjaya dikemas kini!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">

      {/* Header */}
      <h2 className="text-2xl font-bold">Pengurusan Profil</h2>
      <p className="text-gray-600 mb-6">Utama &gt; Pengurusan Profil</p>

      {/* Instruction */}
      <p className="font-semibold mb-2">Kemaskini profil anda dibawah</p>

      <div className="border rounded-lg bg-white p-6">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">
          Maklumat Asas
        </h3>

        {/* Full Name */}
        <label className="block text-sm font-medium mt-3">
          Nama Penuh *
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border w-full px-3 py-2 rounded bg-gray-50"
        />

        {/* IC */}
        <label className="block text-sm font-medium mt-3">
          No. Kad Pengenalan *
        </label>
        <input
          value={form.ic}
          onChange={(e) => setForm({ ...form, ic: e.target.value })}
          className="border w-full px-3 py-2 rounded bg-gray-50"
        />

        {/* Email */}
        <label className="block text-sm font-medium mt-3">
          Email *
        </label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border w-full px-3 py-2 rounded bg-gray-50"
        />

        {/* Phone */}
        <label className="block text-sm font-medium mt-3">
          No. Telefon *
        </label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border w-full px-3 py-2 rounded bg-gray-50"
        />

        {/* Password */}
        <label className="block text-sm font-medium mt-3">
          Kata Laluan *
        </label>
        <input
          type="password"
          value={form.password}
          readOnly
          className="border w-full px-3 py-2 rounded bg-gray-200"
        />

        {/* New password */}
        <label className="block text-sm font-medium mt-3">
          Kata Laluan Baru *
        </label>
        <input
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="border w-full px-3 py-2 rounded bg-gray-50"
        />

        <button
          onClick={handleSave}
          className="mt-5 bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
