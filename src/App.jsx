import { useEffect, useMemo, useState } from "react";
import MetricCard from "./components/MetricCard";
import { MonthlyTrend, CityComparison, PollutantComparison } from "./components/ChartPanel";
import { aggregateByCity, aggregateByMonth, filterReadings, getMetrics } from "./utils/dashboard";

const MONTHS = ["All months","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function App() {
  const [readings, setReadings] = useState([]);
  const [city, setCity] = useState("All cities");
  const [month, setMonth] = useState("All months");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/air_quality.json")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load the dataset.");
        return response.json();
      })
      .then(setReadings)
      .catch(() => setError("Dataset could not be loaded. Run the Python data-processing command and refresh."));
  }, []);

  const filtered = useMemo(() => filterReadings(readings, city, month), [readings, city, month]);
  const metrics = useMemo(() => getMetrics(filtered), [filtered]);
  const monthly = useMemo(() => aggregateByMonth(filtered), [filtered]);
  const cities = useMemo(() => aggregateByCity(filtered), [filtered]);
  const cityOptions = ["All cities", ...new Set(readings.map((item) => item.city))];

  const format = (value) => value.toFixed(1);

  return (
    <main className="app-shell">
      <nav className="topbar">
        <a className="brand" href="/" aria-label="ClearView dashboard home">
          <span className="brand-mark">C</span><span>ClearView <small>OPEN DATA</small></span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> Demo dataset loaded locally</span>
      </nav>

      <div className="container-fluid dashboard-container">
        <header className="page-header">
          <div>
            <p className="eyebrow">DATA EXPLORER / AIR QUALITY</p>
            <h1>Air quality overview</h1>
            <p className="subtitle">Explore air quality indicators across selected Indian cities.</p>
          </div>
          <div className="updated-pill">Illustrative sample · 2025</div>
        </header>

        <section className="filter-panel" aria-label="Dashboard filters">
          <div className="filter-intro"><strong>Filters</strong><span>Refine the displayed data</span></div>
          <label className="filter-control">City
            <select className="form-select" value={city} onChange={(event) => setCity(event.target.value)}>
              {cityOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="filter-control">Month
            <select className="form-select" value={month} onChange={(event) => setMonth(event.target.value)}>
              {MONTHS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <button className="btn btn-reset" onClick={() => { setCity("All cities"); setMonth("All months"); }}>Reset filters</button>
        </section>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {!error && readings.length > 0 && filtered.length === 0 && (
          <div className="alert alert-warning" role="status">No records match these filters. Try another city or month.</div>
        )}

        <section className="row g-3 metric-grid" aria-label="Key metrics">
          <MetricCard label="Average AQI" value={format(metrics.averageAqi)} unit="" helper="Across filtered records" />
          <MetricCard label="Average PM2.5" value={format(metrics.averagePm25)} unit=" µg/m³" helper="Fine particulate matter" />
          <MetricCard label="Average PM10" value={format(metrics.averagePm10)} unit=" µg/m³" helper="Coarse particulate matter" />
          <MetricCard label="Data records" value={metrics.readingCount} unit="" helper="Records in current view" />
        </section>

        <section className="row g-3 chart-grid">
          <div className="col-12 col-xl-7"><MonthlyTrend data={monthly} /></div>
          <div className="col-12 col-xl-5"><CityComparison data={cities} /></div>
          <div className="col-12"><PollutantComparison data={cities} /></div>
        </section>

        <section className="panel data-panel">
          <div className="panel-heading">
            <div><h2>Underlying records</h2><p>Filtered data used by the charts</p></div>
            <span className="record-count">{filtered.length} records</span>
          </div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>City</th><th>Date</th><th>AQI</th><th>PM2.5</th><th>PM10</th></tr></thead>
              <tbody>
                {filtered.slice(0, 12).map((item) => (
                  <tr key={`${item.city}-${item.date}`}>
                    <td className="city-cell">{item.city}</td><td>{item.date}</td>
                    <td><span className="aqi-value">{item.aqi}</span></td><td>{item.pm25}</td><td>{item.pm10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > 12 && <p className="table-note">Showing the first 12 of {filtered.length} records.</p>}
          </div>
        </section>

        <footer className="footer">
          <span>ClearView · Open Data Visualization Dashboard</span>
          <span>Learning project · Values are illustrative, not official air-quality measurements.</span>
        </footer>
      </div>
    </main>
  );
}
