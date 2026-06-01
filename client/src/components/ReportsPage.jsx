import { useEffect, useState } from 'react';
import { getReports } from '../api.js';

export default function ReportsPage() {
  const [reports, setReports] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReports() {
      setError('');

      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError(`${err.status || ''} ${err.message}`.trim());
      }
    }

    loadReports();
  }, []);

  if (error) {
    return <div className="notice error">{error}</div>;
  }

  if (!reports) {
    return <p>Loading reports...</p>;
  }

  return (
    <section className="card narrow-card">
      <p className="eyebrow">Summary Counts</p>
      <h2>Reports</h2>
      <p className="muted-text">
        Compare these numbers against the actual job list. A QA tester should not blindly trust a dashboard.
      </p>

      <div className="report-grid">
        <ReportBox label="Total" value={reports.total} />
        <ReportBox label="Applied" value={reports.applied} />
        <ReportBox label="Interview" value={reports.interview} />
        <ReportBox label="Rejected" value={reports.rejected} />
        <ReportBox label="Offer" value={reports.offer} />
      </div>
    </section>
  );
}

function ReportBox({ label, value }) {
  return (
    <div className="report-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
