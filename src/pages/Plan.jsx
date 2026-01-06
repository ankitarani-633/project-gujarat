
// src/pages/Plan.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "../styles/plan.css";
import checkCircle from "../images/checkCircle.png";
import attach_file from "../images/attach_file.png";
const YARD_ROWS = [
  {
    yardId: 101,
    yardName: "Sunrise Steel",
    imoHkc: "HKC Certified",
    act2019: "Valid till 2028",
    srfpUpdatedOn: "2025-03-15",
    lastInspection: "2025-06-05",
    openNCs: 0,
    risk: "Low",
  },
  {
    yardId: 102,
    yardName: "Ocean Green Metals",
    imoHkc: "Cond. Approved",
    act2019: "Valid till 2026",
    srfpUpdatedOn: "2024-11-30",
    lastInspection: "2025-04-20",
    openNCs: 3,
    risk: "Medium",
  },
  {
    yardId: 103,
    yardName: "Alang Eco Recyclers",
    imoHkc: "Suspended",
    act2019: "Suspended",
    srfpUpdatedOn: "2024-01-10",
    lastInspection: "2025-01-05",
    openNCs: 7,
    risk: "High",
  },
];

const COMPLIANCE_ITEMS = [
  "Inventory of Hazardous Materials (IHM) Report",
  "Oil Spill Response Plan",
  "Ship Recycling Compliance Certification",
];

export default function Plan() {
  const navigate = useNavigate();
  const logout = () => { auth.logout(); navigate("/login", { replace: true }); };

  const [tab, setTab] = useState("Compliance");
  const [file, setFile] = useState(null);

  const addDocument = () => {
    if (!file) return alert("Please choose a file first.");
    alert(`Uploaded: ${file.name}`);
    setFile(null);
  };

  return (
    <div className="plan-shell">
      {/* Top app header */}
      <Header onLogout={logout} />

      <div className="plan-row">
        <Sidebar activeIndex={2} />

        <main className="plan-main">
          {/* Welcome banner (gradient) */}
          <div className="welcome-strip banner">
            <h2 className="welcome-text">
              Welcome <span className="accent">Dhruv Mishra</span> !
            </h2>
            <span style={{ color: "white" }}>Gujarat Maritime Board</span>
          </div>

          {/* Vessel Details table (with pill headers) */}
          <div>
            <div style={{paddingTop:"12px"}}>Vessel Details</div>

            
              <table className="vessel-table">
                <thead>
                  <tr>
                    <th><span className="pill blue">Yard ID</span></th>
                    <th><span className="pill blue">Yard Name</span></th>
                    <th><span className="pill blue">IMO HKC Status</span></th>
                    <th><span className="pill blue">Act 2019 License</span></th>
                    <th><span className="pill dark">SRFP Updated On</span></th>
                    <th><span className="pill dark">Last Inspection</span></th>
                    <th><span className="pill dark">Open NCs</span></th>
                    <th><span className="pill dark">Risk Level</span></th>
                  </tr>
                </thead>
                <tbody>
                  {YARD_ROWS.map((r) => (
                    <tr key={r.yardId}>
                      <td>{r.yardId}</td>
                      <td>{r.yardName}</td>
                      <td>{r.imoHkc}</td>
                      <td>{r.act2019}</td>
                      <td>{fmt(r.srfpUpdatedOn)}</td>
                      <td>{fmt(r.lastInspection)}</td>
                      <td>{r.openNCs}</td>
                      <td>{r.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["Compliance", "Inspections", "Documents"].map((name) => (
              <button
                key={name}
                className={`tab ${tab === name ? "active" : ""}`}
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          {tab === "Compliance" && (
            <>
            <div className="card panel">
              <ul className="checklist">
                {COMPLIANCE_ITEMS.map((text, i) => (
                  <li key={i} className="check-row">
                    <span className="check-icon">
                      <img width="20px" height="20px" src={checkCircle} alt="Check" />
                    </span>
                    <span className="check-text">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
                         <div className="card panel">
                {/* Upload row */}
                <div className="upload-row">
                  <label htmlFor="doc-file" className="upload-label">
                    <span className="upload-icon">
                      <img width="20px" height="20px" src={attach_file} alt="Attach" />
                    </span>
                    <span>Choose The File</span>
                  </label>

                  <input
                    id="doc-file"
                    type="file"
                    className="upload-input"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />

                
                </div>
                <div>
                   <button className="btn-primary" onClick={addDocument}>
                    Add Document
                  </button>
                </div>
                 
              </div>

                            <div className="clearance-grid">
                {/* Beaching Clearance */}
                <div>
                  <h3 className="clearance-title">Beaching Clearance</h3>
                  
                  <div className="clearance-body">
                    <table className="info-table">
                      <tbody>
                        <tr>
                          <td className="dot-col"><span className="dot"></span></td>
                          <td className="label-col">Status</td>
                          <td className="value-col">
                            <span className="badge badge-green">Approved</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="dot-col"><span className="dot"></span></td>
                          <td className="label-col">Approval Date</td>
                          <td className="value-col">
                            <span className="badge badge-blue">Apr 1, 2025</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="dot-col"><span className="dot"></span></td>
                          <td className="label-col">Reference No.</td>
                          <td className="value-col">
                            <strong>BC-96765</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Document Verification */}
                <div>
                  <h3 className="clearance-title">Document Verification</h3>
                  <div className="clearance-body dv-body">
                    <div className="dv-left">
                      <div className="dv-title">Ocean Trader</div>
                      <div className="dv-sub">IMO Number</div>
                    </div>
                    <div className="dv-right">
                      <button className="badge badge-yellow dropdown">
                        Submission Pending ▾
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                {/* ▼ NEW: Document Type card */}
    <section className="docx-card">
      <div className="docx-head">
        <div className="docx-title">Document Type</div>
        <button className="docx-submit btn-primary">Submit</button>
      </div>

      <div className="docx-tablewrap">
        <table className="docx-table">
          <thead>
            <tr>
              <th>Document Type</th>
              <th>Status</th>
              <th>Last Modifier</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[
              { type: "Ship Recycle Facility Plan", status: "Not Submitted", last: "------" },
              { type: "Inventory of Hazardous Materials", status: "Not Submitted", last: "------" },
              { type: "Insurance Certificate", status: "Not Submitted", last: "------" },
            ].map((r) => (
              <tr key={r.type}>
                <td>{r.type}</td>
                <td className="docx-status docx-red">{r.status}</td>
                <td className="docx-muted">{r.last}</td>
                <td className="docx-action">
                  <button className="docx-outline">Upload</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* ▼ NEW: Beaching Slot Allocation card */}
    <section className="beachx-card">
      <h3 className="beachx-caption">Beaching Slot Allocation</h3>
      <div className="beachx-panel">
        <table className="beachx-info">
          <tbody>
            <tr>
              <td className="beachx-dotcol"><span className="beachx-dot" /></td>
              <td className="beachx-label">Vessel Name</td>
              <td className="beachx-value"><strong>Sea Voyager</strong></td>
            </tr>
            <tr>
              <td className="beachx-dotcol"><span className="beachx-dot" /></td>
              <td className="beachx-label">Plot Number</td>
              <td className="beachx-value">923184</td>
            </tr>
            <tr>
              <td className="beachx-dotcol"><span className="beachx-dot" /></td>
              <td className="beachx-label">GRT/NRT</td>
              <td className="beachx-value">25,700/15,300</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/* ▼ NEW: Tide Window card */}
    <section className="tidex-card">
      <h3 className="tidex-caption">Tide Window</h3>

      {/* Controls */}
      <div className="tidex-controls">
        <div className="tidex-pill">
          <span className="tidex-icon">📅</span>
          <input aria-label="from date" defaultValue="Apr 1, 2025" />
        </div>
        <div className="tidex-pill">
          <span className="tidex-icon">📅</span>
          <input aria-label="to date" defaultValue="Apr 1, 2025" />
        </div>
        <button className="btn-primary tidex-search">Search</button>
      </div>

      {/* Calendar + Legend */}
      <div className="tidex-body">
        <div className="tidex-calendar">
          <div className="tidex-calhead">
            <button className="tidex-nav">‹</button>
            <div className="tidex-month">April 2025</div>
            <button className="tidex-nav">›</button>
          </div>

          <div className="tidex-grid">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="tidex-wd">{d}</div>
            ))}
            {/* April 2025 starts on Tue: add blanks for Sun, Mon */}
            <div className="tidex-day blank" /><div className="tidex-day blank" />

            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const cls =
                day === 20 ? "tidex-day selected" :
                day % 6 === 0 ? "tidex-day assigned" :
                day % 5 === 0 ? "tidex-day not" : "tidex-day available";
              return (
                <div key={day} className={cls}>{day}</div>
              );
            })}
          </div>
        </div>

        <div className="tidex-legend">
          <div className="tidex-legtitle">Legend</div>
          <div className="tidex-legitem">
            <span className="tidex-dot available" /> <span>Available</span>
          </div>
          <div className="tidex-legitem">
            <span className="tidex-dot not" /> <span>Not Available</span>
          </div>
          <div className="tidex-legitem">
            <span className="tidex-dot assigned" /> <span>Assigned</span>
          </div>
        </div>
      </div>
    </section>
              </>
          )}

          {tab === "Inspections" && (
            <div className="card panel">
              <div className="empty">Inspections data goes here.</div>
            </div>
          )}

         
{tab === "Documents" && (
  <>
    {/* Existing upload row card */}
    <div className="card panel">
      <div className="upload-row">
        <label htmlFor="doc-file" className="upload-label">
          <span className="upload-icon">📎</span>
          <span>Choose The File</span>
        </label>

        <input
          id="doc-file"
          type="file"
          className="upload-input"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button className="btn-primary" onClick={addDocument}>
          Add Document
        </button>
      </div>
    </div>

    {/* Your existing two cards: Beaching Clearance + Document Verification */}
    <div className="clearance-grid">
      {/* Beaching Clearance (already present) */}
      <div className="clearance-card">
        <h3 className="clearance-title">Beaching Clearance</h3>
        <div className="clearance-body">
          <table className="info-table">
            <tbody>
              <tr>
                <td className="dot-col"><span className="dot"></span></td>
                <td className="label-col">Status</td>
                <td className="value-col">
                  <span className="badge badge-green">Approved</span>
                </td>
              </tr>
              <tr>
                <td className="dot-col"><span className="dot"></span></td>
                <td className="label-col">Approval Date</td>
                <td className="value-col">
                  <span className="badge badge-blue">Apr 1, 2025</span>
                </td>
              </tr>
              <tr>
                <td className="dot-col"><span className="dot"></span></td>
                <td className="label-col">Reference No.</td>
                <td className="value-col">
                  <strong>BC-96765</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Verification (already present) */}
      <div className="clearance-card">
        <h3 className="clearance-title">Document Verification</h3>
        <div className="clearance-body dv-body">
          <div className="dv-left">
            <div className="dv-title">Ocean Trader</div>
            <div className="dv-sub">IMO Number</div>
          </div>
          <div className="dv-right">
            <button className="badge badge-yellow dropdown">
              Submission Pending ▾
            </button>
          </div>
        </div>
      </div>
    </div>

  
  </>
)}

        </main>
      </div>
    </div>
  );
}

/* helpers */
function fmt(iso) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}
