import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAgency } from "../../contexts/AgencyContext";
import { FaBuilding, FaCheckCircle, FaBan, FaClipboardList } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function Agencies() {
  const { agencies } = useAgency();
  const navigate = useNavigate();

  // Search filter
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Agencies loaded:", agencies);
  }, [agencies]);

  // Filtered list
  const filteredAgencies = agencies.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

    const exportToExcel = () => {
    const data = filteredAgencies.map((item) => ({
      "Nama Agensi": item.name,
      "Kategori": item.category,
      "Email": item.email,
      "No. Telefon": item.phone,
      "Perkhidmatan": item.services?.join(", "),
      "Status": item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agensi");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "Senarai_Agensi.xlsx");
  };


  return (
    <div className="p-10 bg-[#F8F9FC] min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#344767] tracking-tight">
          Pengurusan Agensi
        </h2>

        <p className="text-gray-500 text-xl mt-3">
          Senarai dan maklumat status agensi berdaftar.
        </p>
      </div>

      {/* STATISTIK AGENSI */}
      <div className="bg-white border border-gray-200 p-6 shadow-sm mb-8">
        <h3 className="text-2xl font-semibold text-[#344767] mb-4">
          Statistik Agensi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Jumlah Agensi */}
          <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-base">Jumlah Agensi Berdaftar</p>
              <p className="text-3xl font-bold text-[#344767] mt-1">{agencies.length}</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
              <FaBuilding size={26} />
            </div>
          </div>

          {/* Agensi Aktif */}
          <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-base">Agensi Aktif</p>
              <p className="text-3xl font-bold text-[#344767] mt-1">
                {agencies.filter((a) => a.status === "Aktif").length}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200 text-gray-600 shadow-sm">
              <FaCheckCircle size={26} />
            </div>
          </div>

          {/* Agensi Dalam Permohonan */}
          <div className="p-5 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-base">Agensi Dalam Permohonan</p>
              <p className="text-3xl font-bold text-[#344767] mt-1">
                {agencies.filter((a) => a.status === "Dalam Permohonan").length}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200 text-[#344767] shadow-sm">
              <FaClipboardList size={26} />
            </div>
          </div>

        </div>
      </div>


      {/* SENARAI AGENSI HEADER */}
      <div className="bg-white border border-gray-200 p-6 shadow-sm mb-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <h3 className="text-2xl font-semibold text-[#344767]">
            Senarai Agensi
          </h3>

          {/* TOOLS BAR */}
          <div className="flex items-center gap-4 flex-wrap">

            {/* Amount dropdown */}
            <div className="flex items-center gap-3 text-base">
              <span>Jumlah</span>
              <select className="border border-gray-300 px-3 py-1 bg-white text-base">
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>Semua</option>
              </select>
            </div>

            {/* Excel Export */}
            <button
              className="px-4 py-2 bg-gray-100 border border-gray-300 text-base hover:bg-gray-200 transition"
              onClick={exportToExcel}
            >
              Excel
            </button>


            {/* SEARCH BOX */}
            <div className="flex items-center gap-2 text-base">
              <span>Search:</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-white text-base"
                placeholder="Cari agensi..."
              />
            </div>

          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 shadow-sm p-6">

        <div className="overflow-x-auto">
          <table className="w-full text-left text-base">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-3 font-semibold text-[#344767]">Nama Agensi</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Kategori</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Email</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">No. Telefon</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Senarai Perkhidmatan</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Status</th>
                <th className="py-3 px-3 font-semibold text-[#344767]">Tindakan</th>
              </tr>
            </thead>

            <tbody>
              {filteredAgencies.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center text-gray-500 italic text-lg"
                  >
                    Tiada permohonan agensi dijumpai.
                  </td>
                </tr>
              )}

              {filteredAgencies.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-3">{a.name}</td>
                  <td className="py-3 px-3">{a.category}</td>
                  <td className="py-3 px-3">{a.email}</td>
                  <td className="py-3 px-3">{a.phone}</td>

                  <td className="py-3 px-3 text-gray-700">
                    {a.services?.slice(0, 2).join(", ")}
                    {a.services?.length > 2 ? ` +${a.services.length - 2}` : ""}
                  </td>

                  <td className="py-3 px-3 font-semibold">
                    <span
                      className={
                        a.status === "Aktif"
                          ? "text-green-600"
                          : a.status === "Digantung"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <button
                      className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 transition text-base"
                      onClick={() => navigate(`/admin/agencies/edit/${a.id}`)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
