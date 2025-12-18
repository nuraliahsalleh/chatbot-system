import React, { useState, useEffect } from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import dashboardLogo from "../../assets/logoConnect2.png";

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
    <div className="min-h-screen bg-[#ffffffff] p-6 flex justify-center">

      {/* Outer Container (Same Style as Dashboard.jsx) */}
      <div className="w-full max-w-5xl bg-white shadow-lg p-10 border border-gray-100">

        {/* Header - Same Structure */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-[#344767]">
              Pengurusan Profil
            </h2>

            <p className="text-gray-600 text-lg">
              Kemaskini maklumat akaun anda di sini.
            </p>
          </div>

          {/* Logo on Right */}
          <img
            src={dashboardLogo}
            alt="Profile Logo"
            className="h-9 object-contain opacity-90 animate-pulse"
          />
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">

          {/* Top Highlight Bar */}
          <div
            className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
            style={{ backgroundColor: "#2196F3" }}
          ></div>

          <h3 className="font-bold text-2xl mb-5 text-[#344767] border-b pb-3">
            Maklumat Asas
          </h3>

          {/* Full Name */}
          <label className="block text-sm font-medium text-[#344767] mt-4">
            Nama Penuh *
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border w-full px-4 py-2 rounded-lg bg-gray-50 mt-1 
                       focus:ring-2 focus:ring-[#0A3D62] outline-none"
          />

          {/* IC */}
          <label className="block text-sm font-medium text-[#344767] mt-4">
            No. Kad Pengenalan *
          </label>
          <input
            value={form.ic}
            onChange={(e) => setForm({ ...form, ic: e.target.value })}
            className="border w-full px-4 py-2 rounded-lg bg-gray-50 mt-1 
                       focus:ring-2 focus:ring-[#0A3D62] outline-none"
          />

          {/* Email */}
          <label className="block text-sm font-medium text-[#344767] mt-4">
            Email *
          </label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border w-full px-4 py-2 rounded-lg bg-gray-50 mt-1 
                       focus:ring-2 focus:ring-[#0A3D62] outline-none"
          />

          {/* Phone */}
          <label className="block text-sm font-medium text-[#344767] mt-4">
            No. Telefon *
          </label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border w-full px-4 py-2 rounded-lg bg-gray-50 mt-1 
                       focus:ring-2 focus:ring-[#0A3D62] outline-none"
          />

          {/* Password */}
          <label className="block text-sm font-medium text-[#344767] mt-4">
            Kata Laluan *
          </label>
          <input
            type="password"
            value={form.password}
            readOnly
            className="border w-full px-4 py-2 rounded-lg bg-gray-200 mt-1"
          />

          {/* New Password */}
          <label className="block text-sm font-medium text-[#344767] mt-4">
            Kata Laluan Baru *
          </label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            className="border w-full px-4 py-2 rounded-lg bg-gray-50 mt-1
                       focus:ring-2 focus:ring-[#0A3D62] outline-none"
          />

          {/* Save Button  */}
          <button
            onClick={handleSave}
            className="mt-6 px-6 py-2 rounded-lg text-white font-semibold shadow-md
                       hover:brightness-110 transition"
            style={{ backgroundColor: "#0A3D62" }}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
