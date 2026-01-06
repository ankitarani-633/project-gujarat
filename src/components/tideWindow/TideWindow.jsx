
import React, { useMemo, useState } from "react";
import "./tide-window.css";

/** Helpers */
const pad = (n) => String(n).padStart(2, "0");
const toInputValue = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromInputValue = (value) => {
  // value: "YYYY-MM-DD"
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const formatMonthLabel = (y, mIndex) =>
  new Date(y, mIndex, 1).toLocaleString("en-US", { month: "long", year: "numeric" });

const getDaysInMonth = (y, mIndex) => new Date(y, mIndex + 1, 0).getDate();
const getFirstWeekday = (y, mIndex) => new Date(y, mIndex, 1).getDay(); // 0=Sun..6=Sat

/** Status map to match Legend deterministically */
const dayStatus = (day) => {
  if (day % 6 === 0) return "assigned";
  if (day % 5 === 0) return "not";
  return "available";
};

/** Range helper */
const inRange = (date, from, to) => {
  if (!from || !to) return false;
  const time = date.setHours(0, 0, 0, 0);
  const f = from.setHours(0, 0, 0, 0);
  const t = to.setHours(0, 0, 0, 0);
  return time >= Math.min(f, t) && time <= Math.max(f, t);
};

export default function TideWindow() {
  // Default to April 2025 like the PNG
  const [viewYear, setViewYear] = useState(2025);
  const [viewMonth, setViewMonth] = useState(3); // 0=Jan, 3=Apr
  const [fromDate, setFromDate] = useState(new Date(2025, 3, 1));
  const [toDate, setToDate] = useState(new Date(2025, 3, 1));
  const [searched, setSearched] = useState(false);

  /** Calendar model */
  const firstWeekday = useMemo(() => getFirstWeekday(viewYear, viewMonth), [viewYear, viewMonth]);
  const daysInThisMonth = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  /** Navigate months */
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  /** Click on a day: first click sets from, second sets to */
  const onDayClick = (day) => {
    const clicked = new Date(viewYear, viewMonth, day);
    if (!fromDate) {
      setFromDate(clicked);
      setSearched(false);
      return;
    }
    if (!toDate || (toDate && fromDate && inRange(clicked, fromDate, toDate))) {
      // If click is inside the range, reset from
      setFromDate(clicked);
      setToDate(clicked);
      setSearched(false);
      return;
    }
    // Set toDate; if earlier, swap
    if (clicked < fromDate) {
      setToDate(fromDate);
      setFromDate(clicked);
    } else {
      setToDate(clicked);
    }
    setSearched(false);
  };

  /** Search: snap view to fromDate month and mark range */
  const onSearch = () => {
    if (!fromDate) return;
    if (!toDate) setToDate(fromDate);
    // Snap calendar to fromDate month/year
    setViewYear(fromDate.getFullYear());
    setViewMonth(fromDate.getMonth());
    setSearched(true);
  };

  /** Input bindings */
  const onFromInput = (e) => {
    const d = fromInputValue(e.target.value);
    if (d) {
      setFromDate(d);
      setSearched(false);
    }
  };
  const onToInput = (e) => {
    const d = fromInputValue(e.target.value);
    if (d) {
      setToDate(d);
      setSearched(false);
    }
  };

  /** Build day cells */
  const blanks = Array.from({ length: firstWeekday }, () => null);
  const days = Array.from({ length: daysInThisMonth }, (_, i) => i + 1);

  return (
    <div className="tw-page">
      <section className="tw-card" aria-label="Tide Window">
        <h2 className="tw-title">Tide Window</h2>

        <div className="tw-body">
          {/* Left: Controls */}
          <div className="tw-controls">
            <div className="tw-daterow">
              <input
                type="date"
                className="tw-pill tw-date"
                aria-label="From date"
                value={toInputValue(fromDate)}
                onChange={onFromInput}
              />
              <span className="tw-arrow" aria-hidden>→</span>
              <input
                type="date"
                className="tw-pill tw-date"
                aria-label="To date"
                value={toInputValue(toDate)}
                onChange={onToInput}
              />
            </div>

            <button type="button" className="tw-search" onClick={onSearch}>
              Search
            </button>
          </div>

          {/* Middle: Calendar */}
          <div className="tw-calendar" aria-label={`Calendar ${formatMonthLabel(viewYear, viewMonth)}`}>
            <div className="tw-calhead">
              <button className="tw-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
              <div className="tw-month">
                <span className="tw-month-name">{formatMonthLabel(viewYear, viewMonth)}</span>
                <span className="tw-carat" aria-hidden>›</span>
              </div>
              <button className="tw-nav" onClick={nextMonth} aria-label="Next month">›</button>
            </div>

            <div className="tw-weekdays">
              {["SUN","MON","TUE","WED","THU","FRI","SAT"].map((d) => (
                <div key={d} className="tw-wd">{d}</div>
              ))}
            </div>

            <div className="tw-grid">
              {/* leading blanks */}
              {blanks.map((_, i) => <div key={`b-${i}`} className="tw-day blank" />)}

              {/* month days */}
              {days.map((day) => {
                const date = new Date(viewYear, viewMonth, day);
                const isStart = fromDate && date.toDateString() === fromDate.toDateString();
                const isEnd = toDate && date.toDateString() === toDate.toDateString();
                const inSelRange = searched && inRange(date, fromDate, toDate);
                const status = dayStatus(day);

                const cls = [
                  "tw-day",
                  status,          // available | not | assigned
                  inSelRange ? "inrange" : "",
                  isStart ? "start" : "",
                  isEnd ? "end" : "",
                ].join(" ").trim();

                return (
                  <div
                    key={day}
                    className={cls}
                    role="button"
                    tabIndex={0}
                    onClick={() => onDayClick(day)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onDayClick(day)}
                    aria-label={`Day ${day}, ${status}${inSelRange ? ", in selected range" : ""}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Legend */}
          <aside className="tw-legend" aria-label="Legend">
            <div className="tw-leg-title">Legend</div>
            <div className="tw-leg-item">
              <span className="tw-dot available" /> <span>Available</span>
            </div>
            <div className="tw-leg-item">
              <span className="tw-dot not" /> <span>Not Available</span>
            </div>
            <div className="tw-leg-item">
              <span className="tw-dot assigned" /> <span>Assigned</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
