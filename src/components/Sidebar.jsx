
// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import "./../styles/home.css";

const menu = [
  { label: "Home", path: "/" },
  { label: "Ship Recycling Yard", path: "/yard" },
  { label: "Ship Recycling Plan", path: "/plan" }, // future
  { label: "IHM & Waste Management", path: "/ihm" }, // future
  { label: "Permission , Approval", path: "/approval" }, // future
  { label: "Worker’s Attendance & Training", path: "/training" }, // future
  { label: "Environmental & Safety Compliance", path: "/compliance" }, // future
];

export default function Sidebar({ activeIndex = 0 }) {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      {menu.map((m, i) => (
        <button
          key={m.label}
          className={`nav-item ${i === activeIndex ? "active" : ""}`}
          onClick={() => navigate(m.path)}
        >
          <span className="dot" />
          <span className="label">{m.label}</span>
        </button>
      ))}
    </aside>
  );
}