// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../auth";
import "../styles/login.css";
import logo_home from "../images/logo_home.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userType: "",
    department: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.userType || !form.department || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    // Temporary fake login
    auth.login({
      name: "Dhruv Mishra",
      userType: form.userType,
      department: form.department,
      email: form.email,
    });

    navigate("/", { replace: true });
  };

  const onCancel = () => {
    setForm({
      userType: "",
      department: "",
      email: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="login-wrapper">
      <div className="bg-overlay" />

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo-mark"><img height ="42px" width="42px" src={logo_home} alt="Logo" /></div>
          <div className="title">
            <div>Digital Platform for Ship Recycling</div>
            <small>Gujarat Maritime Board</small>
          </div>
        </div>

        <h2 className="signin-text">Sign In</h2>

        {error && <div className="error-msg">{error}</div>}

        {/* Form */}
        <form onSubmit={onSubmit} className="form-grid">

          <label>User Type*</label>
          <select
            name="userType"
            value={form.userType}
            onChange={onChange}
          >
            <option value="">Select...</option>
            <option value="Admin">Admin</option>
            <option value="Officer">Officer</option>
            <option value="Worker">Worker</option>
          </select>

          <label>Department*</label>
          <select
            name="department"
            value={form.department}
            onChange={onChange}
          >
            <option value="">Select...</option>
            <option value="Ship Recycling Yard">Ship Recycling Yard</option>
            <option value="IHM & Waste Management">IHM & Waste Management</option>
            <option value="Compliance">Compliance</option>
          </select>

          <label>Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={form.email}
            onChange={onChange}
          />

          <label>Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Please enter your password"
            value={form.password}
            onChange={onChange}
          />

          <div className="actions">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>

          {/* Bottom Links */}
          <div className="bottom-links">
            <Link to="/forgot-password">Forgot Password</Link>
            <span>or</span>
            <Link to="/signup">Sign Up</Link>
          </div>

        </form>
      </div>
    </div>
  );
}
