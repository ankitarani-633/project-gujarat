
import React from "react";
import "./beaching-clearance.css";

export default function BeachingClearance() {
  return (
    <div className="bc-page">
      <h2 className="bc-title">Beaching Clearance</h2>
      <section className="bc-card">
        

        <div className="bc-panel">
          <table className="bc-table" role="table" aria-label="Beaching clearance details">
            <tbody>
              {/* Row 1: Status */}
              <tr>
                <td className="bc-dotcol">
                  <span className="bc-dot" aria-hidden />
                </td>
                <td className="bc-label">Status</td>
                <td className="bc-vdiv" aria-hidden />
                <td className="bc-value">
                  <span className="bc-badge bc-badge-green">Approved</span>
                </td>
              </tr>

              {/* Row 2: Approval Date */}
              <tr>
                <td className="bc-dotcol">
                  <span className="bc-dot" aria-hidden />
                </td>
                <td className="bc-label">Approval Date</td>
                <td className="bc-vdiv" aria-hidden />
                <td className="bc-value">
                  <span className="bc-badge bc-badge-blue">Apr 1, 2025</span>
                </td>
              </tr>

              {/* Row 3: Reference No. */}
              <tr>
                <td className="bc-dotcol">
                  <span className="bc-dot" aria-hidden />
                </td>
                <td className="bc-label">Reference No.</td>
                <td className="bc-vdiv" aria-hidden />
                <td className="bc-value">
                  <strong className="bc-ref">BC-96765</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

