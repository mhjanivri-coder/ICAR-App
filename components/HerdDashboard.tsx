type Props = { herd: string };

const statCards = [
  'Total Animals',
  'Females',
  'Males',
  'Heifers',
  'Colostrum-Heifer',
  'Colostrum',
  'In Milk',
  'Dry'
];

export function HerdDashboard({ herd }: Props) {
  return (
    <section className="dashboard-grid">
      <div className="stats-grid">
        {statCards.map((title) => (
          <div key={title} className="card stat-card">
            <div className="stat-title">{title}</div>
            <div className="stat-value">0</div>
          </div>
        ))}
      </div>

      <div className="main-grid">
        <div className="card registry-card">
          <h3>Herd Registry</h3>
          <label className="field-label" htmlFor="search">Search</label>
          <input id="search" className="text-input" placeholder="Search by tag no." />
          <div className="tab-row">
            <button className="primary-button small" type="button">Current Herd</button>
            <button className="secondary-button small" type="button">Archive</button>
          </div>
          <div className="registry-columns">
            <div>
              <h4>Females</h4>
              <div className="empty-box">No female animals in current herd.</div>
            </div>
            <div>
              <h4>Males</h4>
              <div className="empty-box">No male animals in current herd.</div>
            </div>
          </div>
        </div>

        <div className="card preview-card">
          <h3>Selected Animal Preview</h3>
          <p>No animal selected for {herd}.</p>
        </div>
      </div>
    </section>
  );
}
