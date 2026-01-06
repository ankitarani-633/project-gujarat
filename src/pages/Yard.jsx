
// src/pages/Yard.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "../styles/yard.css";

/* --------- Demo Data --------- */
const TOP_VESSELS = [
  { id: 1, name: "Alpha", type: "Oil Tanker", arrival: "2021-05-29", departure: "2021-05-29", status: "Anchored" },
  { id: 2, name: "Ocean Star", type: "Bulk Carrier", arrival: "2021-05-20", departure: "2021-06-15", status: "Underway" },
  { id: 3, name: "Libery", type: "Container Ship", arrival: "2021-06-16", departure: "2021-08-24", status: "Departed" },
  { id: 4, name: "Atlantic", type: "General Cargo", arrival: "2021-07-20", departure: "2021-07-30", status: "Departed" },
  { id: 5, name: "Sea Quest", type: "Oil Tanker", arrival: "2021-08-20", departure: "2021-10-21", status: "Anchored" },
  { id: 6, name: "Navigator", type: "General Cargo", arrival: "2021-07-20", departure: "2021-08-27", status: "Departed" },
  { id: 7, name: "Pacific", type: "General Cargo", arrival: "2021-11-21", departure: "2023-10-09", status: "Departed" },
];

const EXTENDED_VESSELS = [
  {
    id: 11, shipName: "Ocean Explorer", imo: "9284567", gt: "42,410", stage: "Under recycling",
    flag: "Panama", ihm: "Surveyed", finalSurvey: "Completed", yardId: "102", targetCompletion: "2025-12-15"
  },
  {
    id: 12, shipName: "BLUE HORIZON", imo: "9158427", gt: "38,120", stage: "Recycling",
    flag: "India", ihm: "Pending review", finalSurvey: "In progress", yardId: "106", targetCompletion: "2025-10-05"
  },
  {
    id: 13, shipName: "SEA ORCHID", imo: "9734557", gt: "57,845", stage: "Acceptance",
    flag: "Liberia", ihm: "Recycling Inventory", finalSurvey: "Completed", yardId: "101", targetCompletion: "2025-09-12"
  },
  {
    id: 14, shipName: "STAR MERCURY", imo: "9701235", gt: "31,640", stage: "Under recycling",
    flag: "Malta", ihm: "Notified", finalSurvey: "None", yardId: "104", targetCompletion: "2025-11-30"
  },
];

const STATUS_OPTIONS = ["Anchored", "Underway", "Departed", "Beached", "Accepted"];
const TYPE_OPTIONS = ["Oil Tanker", "Bulk Carrier", "Container Ship", "General Cargo"];

export default function Yard() {
  const navigate = useNavigate();
  const logout = () => { auth.logout(); navigate("/login", { replace: true }); };

  /* --------- Top Filters (banner section) --------- */
  const [filtersTop, setFiltersTop] = useState({
    vesselName: "",
    status1: "",
    type: "",
    status2: "",
  });

  /* --------- Pagination for Top Table --------- */
  const PAGE_SIZE_TOP = 5;
  const [pageTop, setPageTop] = useState(1);

  const buildPageButtons = (current, total, span = 5) => {
    const buttons = [];
    if (total <= span + 2) {
      for (let i = 1; i <= total; i++) buttons.push(i);
      return buttons;
    }
    const start = Math.max(1, current - Math.floor(span / 2));
    const end = Math.min(total, start + span - 1);

    if (start > 1) {
      buttons.push(1);
      if (start > 2) buttons.push("…");
    }
    for (let i = start; i <= end; i++) buttons.push(i);
    if (end < total) {
      if (end < total - 1) buttons.push("…");
      buttons.push(total);
    }
    return buttons;
  };

  const onChangeTop = (e) => {
    const { name, value } = e.target;
    setFiltersTop(prev => ({ ...prev, [name]: value }));
    setPageTop(1);
  };

  /* --------- Apply Top Filters + paginate --------- */
  const filteredTop = useMemo(() => {
    const q = filtersTop.vesselName.trim().toLowerCase();
    return TOP_VESSELS.filter(v => {
      const okQ = q ? v.name.toLowerCase().includes(q) : true;
      const okS1 = filtersTop.status1 ? v.status === filtersTop.status1 : true;
      const okType = filtersTop.type ? v.type === filtersTop.type : true;
      const okS2 = filtersTop.status2 ? v.status === filtersTop.status2 : true;
      return okQ && okS1 && okType && okS2;
    });
  }, [filtersTop]);

  const totalTop = filteredTop.length;
  const totalPagesTop = Math.max(1, Math.ceil(totalTop / PAGE_SIZE_TOP));
  const safePageTop = Math.min(pageTop, totalPagesTop);
  const startTop = (safePageTop - 1) * PAGE_SIZE_TOP;
  const endTop = Math.min(startTop + PAGE_SIZE_TOP, totalTop);
  const pageRowsTop = filteredTop.slice(startTop, endTop);
  const pageButtonsTop = buildPageButtons(safePageTop, totalPagesTop, 5);

  /* --------- Bottom (Extended) Filters --------- */
  const [filters, setFilters] = useState({ status: "", type: "", q: "" });

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  /* --------- Pagination for Extended Table --------- */
  const PAGE_SIZE_EXT = 5;
  const [pageExt, setPageExt] = useState(1);

  // reset page when filters change
  // use a simple effect-free approach: compute safePageExt each render

  const filteredExtended = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return EXTENDED_VESSELS.filter(v => {
      const okQ = q ? v.shipName.toLowerCase().includes(q) || v.imo.includes(q) : true;
      const stageToStatus =
        v.stage.toLowerCase().includes("under") ? "Underway" :
          v.stage.toLowerCase().includes("accept") ? "Accepted" : "Departed";
      const okStatus = filters.status ? stageToStatus === filters.status : true;
      const okType = filters.type ? (filters.type === inferTypeFromFlag(v.flag)) : true;
      return okQ && okStatus && okType;
    });
  }, [filters]);

  const totalExt = filteredExtended.length;
  const totalPagesExt = Math.max(1, Math.ceil(totalExt / PAGE_SIZE_EXT));
  const safePageExt = Math.min(pageExt, totalPagesExt);
  // slice for current page
  const startExt = (safePageExt - 1) * PAGE_SIZE_EXT;
  const endExt = Math.min(startExt + PAGE_SIZE_EXT, totalExt);
  const pageRowsExt = filteredExtended.slice(startExt, endExt);
  const pageButtonsExt = buildPageButtons(safePageExt, totalPagesExt, 5);

  /* --------- Add Vessel Modal --------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [newVessel, setNewVessel] = useState({
    shipName: "", imo: "", gt: "", stage: "", flag: "", ihm: "",
    finalSurvey: "", yardId: "", targetCompletion: ""
  });

  const addVessel = (e) => {
    e.preventDefault();
    if (!newVessel.shipName || !newVessel.imo) return;
    // Demo only: mutates the in-memory list
    EXTENDED_VESSELS.push({ id: Date.now(), ...newVessel });
    setModalOpen(false);
    setNewVessel({
      shipName: "", imo: "", gt: "", stage: "", flag: "", ihm: "",
      finalSurvey: "", yardId: "", targetCompletion: ""
    });
    alert("Vessel added (demo).");
  };

  /* --------- Render --------- */
  return (
    <div className="yardx-shell">
      <Header onLogout={logout} />

      <div className="yardx-row">
        <Sidebar activeIndex={1} />

        <main className="yardx-main">
          {/* Welcome banner — use yardx-welcome styles */}
          <div className="welcome-strip banner">
            <h2 className="welcome-text">
              Welcome <span className="accent">Dhruv Mishra</span> !
            </h2>
            <span style={{ color: "white" }}>Gujarat Maritime Board</span>
          </div>

          {/* Vessel Management bar */}
          <section className="yardx-manage">
            <div className="yardx-mtitle">Vessel Management</div>
            <button
              style={{ backgroundColor: "#094CA1 ", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}
              onClick={() => setModalOpen(true)}
              aria-label="Add Vessel"
            >
              Add Vessel
            </button>
          </section>

          {/* Filter row (4 fields) */}
          <section className="yardx-filter4" style={{ paddingTop: "10px" }}>
            {/* Vessel Name */}
            <div className="fcol">
              <label htmlFor="vesselName">Vessel Name</label>
              <div className="search-pill">
                <span className="magnify" aria-hidden="true">🔍</span>
                <input
                  id="vesselName"
                  type="text"
                  name="vesselName"
                  value={filtersTop.vesselName}
                  onChange={onChangeTop}
                  placeholder="Search"
                  aria-label="Search Vessel Name"
                />
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>

            {/* Status (first) */}
            <div className="fcol">
              <label htmlFor="status1">Status</label>
              <div className="select-pill">
                <select
                  id="status1"
                  name="status1"
                  value={filtersTop.status1}
                  onChange={onChangeTop}
                  aria-label="Filter Status"
                >
                  <option value="">All ( Selected )</option>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>

            {/* Type */}
            <div className="fcol">
              <label htmlFor="type">Type</label>
              <div className="select-pill">
                <select
                  id="type"
                  name="type"
                  value={filtersTop.type}
                  onChange={onChangeTop}
                  aria-label="Filter Type"
                >
                  <option value="">All ( Selected )</option>
                  {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>

            {/* Status (second) */}
            <div className="fcol">
              <label htmlFor="status2">Status</label>
              <div className="select-pill">
                <select
                  id="status2"
                  name="status2"
                  value={filtersTop.status2}
                  onChange={onChangeTop}
                  aria-label="Filter Status 2"
                >
                  <option value="">--Select--</option>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>
          </section>

          {/* Top section title */}
          <div className="yardx-title">Active Vessel</div>

          {/* Header outside the card — columns aligned via colgroup */}
          <div className="yardx-pillheaders" role="presentation">
            <table className="top-header-table" aria-hidden="true">
              <colgroup>
                <col style={{ width: '28%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th><span className="yardx-pill pill-blue">Vessel Name</span></th>
                  <th><span className="yardx-pill pill-blue">Type</span></th>
                  <th><span className="yardx-pill pill-indigo">Arrival Date</span></th>
                  <th><span className="yardx-pill pill-indigo">Departure Date</span></th>
                  <th><span className="yardx-pill pill-dark">Status</span></th>
                  <th><span className="yardx-pill pill-dark">Action</span></th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Body inside the card */}
          <section className="yardx-card">
            <div className="yardx-tablewrap">
              <table className="yardx-table">
                <colgroup>
                  <col style={{ width: '28%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '12%' }} />
                </colgroup>
                <tbody>
                  {pageRowsTop.map(v => (
                    <tr key={v.id}>
                      <td>{v.name}</td>
                      <td>{v.type}</td>
                      <td>{fmt(v.arrival)}</td>
                      <td>{fmt(v.departure)}</td>
                      <td>{renderStatusChip(v.status)}</td>
                      <td><button className="yardx-view">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination bar */}
            <div className="yardx-pagerbar">
              <div className="yardx-footnote">
                {totalTop > 0
                  ? <>Showing {startTop + 1}–{endTop} of {totalTop} entries</>
                  : <>Showing 0 of 0 entries</>}
              </div>

              <div className="yardx-pager">
                <button
                  className="pg nav"
                  disabled={safePageTop === 1}
                  onClick={() => setPageTop(p => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {pageButtonsTop.map((b, i) =>
                  b === "…" ? (
                    <span key={`dots-${i}`} className="pg ellipsis">…</span>
                  ) : (
                    <button
                      key={`p-${b}`}
                      className={`pg ${safePageTop === b ? "active" : ""}`}
                      onClick={() => setPageTop(b)}
                      aria-label={`Page ${b}`}
                    >
                      {b}
                    </button>
                  )
                )}

                <button
                  className="pg nav"
                  disabled={safePageTop === totalPagesTop}
                  onClick={() => setPageTop(p => Math.min(totalPagesTop, p + 1))}
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          <section className="yardx-manage">
            <div className="yardx-mtitle">Vessel Management</div>
            <button
              style={{ backgroundColor: "#094CA1 ", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}
              onClick={() => setModalOpen(true)}
              aria-label="Add Vessel"
            >
              Add Vessel
            </button>
          </section>
          {/* Filter row (4 fields) */}
          <section className="yardx-filter4" style={{ paddingTop: "10px" }}>
            {/* Vessel Name */}
            <div className="fcol">
              <label htmlFor="vesselName">Vessel Name</label>
              <div className="search-pill">
                <span className="magnify" aria-hidden="true">🔍</span>
                <input
                  id="vesselName"
                  type="text"
                  name="vesselName"
                  value={filtersTop.vesselName}
                  onChange={onChangeTop}
                  placeholder="Search"
                  aria-label="Search Vessel Name"
                />
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>

            {/* Status (first) */}
            <div className="fcol">
              <label htmlFor="status1">Status</label>
              <div className="select-pill">
                <select
                  id="status1"
                  name="status1"
                  value={filtersTop.status1}
                  onChange={onChangeTop}
                  aria-label="Filter Status"
                >
                  <option value="">All ( Selected )</option>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>

            {/* Type */}
            <div className="fcol">
              <label htmlFor="type">Type</label>
              <div className="select-pill">
                <select
                  id="type"
                  name="type"
                  value={filtersTop.type}
                  onChange={onChangeTop}
                  aria-label="Filter Type"
                >
                  <option value="">All ( Selected )</option>
                  {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="arrow" aria-hidden="true">▾</span>
              </div>
            </div>

          
          </section>
          {/* Bottom section title */}
          <div className="yardx-title">Active Vessel</div>

          {/* Extended header outside the card — 9 columns aligned via colgroup */}
          <div className="yardx-extended-headers" role="presentation">
            <table className="extended-header-table" aria-hidden="true">
              <colgroup>
                <col style={{ width: '16%' }} /> {/* Ship Name */}
                <col style={{ width: '12%' }} /> {/* IMO */}
                <col style={{ width: '10%' }} /> {/* GT */}
                <col style={{ width: '14%' }} /> {/* Stage */}
                <col style={{ width: '10%' }} /> {/* Flag */}
                <col style={{ width: '12%' }} /> {/* IHM Status */}
                <col style={{ width: '10%' }} /> {/* Final Survey */}
                <col style={{ width: '8%' }} />  {/* Yard ID */}
                <col style={{ width: '8%' }} />  {/* Target Completion */}
              </colgroup>
              <thead>
                <tr>
                  <th><span className="yardx-pill pill-blue">Ship Name</span></th>
                  <th><span className="yardx-pill pill-cyan">IMO Number</span></th>
                  <th><span className="yardx-pill pill-teal">GT</span></th>
                  <th><span className="yardx-pill pill-blue">Stage</span></th>
                  <th><span className="yardx-pill pill-indigo">Flag</span></th>
                  <th><span className="yardx-pill pill-indigo">IHM Status</span></th>
                  <th><span className="yardx-pill pill-blue">Final Survey</span></th>
                  <th><span className="yardx-pill pill-dark">Yard ID</span></th>
                  <th><span className="yardx-pill pill-dark">Target Completion</span></th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Extended body inside the card */}
          <section className="yardx-card">
            <div className="yardx-tablewrap">
              <table className="yardx-table">
                <colgroup>
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                </colgroup>
                <tbody>
                  {pageRowsExt.map(v => (
                    <tr key={v.id}>
                      <td>{v.shipName}</td>
                      <td>{v.imo}</td>
                      <td>{v.gt}</td>
                      <td>{v.stage}</td>
                      <td>{v.flag}</td>
                      <td>{v.ihm}</td>
                      <td>{v.finalSurvey}</td>
                      <td>{v.yardId}</td>
                      <td>{fmt(v.targetCompletion)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination for extended table */}
            <div className="yardx-pagerbar">
              <div className="yardx-footnote">
                {totalExt > 0
                  ? <>Showing {startExt + 1}–{endExt} of {totalExt} entries</>
                  : <>Showing 0 of 0 entries</>}
              </div>

              <div className="yardx-pager">
                <button
                  className="pg nav"
                  disabled={safePageExt === 1}
                  onClick={() => setPageExt(p => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {pageButtonsExt.map((b, i) =>
                  b === "…" ? (
                    <span key={`edots-${i}`} className="pg ellipsis">…</span>
                  ) : (
                    <button
                      key={`ep-${b}`}
                      className={`pg ${safePageExt === b ? "active" : ""}`}
                      onClick={() => setPageExt(b)}
                      aria-label={`Page ${b}`}
                    >
                      {b}
                    </button>
                  )
                )}

                <button
                  className="pg nav"
                  disabled={safePageExt === totalPagesExt}
                  onClick={() => setPageExt(p => Math.min(totalPagesExt, p + 1))}
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          {/* Add Vessel Modal */}
          {modalOpen && (
            <div className="yardx-modalback" onClick={() => setModalOpen(false)}>
              <div className="yardx-modal" onClick={(e) => e.stopPropagation()}>
                <div className="yardx-modalhead">
                  <h3>Add Vessel</h3>
                  <button className="yardx-close" onClick={() => setModalOpen(false)}>✕</button>
                </div>
                <form className="yardx-modalform" onSubmit={addVessel}>
                  <label htmlFor="nv-shipName">Ship Name*</label>
                  <input id="nv-shipName" value={newVessel.shipName} onChange={(e) => setNewVessel(s => ({ ...s, shipName: e.target.value }))} />
                  <label htmlFor="nv-imo">IMO Number*</label>
                  <input id="nv-imo" value={newVessel.imo} onChange={(e) => setNewVessel(s => ({ ...s, imo: e.target.value }))} />
                  <label htmlFor="nv-gt">GT</label>
                  <input id="nv-gt" value={newVessel.gt} onChange={(e) => setNewVessel(s => ({ ...s, gt: e.target.value }))} />
                  <label htmlFor="nv-stage">Stage</label>
                  <input id="nv-stage" value={newVessel.stage} onChange={(e) => setNewVessel(s => ({ ...s, stage: e.target.value }))} />
                  <label htmlFor="nv-flag">Flag</label>
                  <input id="nv-flag" value={newVessel.flag} onChange={(e) => setNewVessel(s => ({ ...s, flag: e.target.value }))} />
                  <label htmlFor="nv-ihm">IHM Status</label>
                  <input id="nv-ihm" value={newVessel.ihm} onChange={(e) => setNewVessel(s => ({ ...s, ihm: e.target.value }))} />
                  <label htmlFor="nv-fs">Final Survey</label>
                  <input id="nv-fs" value={newVessel.finalSurvey} onChange={(e) => setNewVessel(s => ({ ...s, finalSurvey: e.target.value }))} />
                  <label htmlFor="nv-yard">Yard ID</label>
                  <input id="nv-yard" value={newVessel.yardId} onChange={(e) => setNewVessel(s => ({ ...s, yardId: e.target.value }))} />
                  <label htmlFor="nv-date">Target Completion</label>
                  <input id="nv-date" type="date" value={newVessel.targetCompletion} onChange={(e) => setNewVessel(s => ({ ...s, targetCompletion: e.target.value }))} />
                  <div className="yardx-modactions">
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* --------- Helpers --------- */
function fmt(iso) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}
function renderStatusChip(s) {
  const cls =
    s === "Anchored" ? "chip red" :
      s === "Underway" ? "chip green" :
        s === "Departed" ? "chip blue" :
          s === "Beached" ? "chip orange" : "chip indigo";
  return <span className={cls}>{s}</span>;
}
// demo only: infer a "type" from flag for bottom filter map
function inferTypeFromFlag(flag) {
  if (!flag) return "";
  const f = flag.toLowerCase();
  if (f.includes("panama")) return "General Cargo";
  if (f.includes("india")) return "Bulk Carrier";
  if (f.includes("liberia")) return "Container Ship";
  return "General Cargo";
}
