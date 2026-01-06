
import React from "react";
import "./document-verification.css";

export default function DocumentVerification() {
  return (
    <div >
      <h2 >Document Verification</h2>
      <section className="dv-card">
        

        <div className="dv-panel">
          <div className="dv-row">
            <div className="dv-left">
              <div className="dv-name">Ocean Trader</div>
              <div className="dv-sub">IMO Number</div>
            </div>

            {/* Wide yellow pill — visual only, like the PNG */}
            <button
              type="button"
              className="dv-pill"
              aria-haspopup="listbox"
              aria-expanded="false"
              title="Submission status"
            >
              <span className="dv-pill-text">Submission Pending</span>
              <span className="dv-pill-caret" aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
