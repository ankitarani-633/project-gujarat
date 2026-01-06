
// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { auth } from "../auth";
import "../styles/home.css";
import MetricStrip from "../components/metricstrip/MetricStrip";

export default function Home() {
  const navigate = useNavigate();
  const logout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  const goNext = () => {
    // navigate to the Plan page
    navigate("/plan");
  };

  const metrics = [
    { labelTop: "Tons of waste", labelBottom: "processed", value: "2450" },
    { labelTop: "Tons Waste", labelBottom: "Recycled", value: "340" },
    { labelTop: "Recycling", labelBottom: "Rate", value: "76%" },
  ];

  return (
    <div className="home-wrapper">
      <Header onLogout={logout} />
      <div className="content">
        <Sidebar activeIndex={0} />
        <main className="dashboard">

          {/* --- top welcome strip + subtitle --- */}

          <div className="welcome-strip banner">
            <h2 className="welcome-text">
              Welcome <span className="accent">Dhruv Mishra</span> !
            </h2>
            <span style={{ color: "white" }}>Gujarat Maritime Board</span>
          </div>


          <div className="section-subtitle">
            Ship Recycling Activities at Alang Ship recycling yard
          </div>

          {/* --- top tilted metric cards --- */}
          <div className="cards-row">
            <StatTilt
              title="Pre Arrival"
              subtitle="vessel En Route"
              subline="Scheduled Arrivals"
              valueTop="12"
              valueBottom="8"
              color="cyan"
              tilt="right"
            />
            <StatTilt
              title="Ship Acceptance"
              subtitle="Accepted Ships"
              subline="Pending inspections"
              valueTop="5"
              valueBottom="3"
              color="green"
              tilt="right"
            />
            <StatTilt
              title="Beaching Operations"
              subtitle="Ship beached"
              subline="Awaiting Beaching"
              valueTop="8"
              valueBottom="2"
              color="teal"
              tilt="right"
            />
            <StatTilt
              title="Dismantling Operations"
              subtitle="Ships Undergoing"
              subline="Vessels completed"
              valueTop="15"
              valueBottom="6"
              color="indigo"
              tilt="right"
            />
          </div>

          {/* --- middle panels for Hazardous + Storage + Waste --- */}
          <div className="panel-row">

            {/* ===== Hazardous Material Identification ===== */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <section className="panel">
                <div>
                  <div className="panel-head">
                    <div className="panel-title">
                      <span className="panel-icon" aria-hidden="true">🧪</span>
                      Hazardous Material Identification
                    </div>
                  </div>

                  <div className="panel-grid">
                    <StatMini label="ships Inspected" value="8" shade="navy" />
                    <StatMini label="Hazardous Material Identified" value="125" shade="purple" />
                    <StatMini label="completion rate" value="92%" shade="violet" />
                  </div>
                </div>
                <div>
                  <div className="panel-head">
                    <div className="panel-title">
                      <span className="panel-icon" aria-hidden="true">📦</span>
                      Storage and Management
                    </div>
                  </div>

                  <div className="panel-grid">
                    <StatMini label="storage Areas" value="45" shade="green" />
                    <StatMini label="Containers in Use" value="310" shade="blue" />
                    <StatMini label="capacity utilization" value="80%" shade="orange" />
                  </div>
                </div>
              </section>
              <section style={{ marginTop: "-1rem" }}>
                <MetricStrip title="Waste Management" metrics={metrics} />
                <div style={{ marginTop: "12px" }} className="wm-cta">
                  <button className="btn-next" onClick={goNext}>Next</button>
                </div>

              </section>
              
            </div>
          </div>


        </main>

      </div>
    </div>
  );
}


function StatTilt({
  title,
  subtitle,
  subline,
  valueTop,
  valueBottom,
  color = "cyan",
  tilt = "left",
}) {
  return (
    <div className={`stat-tilt ${color} ${tilt}`}>
      <div className="tilt-inner">
        <div className="tilt-title">{title}</div>
        <div className="tilt-sub">{subtitle}</div>
        <div className="tilt-values">
          <div className="v-top">{valueTop}</div>
          <div className="v-sub">{subline}</div>
          <div className="v-bottom">{valueBottom}</div>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, shade = "blue" }) {
  return (
    <div className={`mini ${shade}`}>
      <div className="mini-value">{value}</div>
      <div className="mini-label">{label}</div>
    </div>
  );
}

function WMItem({ label, value }) {
  return (
    <div className="wm-item">
      <div className="wm-label">{label}</div>
      <div className="wm-value">{value}</div>
    </div>
  );
}

