
// src/components/Header.jsx
import { auth } from "../auth";
import "../styles/home.css";
import logo from "../images/logo_home.png"

export default function Header({ onLogout }) {
  const user = auth.getUser();
  return (
    <header className="header">
      <div className="brand">
  <div className="wheel"><img className="wheel-img" src={logo} alt="Logo" /></div>
        <div>
          <div className="brand-title">Digital Platform for Ship Recycling</div>
          <small>Gujarat Maritime Board</small>
        </div>
      </div>
    </header>
  );
}
