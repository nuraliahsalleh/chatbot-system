
// src/pages/agency/Dashboard.jsx
import React, { useMemo } from "react";
import { usePublicUsers } from "../../contexts/PublicUserContext";
import { useAgency } from "../../contexts/AgencyContext";
import { useNavigate } from "react-router-dom";

export default function AgencyDashboard() {
  const { chats, users, setChats } = usePublicUsers();
  const { currentAgency } = useAgency();
  const navigate = useNavigate();

  const agencyId = currentAgency?.id;

  const filtered = useMemo(() => {
  if (!agencyId) return [];

  const agencyChats = chats
    .filter((c) => c.agencyId === agencyId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Group chats by userId → keep latest chat only
  const uniqueByUser = Object.values(
    agencyChats.reduce((acc, chat) => {
      if (!acc[chat.userId]) {
        acc[chat.userId] = chat;
      } else {
        // Keep the latest chat for each user
        const prev = acc[chat.userId];
        if (new Date(chat.updatedAt) > new Date(prev.updatedAt)) {
          acc[chat.userId] = chat;
        }
      }
      return acc;
    }, {})
  );

  return uniqueByUser;
}, [chats, agencyId]);


  // Stats counter
  const stats = useMemo(() => {
    const total = filtered.length;
    const aktif = filtered.filter((c) => c.status === "active").length;
    const selesai = filtered.filter((c) => c.status === "done").length;
    return { total, aktif, selesai };
  }, [filtered]);

  // Change status
  function updateStatus(chatId, newStatus) {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, status: newStatus } : c))
    );
  }

  // Get user details for fallback
  const getUserInfo = (userId) => users.find((u) => u.id === userId) || {};

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.pageTitle}>Selamat Datang, {currentAgency?.name}</h1>
      <p style={styles.subtitle}>
        Berikut adalah ringkasan aktiviti chatbot untuk agensi anda.
      </p>

      {/* Stats Row */}
      <section style={styles.statsRow}>
        <div style={styles.statCard}>
          <div>Jumlah Chat</div>
          <strong>{stats.total}</strong>
        </div>
        <div style={styles.statCard}>
          <div>Chat Aktif</div>
          <strong>{stats.aktif}</strong>
        </div>
        <div style={styles.statCard}>
          <div>Chat Selesai</div>
          <strong>{stats.selesai}</strong>
        </div>
        <div style={styles.statCard}>
          <div>Masa Respons Purata</div>
          <strong>-</strong>
        </div>
      </section>

      {/* CHAT TERKINI SECTION */}
      <section style={styles.chatSection}>
        <h2 style={styles.chatTitle}>Chat Terkini</h2>
        <p style={styles.chatDesc}>Aktiviti chat terbaru dari pengguna</p>

        {filtered.length === 0 && (
          <div style={styles.empty}>Tiada chat buat masa ini.</div>
        )}

        <div style={styles.chatList}>
          {filtered
            .filter((chat) => {
              const user = getUserInfo(chat.userId);
              return chat.userName || user.name; // hanya chat yang ada nama
            })
            .map((chat) => {
              const user = getUserInfo(chat.userId);
              const lastMsg =
                chat.messages[chat.messages.length - 1]?.text;

              return (
                <div key={chat.id} style={styles.chatCard}>
                  <div style={styles.chatLeft}>
                    <div style={styles.avatar}></div>

                    <div>
                      <div style={styles.username}>
                        <strong>
                          {chat.userName ||
                            user.name ||
                            user.fullname ||
                            user.nama ||
                            user.displayName ||
                            user.username ||
                            ""}
                        </strong>
                      </div>

                      <div style={styles.chatMessage}>{lastMsg}</div>
                      <div style={styles.chatTime}>
                        {new Date(chat.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={styles.chatRight}>
                    <select
                      value={chat.status}
                      onChange={(e) =>
                        updateStatus(chat.id, e.target.value)
                      }
                      style={styles.select}
                    >
                      <option value="active">Aktif</option>
                      <option value="pending">Menunggu</option>
                      <option value="done">Selesai</option>
                    </select>

                    <div style={styles.actionButtons}>
                      <button
                        style={styles.smallBtn}
                        onClick={() => navigate(`/agency/maklumat-asas/${chat.userId}`)}
                      >
                        Butiran Maklumat Asas
                      </button>

                      <button
                        style={styles.primaryBtn}
                        onClick={() => navigate(`/agency/chats/view/${chat.id}`)}
                      >
                        Lihat Chat
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div style={styles.footerButtons}>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/agency/reports")}
          >
            Lihat Laporan Penuh
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/agency/settings")}
          >
            Tetapan Chatbot
          </button>

          {/* ➜ Pergi ke halaman kategori FAQ */}
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/agency/faq-categories")}
          >
            Kemaskini FAQ
          </button>
        </div>
      </section>
    </div>
  );
}

// ======== STYLES ========
const styles = {
  container: { padding: 20, maxWidth: 1100, margin: "0 auto" },
  pageTitle: { fontSize: 28, fontWeight: 700 },
  subtitle: { color: "#666", marginBottom: 20 },

  statsRow: { display: "flex", gap: 12, marginBottom: 30 },
  statCard: {
    flex: 1,
    padding: 18,
    borderRadius: 10,
    background: "#f1f1f1",
  },

  chatSection: { padding: 20, border: "1px solid #ddd", borderRadius: 10 },
  chatTitle: { fontSize: 24, fontWeight: 700 },
  chatDesc: { color: "#666", marginBottom: 10 },

  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 10,
  },
  empty: { padding: 20, textAlign: "center", color: "#777" },

  chatCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    border: "1px solid #eee",
    borderRadius: 8,
  },

  chatLeft: { display: "flex", gap: 12 },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    background: "#e0e0e0",
  },

  username: { fontSize: 16 },
  chatMessage: { fontSize: 14, color: "#444" },
  chatTime: { fontSize: 12, color: "#888" },

  chatRight: { textAlign: "right" },
  select: { padding: 6, width: 120, borderRadius: 6 },

  actionButtons: { display: "flex", gap: 8, marginTop: 10 },
  smallBtn: {
    background: "#eee",
    padding: "6px 8px",
    borderRadius: 6,
    border: "none",
  },

  primaryBtn: {
    background: "#2b6cb0",
    color: "white",
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
  },

  footerButtons: { display: "flex", gap: 12, marginTop: 20 },
  secondaryBtn: {
    background: "#ddd",
    padding: "10px 15px",
    borderRadius: 6,
    border: "none",
  },
};

