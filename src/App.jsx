// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import AgencyLayout from "./layouts/AgencyLayout";
import PublicLayout from "./layouts/PublicLayout";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAgencies from "./pages/admin/Agencies";
import AdminAgencyEdit from "./pages/admin/AgencyEdit";
import AdminUserView from "./pages/admin/UsersView";
import AdminUsers from "./pages/admin/Users";
import AdminReports from "./pages/admin/Reports";
import AdminProfile from "./pages/admin/Profile";

// Agency pages
import AgencyRegister from "./pages/agency/Register";
import AgencyLogin from "./pages/agency/Login";
import AgencyDashboard from "./pages/agency/Dashboard";
import AgencyChatList from "./pages/agency/ChatList";
import AgencyChatView from "./pages/agency/ChatView";
import BotSettings from "./pages/agency/BotSettings";
import AgencyFAQ from "./pages/agency/FAQ";
import AgencyReports from "./pages/agency/Reports";
import AgencyReportFeedbacks from "./pages/agency/ReportFeedbacks";
import CategoryFAQ from "./pages/agency/CategoryFAQ";
import MaklumatAsas from "./pages/agency/MaklumatAsas";


// Public pages
import PublicLogin from "./pages/public/Login";
import PublicRegister from "./pages/public/Register";
import PublicDashboard from "./pages/public/Dashboard";
import PublicAgencySelect from "./pages/public/AgencySelect";
import PublicServiceSelect from "./pages/public/ServiceSelect";
import PublicChat from "./pages/public/Chat";
import PublicFAQ from "./pages/public/FAQ";
import PublicFeedback from "./pages/public/Feedback";
import PublicProfile from "./pages/public/Profile";

export default function App() {
  return (
    <Routes>

      {/* ================= ADMIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="agencies" element={<AdminAgencies />} />
        <Route path="agencies/edit/:id" element={<AdminAgencyEdit />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/view/:id" element={<AdminUserView />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* ================= AGENCY ================= */}
      <Route path="/agency/register" element={<AgencyRegister />} />
      <Route path="/agency/login" element={<AgencyLogin />} />

      <Route path="/agency/*" element={<AgencyLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AgencyDashboard />} />
        <Route path="chats" element={<AgencyChatList />} />
        <Route path="chats/view/:id" element={<AgencyChatView />} />
        <Route path="settings" element={<BotSettings />} />
        <Route path="maklumat-asas/:userId" element={<MaklumatAsas />} />
        <Route path="faq" element={<AgencyFAQ />} />
        <Route path="reports" element={<AgencyReports />} />
        <Route path="report-feedbacks" element={<AgencyReportFeedbacks />} />
        <Route path="faq-categories" element={<CategoryFAQ />} />
      </Route>

      {/* ================= PUBLIC ================= */}
      <Route path="/public/login" element={<PublicLogin />} />
      <Route path="/public/register" element={<PublicRegister />} />

      <Route path="/public/*" element={<PublicLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PublicDashboard />} />
        <Route path="agencies" element={<PublicAgencySelect />} />
        <Route path="services" element={<PublicServiceSelect />} />
        <Route path="chat" element={<PublicChat />} />
        <Route path="faq" element={<PublicFAQ />} />
        <Route path="feedback" element={<PublicFeedback />} />
        <Route path="profile" element={<PublicProfile />} />
      </Route>

      {/* Redirect ANY other route */}
      <Route path="*" element={<Navigate to="/public/login" replace />} />
    </Routes>
  );
}
