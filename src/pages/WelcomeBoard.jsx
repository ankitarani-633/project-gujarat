
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "./welcome-board.css";

/** Simple inline SVG icons to match the screenshot intent */
function Icon({ name }) {
  switch (name) {
    case "operations":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18M8 14h8" />
        </svg>
      );
    case "waste":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M7 6v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" />
          <path d="M10 10v8M14 10v8M9 3h6l1 3H8l1-3z" />
        </svg>
      );
    case "compliance":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h8M8 15h6" />
        </svg>
      );
    case "environment":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21c-4-2-7-5-7-9a7 7 0 1 1 14 0c0 4-3 7-7 9z" />
          <path d="M12 12l3-3M12 12l-3 3" />
        </svg>
      );
    case "safety":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l8 4v5c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z" />
          <path d="M12 9l2 2-2 2-2-2 2-2z" />
        </svg>
      );
    case "health":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M12 7v10M9 10h6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WelcomeBoard() {
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  const goNext = () => {
    // navigate to Operational Dashboard
    navigate("/operational");
  };

  const cards = [
    {
      key: "operations",
      title: "Operations",
      tone: "tone-blue",
      icon: "operations",
      bullets: [
        "Pre-arrival: 4 vessels",
        "Accepted: 8 vessels",
        "Beached: 7 vessels",
        "Dismantling: 10 vessels",
        "Completed: 5 this month",
      ],
    },
    {
      key: "waste",
      title: "Waste Management",
      tone: "tone-mint",
      icon: "waste",
      bullets: [
        "Total waste processed: 2,450 tons",
        "Recycled: 1,900 tons (78%)",
        "Hazardous waste disposed: 320 tons",
        "Pending pickups: 5",
      ],
    },
    {
      key: "compliance",
      title: "Compliance",
      tone: "tone-indigo",
      icon: "compliance",
      bullets: [
        "Facility audits completed: 15",
        "Pending non-conformities: 4",
        "Regulatory reports submitted: 6",
        "Upcoming assessments: 3",
      ],
    },
    {
      key: "environment",
      title: "Environment",
      tone: "tone-sky",
      icon: "environment",
      bullets: [
        "Ships inspected: 18",
        "Hazardous materials identified: 312",
        "Containers in safe storage: 120",
        "Open high-risk items: 7",
      ],
    },
    {
      key: "safety",
      title: "Safety",
      tone: "tone-lilac",
      icon: "safety",
      bullets: [
        "PPE compliance: 98%",
        "Spot safety checks: 720",
        "Safety trainings: 32",
        "Incidents this month: 1",
      ],
    },
    {
      key: "health",
      title: "Occupational Health",
      tone: "tone-cyan",
      icon: "health",
      bullets: [
        "Facility audits completed: 15",
        "Pending non-conformities: 4",
        "Regulatory reports submitted: 6",
        "Upcoming assessments: 3",
      ],
    },
  ];

  return (
    <div className="home-wrapper">
      <Header onLogout={logout} />
      <div className="content">
        <Sidebar activeIndex={0} />

        {/* Keep same container semantics as Home: .dashboard has padding in home.css */}
        <main className="dashboard wb-shell">

          {/* Welcome strip - matching the Home page styling */}
          <div className="welcome-strip">
            <h2 className="welcome-text">
              Welcome <span className="accent">Team</span> !
            </h2>
            <span className="chip-right">Gujarat Maritime Board</span>
          </div>

          {/* Cards grid */}
          <section className="wb-grid">
            {cards.map((c) => (
              <article key={c.key} className="wb-card">
                <header className={`wb-cardhead ${c.tone}`}>
                  <div className="icon-chip">
                    <span className="icon-wrap">
                      <Icon name={c.icon} />
                    </span>
                  </div>
                  <div className="wb-cardtitle">{c.title}</div>
                </header>

                <ul className="wb-list">
                  {c.bullets.map((b, idx) => (
                    <li key={idx} className="wb-li">{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          {/* Bottom actions */}
          <div className="wb-actions">
            <button type="button" className="wb-back" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <button type="button" className="wb-next" onClick={goNext}>
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
