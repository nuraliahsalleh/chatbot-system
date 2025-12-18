// src/pages/admin/Dashboard.jsx
import React from "react";
import { useAgency } from "../../contexts/AgencyContext";
import { FaBuilding, FaCheckCircle, FaBan, FaClipboardList } from "react-icons/fa";

export default function Dashboard() {
  const { agencies } = useAgency();

  const total = agencies.length;
  const aktif = agencies.filter((a) => a.status === "Aktif").length;
  const digantung = agencies.filter((a) => a.status === "Digantung").length;
  const dalam = agencies.filter((a) => a.status === "Dalam Permohonan").length;

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-10">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#344767] tracking-tight">
          Dashboard Admin
        </h2>

        <p className="text-gray-500 text-xl mt-3">
          Laporan keseluruhan status agensi berdaftar.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[
          { label: "Jumlah Agensi", value: total, icon: <FaBuilding size={26} /> },
          { label: "Agensi Aktif", value: aktif, icon: <FaCheckCircle size={26} /> },
          { label: "Agensi Digantung", value: digantung, icon: <FaBan size={26} /> },
          { label: "Dalam Permohonan", value: dalam, icon: <FaClipboardList size={26} /> },
        ].map((item, index) => (
          <div
            key={index}
            className="
              p-7 bg-white 
              border border-gray-200 
              shadow-sm hover:shadow-md transition
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-base font-medium">{item.label}</p>
                <h3 className="text-4xl font-bold text-[#344767] mt-1 tracking-tight">
                  {item.value}
                </h3>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 text-[#344767]">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

        {/* DUMMY PIE CHART */}
        <div className="p-10 bg-white border border-gray-200 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#344767] mb-5">Peratusan Status Agensi</h3>

          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full border-[18px] border-gray-200"></div>

            <div
              className="absolute inset-0 rounded-full border-[18px] border-[#2196F3]"
              style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
            ></div>

            <div
              className="absolute inset-0 rounded-full border-[18px] border-[#4CAF50]"
              style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
            ></div>

            <div
              className="absolute inset-0 rounded-full border-[18px] border-[#E53935]"
              style={{ clipPath: "polygon(50% 50%, 100% 100%, 0 100%)" }}
            ></div>
          </div>

          <div className="mt-5 text-sm text-gray-600 space-y-1">
            <p><span className="inline-block w-3 h-3 bg-[#2196F3] mr-2"></span>Aktif</p>
            <p><span className="inline-block w-3 h-3 bg-[#4CAF50] mr-2"></span>Permohonan</p>
            <p><span className="inline-block w-3 h-3 bg-[#E53935] mr-2"></span>Digantung</p>
          </div>
        </div>

        {/* DUMMY BAR CHART */}
        <div className="p-10 bg-white border border-gray-200 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#344767] mb-5">
            Jumlah Chat Mengikut Agensi Kerajaan
          </h3>

          <div className="flex items-end gap-4 h-40">
            <div className="w-10 bg-[#2196F3] rounded-t-lg" style={{ height: "85%" }}></div>
            <div className="w-10 bg-[#4CAF50] rounded-t-lg" style={{ height: "70%" }}></div>
            <div className="w-10 bg-[#E53935] rounded-t-lg" style={{ height: "40%" }}></div>
          </div>

          <div className="flex justify-between w-full px-2 mt-4 text-sm text-gray-600">
            <span>JPJ</span>
            <span>Imigresen</span>
            <span>JPN</span>
          </div>
        </div>


        {/* DUMMY TREND / LINE CHART */}
        <div className="p-10 bg-white border border-gray-200 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#344767] mb-5">Trend Pendaftaran Agensi</h3>

          <svg width="260" height="120">
            <polyline
              fill="none"
              stroke="#2196F3"
              strokeWidth="3"
              points="10,100 60,70 110,85 160,40 210,55 250,20"
            />
            {["10,100", "60,70", "110,85", "160,40", "210,55", "250,20"].map((p, i) => {
              const [x, y] = p.split(",");
              return (
                <circle key={i} cx={x} cy={y} r="5" fill="#2196F3" />
              );
            })}
          </svg>

          <p className="text-sm text-gray-600 mt-3">6 bulan terakhir</p>
        </div>

      </div>
    </div>
  );
}
