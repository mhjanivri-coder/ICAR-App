'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { HerdDashboard } from '../components/HerdDashboard';

const herdOptions = ['Murrah Herd', 'Nili-Ravi Herd'];

export default function HomePage() {
  const [draftHerd, setDraftHerd] = useState('');
  const [selectedHerd, setSelectedHerd] = useState('');

  const subtitle = useMemo(() => {
    if (!selectedHerd) {
      return 'ICAR-CIRB • NPBI workflow • first select herd, then open blank dashboard';
    }
    return `${selectedHerd} selected • blank dashboard loaded for phased development`;
  }, [selectedHerd]);

  return (
    <main className="page-shell">
      <div className="container">
        <header className="card header-card">
          <div className="brand">
            <Image src="/icar-cirb-badge.svg" alt="ICAR-CIRB badge" width={64} height={64} priority />
            <div>
              <h1>NPBI Data Recording App</h1>
              <p>{subtitle}</p>
            </div>
          </div>
          <button className="primary-button" type="button">Add Animal</button>
        </header>

        {!selectedHerd ? (
          <section className="card step-card">
            <h2>Step 1: Select Herd</h2>
            <p>Choose the herd first. After confirmation, Step 2 opens the blank dashboard based on your reference layout.</p>
            <div className="step-grid">
              <div>
                <label className="field-label" htmlFor="herd-selector">Choose herd</label>
                <select
                  id="herd-selector"
                  className="select-input"
                  value={draftHerd}
                  onChange={(e) => setDraftHerd(e.target.value)}
                >
                  <option value="">Select herd</option>
                  {herdOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="primary-button"
                disabled={!draftHerd}
                onClick={() => setSelectedHerd(draftHerd)}
              >
                Continue
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="card step-card compact">
              <h2>Step 2: {selectedHerd}</h2>
              <p>Blank dashboard view is now active.</p>
              <button className="secondary-button" type="button" onClick={() => setSelectedHerd('')}>Change Herd</button>
            </section>
            <HerdDashboard herd={selectedHerd} />
          </>
        )}
      </div>
    </main>
  );
}
