
import React from "react";
import "./document-type.css";

const rows = [
  { type: "Ship Recycle Facility Plan", status: "Not Submitted", last: "--------" },
  { type: "Inventory of Hazardous Materials", status: "Not Submitted", last: "--------" },
  { type: "Insurance Certificate", status: "Not Submitted", last: "--------" },
];

export default function DocumentType() {
  return (
    <div>
      <section className="docx-card" aria-label="Document Type">
        {/* Header strip: title left, button right (rounded, bright blue) */}
        <div className="docx-head">
          <div className="docx-title">Document Type</div>
          <button className="docx-submit" type="button">Submit</button>
        </div>

        {/* Table wrapper */}
        <div className="docx-tablewrap">
          <table className="docx-table" role="table">
            <thead>
              <tr>
                <th className="docx-th">Document Type</th>
                <th className="docx-th">Status</th>
                <th className="docx-th">Last Modifier</th>
                <th className="docx-th docx-th-empty" />
              </tr>
            </thead>

            {/* dashed border immediately under header row like PNG */}
            <tbody className="docx-body">
              {rows.map((r) => (
                <tr key={r.type} className="docx-row">
                  <td className="docx-td docx-type">{r.type}</td>
                  <td className="docx-td docx-status docx-red">{r.status}</td>
                  <td className="docx-td docx-muted">{r.last}</td>
                  <td className="docx-td docx-action">
                    <button className="docx-upload" type="button">Upload</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
