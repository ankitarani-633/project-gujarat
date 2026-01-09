
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "./operational-dashboard.css";

export default function OperationalDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };
  const goNext = () => {
    // navigate to the WelcomeMetrics page
    navigate("/welcomeMetrics");
  };
  const rowsOversight = [
    { label: "Average yard inspection turnaround time", value: "5 days" },
    {
      label: "% of non-compliance notices closed within timeframe",
      value: "15%",
    },
    {
      label: "% of ship recycling plans reviewed & approved on time",
      value: "68%",
    },
  ];

  const rowsEnv = [
    {
      label: "Frequency of air/water quality monitoring",
      value: "— — —",
    },
    {
      label: "% of hazardous waste sent to TSDF / recycler",
      value: "67%",
    },
  ];

  return (
    <div className="home-wrapper">
      {/* Your gradient header */}
      <Header onLogout={logout} />

      <div className="content">
        {/* Your sidebar */}
        <Sidebar activeIndex={0} />

        <main className="dashboard">
          {/* Welcome banner (same sizing as Home’s welcome-strip) */}
          <div className="welcome-strip banner">
            <h2 className="welcome-text">
              Welcome <span className="accent">Dhruv Mishra</span> !
            </h2>
            <span className="chip-right">Gujarat Maritime Board</span>
          </div>

          {/* Subtitle */}
          <div className="section-subtitle">Operational Dashboard</div>

          {/* Green panel: Operational Oversight */}
          <section className="os-card" aria-label="Operational Oversight">
        {/* Header band: mint green with left vertical mark */}
        <div className="os-head">
          <span className="os-mark" aria-hidden />
          <h2 className="os-title">Operational Oversight</h2>
        </div>

        {/* Rows */}
        <div className="os-row">
          <div className="os-label">Average yard inspection turnaround time</div>
          <div className="os-value">5 days</div>
        </div>

        <div className="os-row">
          <div className="os-label">% of non-compliance notices closed within timeframe</div>
          <div className="os-value">15%</div>
        </div>

        <div className="os-row os-last">
          <div className="os-label">% of ship recycling plans reviewed &amp; approved on time</div>
          <div className="os-value">68%</div>
        </div>
      </section>

      <section className="em-card" aria-label="Environmental Monitoring">
        {/* Header band: sky blue with left vertical mark */}
        <div className="em-head">
          <span className="em-mark" aria-hidden />
          <h2 className="em-title">Environmental Monitoring</h2>
        </div>

        {/* Row 1 */}
        <div className="em-row">
          <div className="em-label">Frequency of air/water quality monitoring</div>
          <div className="em-value">----</div>
        </div>

        {/* Separator */}
        <div className="em-sep" aria-hidden />

        {/* Row 2 (last row has rounded bottom corners) */}
        <div className="em-row em-last">
          <div className="em-label">% of hazardous waste sent to TSDF / recycler</div>
          <div className="em-value">87%</div>
        </div>
      </section>

           {/* Worker Welfare / Safety */}
      <section className="we-card we-card--welfare" aria-label="Worker Welfare / Safety">
        <div className="we-head we-head--welfare">
          <span className="we-mark we-mark--welfare" aria-hidden />
          <h2 className="we-title we-title--welfare">Worker Welfare / Safety</h2>
        </div>

        <div className="we-row">
          <div className="we-label">No. of OHS training sessions conducted vs workers trained</div>
          <div className="we-value">6</div>
        </div>

        <div className="we-sep" aria-hidden />

        <div className="we-row">
          <div className="we-label">Hospital treatment for the year</div>
          <div className="we-value">123</div>
        </div>

        <div className="we-sep" aria-hidden />

        <div className="we-row we-last">
          <div className="we-label">Incident reporting timeliness</div>
          <div className="we-value">5</div>
        </div>
      </section>

      {/* Efficiency */}
      <section className="we-card we-card--efficiency" aria-label="Efficiency">
        <div className="we-head we-head--efficiency">
          <span className="we-mark we-mark--efficiency" aria-hidden />
          <h2 className="we-title we-title--efficiency">Efficiency</h2>
        </div>

        <div className="we-row">
          <div className="we-label">Average ship processing time (from beaching to completion)</div>
          <div className="we-value">15 days</div>
        </div>

        <div className="we-sep" aria-hidden />

        <div className="we-row we-last">
          <div className="we-label">% of yard downtime (maintenance / non-operational days)</div>
          <div className="we-value">15%</div>
        </div>
      </section>

      <section className="ca-card" aria-label="Certification & Audits">
        <div className="ca-head">
          <span className="ca-mark" aria-hidden />
          <h2 className="ca-title">Certification &amp; Audits</h2>
        </div>

        {/* Row 1 */}
        <div className="ca-row">
          <div className="ca-label">% of yards audited for HKC</div>
          <div className="ca-value">74%</div>
        </div>

        {/* Separator */}
        <div className="ca-sep" aria-hidden />

        {/* Row 2 (last row has rounded bottom corners) */}
        <div className="ca-row ca-last">
          <div className="ca-label">
            No. of joint audits with international verifiers (DNV, ClassNK) last month
          </div>
          <div className="ca-value">3</div>
        </div>
      </section>

      {/* Bottom actions */}
      <div className="ca-actions">
        <button
          className="ca-back"
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <span className="ca-chevron" aria-hidden>
            ◀
          </span>
          <span className="ca-backtext">Back</span>
        </button>

        <button className="ca-next" onClick={goNext} type="button" aria-label="Go next">
          Next
        </button>
      </div>
        </main>
      </div>
    </div>
  );
}
