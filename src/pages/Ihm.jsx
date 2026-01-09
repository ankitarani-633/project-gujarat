
// src/pages/Ihm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../auth";
import "../styles/ihm.css";
import Vector from "../images/Vector.png";

export default function Ihm() {
  const navigate = useNavigate();
  const logout = () => { auth.logout(); navigate("/login", { replace: true }); };

  const [form, setForm] = useState({
    // --- Particulars of the Ship ---
    shipVesselName: "",
    distinctiveNo: "",
    portOfRegistry: "",
    typeOfVessel: "",
    grossTonnage: "",
    imoNumber: "",
    shipbuilderName: "",
    shipownerName: "",

    // --- Delivery / IHM numbers ---
    dateOfDelivery: "",
    ihmInventoryNumber: "",
    issueNumber: "",

    // --- Statements ---
    imoGuidelinesChecked: false,
    euRegChecked: false,

    // --- Initially prepared by ---
    initialPreparedName: "",
    initialPreparedCompany: "",
    initialPreparedAddress: "",
    initialPreparedPosition: "",
    initialPreparedDate: "",

    // --- Designated person(s) ---
    respName: "",
    respPosition: "",
    respInitials: "",
    respStartDate: "",
    respEndDate: "",

    // --- Inventory number display ---
    inventoryNumber: "0000000000000000000000000000",
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  // demo compliance checklist state
  const [compliance, setCompliance] = useState({
    envCert: true,
    safetyCert: true,
    hazardousInventory: true,
    documentSubmission: true,
  });

  return (
    <div className="ihmx-shell">
      {/* Top gradient header */}
      <Header onLogout={logout} />

      <div className="ihmx-row">
        {/* Left pill sidebar */}
        <Sidebar activeIndex={3} />

        {/* Main content */}
        <main className="ihmx-main">

          {/* Blue section title bar */}
          <div className="ihmx-titlebar">
            <div className="ihmx-title-left">
              <span className="ihmx-title-icon">
                <img src={Vector} alt="IHM Icon" />
              </span>
              <span className="ihmx-title">Inventory of Hazardous Materials</span>
            </div>
            
          </div>

          {/* Card: Particulars of the Ship */}
          <section className="ihmx-card">
            <div className="ihmx-cardtitle">Particulars of the Ship:</div>

            <div className="ihmx-grid">
              <FormField label="Ship/Vessel Name" required name="shipVesselName"
                value={form.shipVesselName} onChange={onChange} placeholder="Enter ship/vessel name" />
              <FormField label="Distinctive No. / Letters" required name="distinctiveNo"
                value={form.distinctiveNo} onChange={onChange} placeholder="Enter distinctive number/letters" />
              <FormField label="Port of Registry" required name="portOfRegistry"
                value={form.portOfRegistry} onChange={onChange} placeholder="Enter port of registry" />

              <FormField label="Type of vessel" required name="typeOfVessel"
                value={form.typeOfVessel} onChange={onChange} placeholder="e.g., Oil Tanker" />
              <FormField label="Gross Tonnage" required name="grossTonnage"
                value={form.grossTonnage} onChange={onChange} placeholder="Enter gross tonnage" />
              <FormField label="IMO Number" required name="imoNumber"
                value={form.imoNumber} onChange={onChange} placeholder="Enter IMO number" />

              <FormField label="Name of Shipbuilder" name="shipbuilderName"
                value={form.shipbuilderName} onChange={onChange} placeholder="Enter shipbuilder name" />
              <FormField label="Name of Shipowner" name="shipownerName"
                value={form.shipownerName} onChange={onChange} placeholder="Enter shipowner name" />
              <div className="ihmx-spacer" />
            </div>
          </section>

          {/* Card: Delivery / IHM numbers */}
          <section className="ihmx-card">
            <div className="ihmx-grid">
              <FormField label="Date of delivery" required name="dateOfDelivery"
                value={form.dateOfDelivery} onChange={onChange} type="date" />
              <FormField label="IHM Inventory Number" required name="ihmInventoryNumber"
                value={form.ihmInventoryNumber} onChange={onChange} placeholder="Enter IHM inventory number" />
              <FormField label="Issue Number" required name="issueNumber"
                value={form.issueNumber} onChange={onChange} placeholder="Enter issue number" />
            </div>
          </section>

          {/* Card: Statements */}
          {/* <section className="ihmx-card"> */}
            {/* <div className="ihmx-checkline"> */}
              <p className="ihmx-checktext">
                This inventory was developed in accordance with the IMO Guidelines for the Development of the Inventory of Hazardous Materials.
              </p>
              <label className="ihmx-checkwrap">
                <input type="checkbox" name="imoGuidelinesChecked"
                       checked={form.imoGuidelinesChecked} onChange={onChange} />
              </label>
            {/* </div> */}

            <div className="ihmx-checkline">
              <p className="ihmx-checktext">
                If the IHM has been developed to cover additional requirements of the EU Ship Recycling Regulation (EU) 1257/2013 please check this box.
              </p>
              <label className="ihmx-checkwrap">
                <input type="checkbox" name="euRegChecked"
                       checked={form.euRegChecked} onChange={onChange} />
              </label>
            </div>
          {/* </section> */}

          {/* Card: Initially prepared by */}
          <section className="ihmx-card">
            <div className="ihmx-cardtitle">Initially prepared by:</div>

            {/* Name | Company */}
            <div className="ihmx-grid2">
              <FormField label="Name" required name="initialPreparedName"
                value={form.initialPreparedName} onChange={onChange} placeholder="Enter name" />
              <FormField label="Company" required name="initialPreparedCompany"
                value={form.initialPreparedCompany} onChange={onChange} placeholder="Enter company" />
            </div>

            {/* Address (full width) */}
            <div className="ihmx-grid1">
              <FormArea label="Address" required name="initialPreparedAddress"
                value={form.initialPreparedAddress} onChange={onChange} placeholder="Enter address" />
            </div>

            {/* Position | Date */}
            <div className="ihmx-grid2">
              <FormField label="Position" required name="initialPreparedPosition"
                value={form.initialPreparedPosition} onChange={onChange} placeholder="Enter position" />
              <div className="ihmx-field">
                <label className="ihmx-label">Date <span className="req">*</span></label>
                <div className="ihmx-datepill">
                  <span className="ihmx-calendar">📅</span>
                  <input type="date" name="initialPreparedDate"
                         value={form.initialPreparedDate} onChange={onChange} />
                </div>
              </div>
            </div>
          </section>

          {/* Card: Designated person(s) */}
          <section className="ihmx-card">
            <div className="ihmx-cardtitle">Designated person(s) responsible for the inventory</div>

            {/* Name | Position | Initials */}
            <div className="ihmx-grid3">
              <FormField label="Name" required name="respName"
                value={form.respName} onChange={onChange} placeholder="Enter name" />
              <FormField label="Position" required name="respPosition"
                value={form.respPosition} onChange={onChange} placeholder="Enter position" />
              <FormField label="Initials" name="respInitials"
                value={form.respInitials} onChange={onChange} placeholder="e.g., DM" />
            </div>

            {/* Start Date | End Date */}
            <div className="ihmx-grid2">
              <div className="ihmx-field">
                <label className="ihmx-label">Start Date <span className="req">*</span></label>
                <div className="ihmx-datepill">
                  <span className="ihmx-calendar">📅</span>
                  <input type="date" name="respStartDate"
                         value={form.respStartDate} onChange={onChange} />
                </div>
              </div>
              <div className="ihmx-field">
                <label className="ihmx-label">End Date <span className="req">*</span></label>
                <div className="ihmx-datepill">
                  <span className="ihmx-calendar">📅</span>
                  <input type="date" name="respEndDate"
                         value={form.respEndDate} onChange={onChange} />
                </div>
              </div>
            </div>
          </section>

          {/* Inventory Number gradient pill */}
          <section className="ihmx-numberbar">
            <label className="ihmx-numberlabel">Inventory Number:</label>
            <div className="ihmx-numberchip">
              {form.inventoryNumber}
            </div>
          </section>

          {/* ---------- NEW: Beaching Permission ---------- */}
          <section className="ihmx-beach">
            <div className="ihmx-beach-title">Beaching Permission</div>

            {/* Subcard: Vessel Information */}
            <div className="ihmx-subcard">
              <div className="ihmx-subhead light">
                Vessel Information
              </div>

              <table className="ihmx-vesselinfo">
                <tbody>
                  <tr>
                    <td className="vi-label">Vessel Name :</td>
                    <td className="vi-value"><strong>Ocean Voyager</strong></td>
                    <td className="vi-label">Plot No :</td>
                    <td className="vi-value">52</td>
                  </tr>
                  <tr>
                    <td className="vi-label">GRT/NRT :</td>
                    <td className="vi-value"><strong>20,000 / 9,500</strong></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subcard: Compliance Summery (as written in PNG) */}
            <div className="ihmx-subcard">
              <div className="ihmx-subhead dark">
                Compliance Summery
              </div>

              <ul className="ihmx-checklist">
                <li className="ihmx-checkrow">
                  <span>Environmental Compliance Certificate</span>
                  <span className="ihmx-tick purple">☑</span>
                </li>
                <li className="ihmx-checkrow">
                  <span>Safety Mangement Certificate</span>
                  <span className="ihmx-tick purple">☑</span>
                </li>
                <li className="ihmx-checkrow">
                  <span>Hazardous waste Inventory</span>
                  <span className="ihmx-tick purple">☑</span>
                </li>
                <li className="ihmx-checkrow">
                  <span>Document Submission</span>
                  <span className="ihmx-tick purple">☑</span>
                </li>
              </ul>

              <div className="ihmx-approvebar">
                <button className="ihmx-approve">Approve</button>
              </div>
            </div>
          </section>

          {/* Actions */}
          {/* <div className="ihmx-actions">
            <button
              className="btn-secondary"
              onClick={() => setForm({
                shipVesselName: "", distinctiveNo: "", portOfRegistry: "",
                typeOfVessel: "", grossTonnage: "", imoNumber: "",
                shipbuilderName: "", shipownerName: "",
                dateOfDelivery: "", ihmInventoryNumber: "", issueNumber: "",
                imoGuidelinesChecked: false, euRegChecked: false,
                initialPreparedName: "", initialPreparedCompany: "",
                initialPreparedAddress: "", initialPreparedPosition: "",
                initialPreparedDate: "",
                respName: "", respPosition: "", respInitials: "",
                respStartDate: "", respEndDate: "",
                inventoryNumber: "0000000000000000000000000000",
              })}
            >
              Clear
            </button>
            <button className="btn-primary" onClick={() => alert("Saved (demo)")}>
              Save
            </button>
          </div> */}
        </main>
      </div>
    </div>
  );
}

/* --------- Field components --------- */
function FormField({ label, required, name, value, onChange, type = "text", placeholder }) {
  return (
    <div className="ihmx-field">
      <label className="ihmx-label">
        {label}{required && <span className="req">*</span>}
      </label>
      <input
        className="ihmx-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function FormArea({ label, required, name, value, onChange, placeholder }) {
  return (
    <div className="ihmx-field">
      <label className="ihmx-label">
        {label}{required && <span className="req">*</span>}
      </label>
      <textarea
        className="ihmx-textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  );
}
