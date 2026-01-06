
import React from "react";
import "./beaching-slot-allocation.css";

export default function BeachingSlotAllocation() {
  return (
    <div className="bs-page">
      <h2 className="bs-title">Beaching Slot Allocation</h2>
      <section className="bs-card">

        <div className="bs-panel">
          <table className="bs-table" role="table" aria-label="Beaching slot allocation">
            <tbody>
              {/* Row 1: Vessel Name */}
              <tr>
                <td className="bs-dotcol">
                  <span className="bs-dot" aria-hidden />
                </td>
                <td className="bs-label">Vessel Name</td>
                <td className="bs-vdiv" aria-hidden />
                <td className="bs-value">
                  <span className="bs-green">Sea Voyager</span>
                </td>
              </tr>

              {/* Row 2: Plot Number */}
              <tr>
                <td className="bs-dotcol">
                  <span className="bs-dot" aria-hidden />
                </td>
                <td className="bs-label">Plot Number</td>
                <td className="bs-vdiv" aria-hidden />
                <td className="bs-value">932184</td>
              </tr>

              {/* Row 3: GRT/NRT */}
              <tr>
                <td className="bs-dotcol">
                  <span className="bs-dot" aria-hidden />
                </td>
                <td className="bs-label">GRT/NRT</td>
                <td className="bs-vdiv" aria-hidden />
                <td className="bs-value">25.700/15.300</td> {/* numbers styled like PNG with dots */}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
