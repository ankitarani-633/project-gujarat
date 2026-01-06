
import React from "react";
import "./metric-strip.css";

const MetricStrip = ({
  title = "Waste Management",
  metrics = [
    { labelTop: "Tons of waste", labelBottom: "processed", value: "2450" },
    { labelTop: "Tons Waste", labelBottom: "Recycled", value: "340" },
    { labelTop: "Recycling", labelBottom: "Rate", value: "76%" },
  ],
}) => {
  return (
    <section className="strip" aria-label={`${title} metrics`}>
      {/* Left title block */}
      <div className="strip__title">
        <span className="strip__accent" aria-hidden="true" />
        <span className="strip__titleText">{title}</span>
      </div>

      {/* Metric blocks */}
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className={`strip__metric strip__metric--${idx + 1}`}
          role="group"
          aria-label={`${m.labelTop} ${m.labelBottom} ${m.value}`}
        >
          <div className="strip__labels">
            <div className="strip__labelTop">{m.labelTop}</div>
            <div className="strip__labelBottom">{m.labelBottom}</div>
          </div>
          <div className="strip__value">{m.value}</div>
        </div>
      ))}
    </section>
  );
};

export default MetricStrip;
