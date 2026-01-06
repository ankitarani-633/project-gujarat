
// src/pages/Compliance.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "../styles/compliance.css";

export default function Compliance() {
  const navigate = useNavigate();
  const logout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  // Metrics tiles (demo)
  const [metrics] = useState([
    { title: "Inspections Completed On Time", value: "87%", icon: "⏱️", tone: "green" },
    { title: "Documentation Up-to-Date", value: "88%", icon: "📅", tone: "blue" },
    { title: "Violations Resolved", value: "78%", icon: "⚠️", tone: "cyan" },
    { title: "Avg. Report Time", value: "3 days", icon: "📄", tone: "teal" },
    { title: "Safety Supervisor Ratio", value: "1:12", icon: "📊", tone: "orange" },
    { title: "Monthly Inspections", value: "5.2", icon: "🔎", tone: "purple" },
  ]);

  /* ---------------- Yard Safety Inspections (bar chart) ---------------- */
  const months12 = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const chartDataByYear = {
    2023: [28, 44, 60, 40, 52, 24, 56, 62, 70, 50, 48, 36],
    2024: [35, 78, 92, 66, 82, 28, 80, 85, 90, 78, 72, 55],
    2025: [48, 72, 88, 64, 75, 40, 84, 90, 92, 70, 60, 58],
  };
  const barYears = Object.keys(chartDataByYear).map(Number).sort();
  const [barYear, setBarYear] = useState(2024);
  const barData = chartDataByYear[barYear] || [];
  const barMax = Math.max(...barData, 1);

  /* ---------------- Activity Trends (line chart) ---------------- */
  const months6 = ["June","July","August","September","October","November"];

  // Demo activity data by year (last 6 months)
  const activityByYear = {
    2023: {
      meetings: [10, 28, 40, 55, 70, 80],
      briefings: [12, 38, 50, 45, 60, 76],
    },
    2024: {
      meetings: [8, 30, 40, 60, 75, 85],        // dark blue line
      briefings: [15, 45, 55, 50, 65, 78],      // cyan line
    },
    2025: {
      meetings: [12, 32, 48, 64, 80, 92],
      briefings: [20, 42, 58, 54, 70, 88],
    },
  };

  const trendYears = Object.keys(activityByYear).map(Number).sort();
  const [trendYear, setTrendYear] = useState(2024);
  const trend = activityByYear[trendYear];

  // SVG geometry for the line chart
  const W = 640, H = 220;
  const PAD = { left: 42, right: 18, top: 16, bottom: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const xStep = innerW / (months6.length - 1);

  const maxTrend = Math.max(
    ...(trend?.meetings || [1]),
    ...(trend?.briefings || [1]),
    1
  );

  const xPos = (i) => PAD.left + i * xStep;
  const yPos = (val) => PAD.top + innerH * (1 - val / maxTrend);

  const meetingPoints = useMemo(
    () => (trend?.meetings || []).map((v, i) => `${xPos(i)},${yPos(v)}`).join(" "),
    [trendYear]
  );
  const briefingPoints = useMemo(
    () => (trend?.briefings || []).map((v, i) => `${xPos(i)},${yPos(v)}`).join(" "),
    [trendYear]
  );

  return (
    <div className="compx-shell">
      <Header onLogout={logout} />

      <div className="compx-row">
        <Sidebar activeIndex={6} />

        <main className="compx-main">
          {/* Welcome bar */}
          <div className="compx-titlebar">
            <div className="compx-title-left">
              <span className="compx-title-icon">🌿</span>
              <div className="compx-title">
                <div className="cx-welcome">
                  Welcome <strong>Dhruv Mishra</strong> !
                </div>
                <div className="cx-sub">Performance Dashboard</div>
              </div>
            </div>
            <div className="compx-title-actions">
              <div className="cx-role-chip">GMB Safety Officer</div>
            </div>
          </div>

          {/* Metrics grid */}
          <section className="cx-grid">
            {metrics.map((m, idx) => (
              <div key={idx} className="cx-card">
                <div className="cx-card-head">
                  <div className={`cx-icon ${m.tone}`}>{m.icon}</div>
                </div>
                <div className="cx-card-body">
                  <div className="cx-title">{m.title}</div>
                  <div className="cx-value">{m.value}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Yard Safety Inspections (bar chart) */}
          <section className="cx-chartcard">
            <div className="cx-charthead">
              <div className="cx-charthead-left">
                <div className="cx-charttitle">
                  <span className="cx-chartbullet">🧩</span> Yard Safety Inspections
                </div>
                <div className="cx-chartsub">Monthly inspection count</div>
              </div>
              <div className="cx-year">
                <label htmlFor="yearSelectBar" className="cx-year-label">Year</label>
                <select
                  id="yearSelectBar"
                  className="cx-year-select"
                  value={barYear}
                  onChange={(e) => setBarYear(Number(e.target.value))}
                >
                  {barYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="cx-chart">
              <div className="bars" role="img" aria-label={`Monthly inspections for ${barYear}`}>
                {barData.map((val, i) => (
                  <div key={`${barYear}-${i}`} className="barwrap">
                    <div
                      className="bar"
                      title={`${months12[i]}: ${val}`}
                      style={{ height: `${Math.round((val / barMax) * 100)}%` }}
                    />
                    <div className="barlabel">{months12[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------- NEW: Activity Trends (last 6 months) ---------------- */}
          <section className="cx-linecard">
            <div className="cx-charthead">
              <div className="cx-charthead-left">
                <div className="cx-charttitle">
                  <span className="cx-chartbullet">🧩</span> Activity Trends (Last 6 Months)
                </div>
                <div className="cx-chartsub">Meetings and safety briefings</div>
              </div>
              <div className="cx-year">
                <label htmlFor="yearSelectTrend" className="cx-year-label">Year</label>
                <select
                  id="yearSelectTrend"
                  className="cx-year-select"
                  value={trendYear}
                  onChange={(e) => setTrendYear(Number(e.target.value))}
                >
                  {trendYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* SVG Line chart */}
            <div className="cx-linewrap">
              <svg className="cx-linesvg" viewBox={`0 0 ${W} ${H}`} role="img"
                   aria-label={`Activity trends for ${trendYear}`}>
                {/* Axes */}
                <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom}
                      className="axis" />
                <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom}
                      className="axis" />

                {/* Meetings line (dark blue) */}
                <polyline points={meetingPoints} className="line meetings" />
                {(trend?.meetings || []).map((v, i) => (
                  <circle key={`m-${i}`} cx={xPos(i)} cy={yPos(v)} r="5" className="dot meetings"
                          title={`Meetings - ${months6[i]}: ${v}`} />
                ))}

                {/* Briefings line (cyan) */}
                <polyline points={briefingPoints} className="line briefings" />
                {(trend?.briefings || []).map((v, i) => (
                  <circle key={`b-${i}`} cx={xPos(i)} cy={yPos(v)} r="5" className="dot briefings"
                          title={`Briefings - ${months6[i]}: ${v}`} />
                ))}

                {/* Month labels on baseline */}
                {months6.map((m, i) => (
                  <text key={`lbl-${i}`}
                        x={xPos(i)} y={H - PAD.bottom + 20}
                        className="ticklabel">{m}</text>
                ))}
              </svg>
            </div>
          </section>

          {/* ---------------- NEW: Next button ---------------- */}
          <div className="cx-nextbar">
            <button className="cx-nextbtn" onClick={() => navigate("/training")}>
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}