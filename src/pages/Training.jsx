
// src/pages/Training.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "../styles/training.css";

export default function Training() {
  const navigate = useNavigate();
  const logout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  // Top stat cards (demo data)
  const [stats] = useState([
    { title: "PPE Compliance", percent: 98, subtext: "Workers using PPE", icon: "🛡️", tone: "green" },
    { title: "Monitoring Coverage", percent: 93, subtext: "Workers covered", icon: "📅", tone: "blue" },
    { title: "Training Pass Rate", percent: 95, subtext: "480 workers trained", icon: "📘", tone: "cyan" },
    { title: "Violations Found", percent: 2, subtext: "Requires attention", icon: "📄", tone: "orange", isCount: true },
  ]);

  const [summary] = useState({ trainedThisPeriod: 480, status: "Active" });

  const [sessions] = useState([
    { label: "Sessions Conducted", hint: "This period", value: 32 },
    { label: "Sessions This Month", hint: "Training programs", value: 120 },
    { label: "Workers Trained", hint: "PPE training complete", value: 720 },
    { label: "Pass Rate", hint: "Completed successfully", value: "95%" },
  ]);

  // Compliance Overview (data-driven)
  const [compliance] = useState([
    { label: "PPE Compliance", workers: 720, percent: 98, tone: "blue" },
    { label: "Training Completion", workers: 480, percent: 95, tone: "cyan" },
    { label: "Monitoring Coverage", workers: 460, percent: 93, tone: "purple" },
  ]);

  const [tiles] = useState([
    { type: "note", icon: "📘", title: "14 Spot Checks Completed", sub: "Regular monitoring ongoing" },
    { type: "warn", icon: "⚠️", title: "Warnings Issued", sub: "Follow-up actions in progress" },
  ]);

  // NEW: Health monitoring & medical checkups cards (data-driven)
  const [healthCards] = useState([
    { icon: "❤️", count: 860, title: "Health Checks Conducted", sub: "", trend: "+12%", trendTone: "up" },
    { icon: "📈", count: 450, title: "Medical Checkups", sub: "Workers screened", trend: "+8%", trendTone: "up" },
    { icon: "👤", count: 12, title: "Workers Referred", sub: "For specialized care", trend: "-3%", trendTone: "down" },
    { icon: "📊", count: 8, title: "Safety Improvements", sub: "Implemented this period", trend: "+5%", trendTone: "up" },
  ]);

  // NEW: Incident/Vio summary (demo)
  const [incidentSummary] = useState({ accidents: 8 });
  const [violationSummary] = useState({ count: 2, status: "Under investigation" });

  return (
    <div className="train-shell">
      {/* Header with gradient strip */}
      <Header onLogout={logout} />

      <div className="train-row">
        {/* Sidebar */}
        <Sidebar activeIndex={5} />

        {/* Main content */}
        <main className="train-main">
          {/* Titlebar */}
          <div className="train-titlebar">
            <div className="train-title-left">
              <span className="train-title-icon">👷‍♂️</span>
              <div className="train-title">
                <div className="tt-welcome">
                  Welcome <strong>Dhruv Mishra</strong>!
                </div>
                <div className="tt-sub">
                  Alang Ship Recycling Yard
                  <span className="tt-divider"> · </span>
                  Worker Safety and Occupational Health Measures
                </div>
              </div>
            </div>
            <div className="train-title-actions">
              <div className="tt-board-chip">Gujarat Maritime Board</div>
            </div>
          </div>

          {/* Top stats grid */}
          <section className="train-grid">
            {stats.map((s, idx) => (
              <div key={idx} className="train-card">
                <div className="tc-head">
                  <div className={`tc-icon ${s.tone}`}>{s.icon}</div>
                </div>
                <div className="tc-body">
                  <div className="tc-title">{s.title}</div>
                  <div className="tc-value">{s.isCount ? s.percent : `${s.percent}%`}</div>
                  <div className="tc-sub">{s.subtext}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Success banner */}
          <section className="train-banner">
            <div className="tb-left">
              <span className="tb-check">✔</span>
              <span className="tb-text">
                {summary.trainedThisPeriod} workers successfully trained this period
              </span>
            </div>
            <div className="tb-right">
              <span className="tb-status">{summary.status}</span>
            </div>
          </section>

          {/* Training Sessions */}
          <section className="train-subcard">
            <div className="train-subhead">
              <div>Training Sessions</div>
              <div className="ts-actions">
                <button className="ts-btn">Export</button>
                <button className="ts-btn ghost">View Logs</button>
              </div>
            </div>

            <ul className="train-list">
              {sessions.map((item, i) => (
                <li key={i} className="tl-row">
                  <div className="tl-left">
                    <div className="tl-label">#{item.label}</div>
                    <div className="tl-hint">{item.hint}</div>
                  </div>
                  <div className="tl-right">
                    <span className="tl-value">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ---------- Compliance Overview (added after Training Sessions) ---------- */}
          <section className="comp-wrap">
            <div className="comp-title">
              <span className="comp-bullet">🧩</span>
              <span>Compliance Overview</span>
            </div>

            <div className="comp-list">
              {compliance.map((c, i) => (
                <div key={i} className="comp-row">
                  <div className={`comp-badge ${c.tone}`}>
                    <div className="cb-count">{c.workers}</div>
                    <div className="cb-sub">workers</div>
                  </div>
                  <div className="comp-main">
                    <div className="cm-head">
                      <div className="cm-title">{c.label}</div>
                      <div className="cm-percent">{c.percent}%</div>
                    </div>
                    <div className="cm-bar">
                      <div className={`cm-fill ${c.tone}`} style={{ width: `${c.percent}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info tiles */}
            <div className="comp-tiles">
              {tiles.map((t, idx) => (
                <div key={idx} className={`ctile ${t.type}`}>
                  <div className="ctile-icon">{t.icon}</div>
                  <div className="ctile-body">
                    <div className="ctile-title">{t.title}</div>
                    <div className="ctile-sub">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Health monitoring header + chip */}
            <div className="health-head">Health Monitoring &amp; Medical Checkups</div>
            <div className="health-chip">93% Coverage</div>

            {/* ---------- NEW: Health Monitoring Cards Grid ---------- */}
            <div className="hm-grid">
              {healthCards.map((h, i) => (
                <div key={i} className="hm-card">
                  <div className={`hm-trend ${h.trendTone}`}>{h.trend}</div>
                  <div className="hm-icon">{h.icon}</div>
                  <div className="hm-count">{h.count}</div>
                  <div className="hm-title">{h.title}</div>
                  {h.sub && <div className="hm-sub">{h.sub}</div>}
                </div>
              ))}
            </div>

            {/* ---------- NEW: Incident & Violations ---------- */}
            <div className="incident-bar">
              <div className="incident-left">
                <span className="inc-ico">🛈</span>
                <span className="incident-title">Incident Reports</span>
              </div>
              <div className="incident-right">
                <span className="incident-chip">
                  {incidentSummary.accidents} <span className="chip-label">Accidents Reported</span>
                </span>
              </div>
            </div>

            <div className="viol-bar">
              <div className="viol-left">
                <span className="viol-ico">⚠️</span>
                <div className="viol-title">Violations Found</div>
                <div className="viol-sub">{violationSummary.count} {violationSummary.status}</div>
              </div>
            </div>

            {/* ---------- NEW: Response Time header ---------- */}
           
{/* Response Time banner */}
<div className="resp-bar">
  <div className="resp-left">
    <span className="resp-ico">🕒</span>
    <div className="resp-body">
      <div className="resp-title">Response Time</div>
      <div className="resp-sub">All incidents addressed within 24 hours</div>
    </div>
  </div>
</div>

{/* Follow-up Actions banner */}
<div className="follow-bar">
  <div className="follow-left">
    <span className="follow-ico">☑️</span>
    <div className="follow-body">
      <div className="follow-title">Follow-up Actions</div>
      <div className="follow-sub">Corrective measures implemented</div>
    </div>
  </div>
</div>

            {/* (Optional) Add response time metrics here later */}
          </section>
        </main>
      </div>
    </div>
  );
}
