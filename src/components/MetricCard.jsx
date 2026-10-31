export default function MetricCard({ label, value, unit, helper }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <article className="metric-card h-100">
        <p className="metric-label">{label}</p>
        <div className="metric-value">{value}<span>{unit}</span></div>
        <p className="metric-helper">{helper}</p>
      </article>
    </div>
  );
}
