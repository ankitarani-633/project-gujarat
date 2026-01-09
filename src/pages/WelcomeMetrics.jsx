
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "./welcome-metrics.css";

export default function WelcomeMetrics() {
  const navigate = useNavigate();

  const logout = () => {
    auth.logout?.();
    navigate("/login", { replace: true });
  };

  const metrics = [
    {
      key: "regulatory",
      title: "Regulatory Compliance",
      value: "83%",
      tone: "tone-blue",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 3h9l3 3v15H6V3z" stroke="#fff" strokeWidth="1.8" />
          <path d="M9 8h6M9 12h6M9 16h6" stroke="#fff" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      key: "environmental",
      title: "Environmental",
      value: "73%",
      tone: "tone-green",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4C7 7 6 10 6 14c2 0 4-1 6-3 2 2 4 3 6 3 0-4-1-7-6-10z"
            stroke="#fff"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
    {
      key: "social",
      title: "Social / Safety",
      value: "58%",
      tone: "tone-cyan",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3l8 4v5c0 5-3.6 8.2-8 9-4.4-.8-8-4-8-9V7l8-4z"
            stroke="#fff"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="3.2" stroke="#fff" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      key: "economic",
      title: "Economic Impact",
      value: "56%",
      tone: "tone-deep",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="6" y="5" width="12" height="14" rx="2" stroke="#fff" strokeWidth="1.8" />
          <path d="M10 9h4M10 12h4M10 15h4" stroke="#fff" strokeWidth="1.8" />
        </svg>
      ),
    },
  ];

  return (
    <div className="home-wrapper">
      {/* Gradient header */}
      <Header onLogout={logout} />

      <div className="content">
        {/* Sidebar — set the active index to highlight this page */}
        <Sidebar activeIndex={1} />

        {/* Main content */}
        <main className="dashboard">
          {/* Banner strip */}
          <div className="wm-banner">
            <div className="wm-left">
              <h1 className="wm-welcome">
                Welcome <span className="wm-accent">Dhruv Mishra</span> !
              </h1>
              <div className="wm-underline" aria-hidden />
            </div>
            <div className="wm-rightchip">Director General Shipping</div>
          </div>

          {/* Subheading */}
          <div className="wm-subtitle">Performance Metrics Overview</div>

          {/* Metrics row — tilted cards like Home.jsx StatTilt */}
          <section className="wm-metrics">
            {metrics.map((m, i) => {
              const tiltDir = i % 2 === 0 ? "left" : "right";
              return (
                <article
                  key={m.key}
                  className={`wm-card ${m.tone} tilt-${tiltDir}`}
                  aria-label={`${m.title} metric`}
                >
                  <div className="wm-tilt-inner">
                    <div className="wm-card-top">
                      <div className="wm-icon">{m.icon}</div>
                      <div className="wm-card-title">{m.title}</div>
                    </div>
                    <div className="wm-card-value">{m.value}</div>
                  </div>

                  {/* Crisp inner outline */}
                  <span className="wm-card-outline" aria-hidden />

                  {/* Base drop shadow */}
                  <div className="wm-card-shadow" aria-hidden />
                </article>
              );
            })}
          </section>

          {/* Governance / Transparency block */}
          <section className="wm-governance" aria-label="Governance / Transparency">
            <div className="wm-gov-head">
              <span className="wm-gov-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="4" width="12" height="16" rx="2" stroke="#6b829f" strokeWidth="1.6" />
                  <path d="M8 8h6M8 12h6M8 16h4" stroke="#6b829f" strokeWidth="1.6" />
                </svg>
              </span>
              <span className="wm-gov-title">Governance / Transparency</span>
            </div>

            <div className="wm-gov-body">
              <div className="wm-gov-pill">
                <div className="wm-gov-pill-left">
                  <span className="wm-clock" aria-hidden>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8" stroke="#1e64ff" strokeWidth="1.8" />
                      <path d="M12 7v5l3 2" stroke="#1e64ff" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="wm-pill-texts">
                    <div className="wm-pill-title">Time to publish inspection & audit reports</div>
                    <div className="wm-pill-sub">Average processing time</div>
                  </div>
                </div>
                <div className="wm-pill-value">3 Days</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
