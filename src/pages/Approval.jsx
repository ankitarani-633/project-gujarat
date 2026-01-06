
// src/pages/Approval.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "../styles/approval.css";

export default function Approval() {
  const navigate = useNavigate();
  const logout = () => { auth.logout(); navigate("/login", { replace: true }); };

  // dynamic date/time (matches "Dashboard Updated" chips)
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }); // e.g., Apr 1, 2025
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }); // e.g., 09:11 AM

  // KPI data (from your PNG)
  const envKPIs = [
    { title: "Valid Clearances", value: 45, chip: "Active", color: "green" },
    { title: "Renewal Due", value: 31, chip: "Next 30 Days", color: "yellow" },
    { title: "Applications Submitted", value: 12, chip: "Pending", color: "orange" },
  ];
  const licenseKPIs = [
    { title: "Active Licenses", value: 156, chip: "Currently Active", color: "purple" },
    { title: "Expiring Soon", value: 78, chip: "Next 60 Days", color: "yellow" },
    { title: "New Licenses Issued", value: 32, chip: "This Month", color: "orange" },
  ];
  const facilityKPIs = [
    { title: "HKC Certified", value: 123, chip: "Hong Kong Convention", color: "green" },
    { title: "Ship Recycling Regulation", value: 67, chip: "Compliant", color: "purple" },
    { title: "ISO 30000 Certified", value: 90, chip: "Certified", color: "blue" },
  ];
  const arrivalKPIs = [
    { title: "Approved Vessels", value: 22, chip: "Approved", color: "green" },
    { title: "Pending Approvals", value: 14, chip: "This Period", color: "yellow" },
    { title: "Total Processed", value: 74, chip: "This Period", color: "blue" },
  ];

  return (
    <div className="approvex-shell">
      {/* Top app header */}
      <Header onLogout={logout} />

      <div className="approvex-row">
        {/* Left sidebar — ensure this item points to /approval in Sidebar.jsx */}
        <Sidebar activeIndex={4} />

        {/* Main content */}
        <main className="approvex-main">

          {/* Welcome banner block */}
          <div className="approvex-banner">
            <div className="approvex-banner-left">
              <h2 className="approvex-welcome">
                Welcome <span className="accent">Dhruv Mishra</span> !
              </h2>
              <div className="approvex-subtitle">Alang Ship Recycling Yard</div>
            </div>
            <div className="approvex-banner-right">
              <div className="approvex-chip">Gujarat Maritime Board</div>
              <div className="approvex-update">
                <span className="upd-label">Dashboard Updated:</span>
                <span className="upd-pill">{dateStr}</span>
                <span className="upd-pill">{timeStr}</span>
              </div>
            </div>
          </div>

          {/* Lanes */}
          <ApprovalLane
            icon="🛡️"
            title="Environment Clearances"
            kpis={envKPIs}
          />
          <ApprovalLane
            icon="📄"
            title="Ship Recycling Licenses"
            kpis={licenseKPIs}
          />
          <ApprovalLane
            icon="🏷️"
            title="Facility Certifications"
            kpis={facilityKPIs}
          />
          <ApprovalLane
            icon="🛳️"
            title="Approval of Arrival"
            kpis={arrivalKPIs}
          />

        </main>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */
function ApprovalLane({ icon, title, kpis }) {
  return (
    <section className="approvex-lane">
      {/* left icon + title */}
      <div className="lane-left">
        <div className="lane-icon">{icon}</div>
        <div className="lane-title">{title}</div>
      </div>

      {/* center separator (blue line with dots) */}
      <div className="lane-sep">
        <span className="dot start" />
        <span className="line" />
        <span className="dot end" />
      </div>

      {/* right KPI cards */}
      <div className="lane-kpis">
        {kpis.map((k) => (
          <KPI key={k.title} title={k.title} value={k.value} chip={k.chip} color={k.color} />
        ))}
      </div>
    </section>
  );
}

function KPI({ title, value, chip, color }) {
  return (
    <div className={`kpi-card ${color}`}>
      <div className="kpi-top">
        <div className="kpi-title">{title}</div>
        <div className={`kpi-chip ${chipColor(color)}`}>{chip}</div>
      </div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}

/* map card color to chip shade */
function chipColor(color) {
  switch (color) {
    case "green":  return "chip-green";
    case "yellow": return "chip-yellow";
    case "orange": return "chip-orange";
    case "purple": return "chip-purple";
    case "blue":   return "chip-blue";
    default:       return "chip-blue";
  }
}
