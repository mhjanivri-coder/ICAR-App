'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { HerdDashboard, type AnimalRecord } from '../components/HerdDashboard';

const herdOptions = ['Murrah Herd', 'Nili-Ravi Herd'] as const;
const categoryOptions = ['Female', 'Male'] as const;
const statusOptions = ['Active (present in herd)', 'Archived / removed from herd'] as const;

type HerdOption = (typeof herdOptions)[number];
type CategoryOption = (typeof categoryOptions)[number];
type StatusOption = (typeof statusOptions)[number];

type FormState = {
  breed: string;
  tagNo: string;
  dateOfBirth: string;
  category: CategoryOption;
  identificationMark: string;
  status: StatusOption;
};

function getBreedFromHerd(herd: HerdOption | '') {
  if (herd === 'Murrah Herd') return 'Murrah buffalo';
  if (herd === 'Nili-Ravi Herd') return 'Nili-Ravi buffalo';
  return '';
}

export default function HomePage() {
  const [draftHerd, setDraftHerd] = useState<HerdOption | ''>('');
  const [selectedHerd, setSelectedHerd] = useState<HerdOption | ''>('');
  const [showAddAnimal, setShowAddAnimal] = useState(false);
  const [animals, setAnimals] = useState<AnimalRecord[]>([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    breed: '',
    tagNo: '',
    dateOfBirth: '',
    category: 'Female',
    identificationMark: '',
    status: 'Active (present in herd)'
  });

  const subtitle = useMemo(() => {
    if (!selectedHerd) {
      return 'ICAR-CIRB • choose herd first • then open the data recording screen';
    }
    return `${selectedHerd} selected • Patch 2 adds the Add Animal screen and simple local registry`;
  }, [selectedHerd]);

  const resetForm = (herd: HerdOption | '') => {
    setForm({
      breed: getBreedFromHerd(herd),
      tagNo: '',
      dateOfBirth: '',
      category: 'Female',
      identificationMark: '',
      status: 'Active (present in herd)'
    });
  };

  const handleConfirmHerd = () => {
    if (!draftHerd) return;
    setSelectedHerd(draftHerd);
    setShowAddAnimal(false);
    setAnimals([]);
    setSelectedAnimalId(null);
    resetForm(draftHerd);
  };

  const handleChangeHerd = () => {
    setSelectedHerd('');
    setDraftHerd('');
    setShowAddAnimal(false);
    setAnimals([]);
    setSelectedAnimalId(null);
    resetForm('');
  };

  const handleSaveAnimal = () => {
    if (!selectedHerd) return;
    if (!form.tagNo.trim() || !form.dateOfBirth.trim()) return;

    const newAnimal: AnimalRecord = {
      id: `${Date.now()}`,
      herd: selectedHerd,
      breed: form.breed,
      tagNo: form.tagNo.trim(),
      dateOfBirth: form.dateOfBirth.trim(),
      category: form.category,
      identificationMark: form.identificationMark.trim(),
      status: form.status,
      archived: form.status !== 'Active (present in herd)'
    };

    setAnimals((current) => [newAnimal, ...current]);
    setSelectedAnimalId(newAnimal.id);
    setShowAddAnimal(false);
    resetForm(selectedHerd);
  };

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
          <button
            className="primary-button"
            type="button"
            onClick={() => setShowAddAnimal((current) => !current)}
            disabled={!selectedHerd}
          >
            Add Animal
          </button>
        </header>

        {!selectedHerd ? (
          <section className="card step-card">
            <h2>Step 1: Select Herd</h2>
            <p>Choose the herd first. After confirmation, Step 2 opens the dashboard and Add Animal section based on your reference layout.</p>
            <div className="step-grid">
              <div>
                <label className="field-label" htmlFor="herd-selector">Choose herd</label>
                <select
                  id="herd-selector"
                  className="select-input"
                  value={draftHerd}
                  onChange={(e) => setDraftHerd(e.target.value as HerdOption | '')}
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
                onClick={handleConfirmHerd}
              >
                Continue
              </button>
            </div>
          </section>
        ) : (
          <>
            {showAddAnimal && (
              <section className="card add-animal-card">
                <h2>Add Animal</h2>
                <div className="form-grid">
                  <div>
                    <label className="field-label" htmlFor="breed">Breed</label>
                    <select
                      id="breed"
                      className="select-input"
                      value={form.breed}
                      onChange={(e) => setForm((current) => ({ ...current, breed: e.target.value }))}
                    >
                      <option value={getBreedFromHerd(selectedHerd)}>{getBreedFromHerd(selectedHerd)}</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="tagNo">Tag No.</label>
                    <input
                      id="tagNo"
                      className="text-input"
                      value={form.tagNo}
                      onChange={(e) => setForm((current) => ({ ...current, tagNo: e.target.value }))}
                      placeholder="Enter tag number"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="dob">Date of birth</label>
                    <input
                      id="dob"
                      className="text-input"
                      value={form.dateOfBirth}
                      onChange={(e) => setForm((current) => ({ ...current, dateOfBirth: e.target.value }))}
                      placeholder="dd/mm/yyyy"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="select-input"
                      value={form.category}
                      onChange={(e) => setForm((current) => ({ ...current, category: e.target.value as CategoryOption }))}
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="identificationMark">Identification mark</label>
                    <input
                      id="identificationMark"
                      className="text-input"
                      value={form.identificationMark}
                      onChange={(e) => setForm((current) => ({ ...current, identificationMark: e.target.value }))}
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="status">Status</label>
                    <select
                      id="status"
                      className="select-input"
                      value={form.status}
                      onChange={(e) => setForm((current) => ({ ...current, status: e.target.value as StatusOption }))}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleSaveAnimal}
                    disabled={!form.tagNo.trim() || !form.dateOfBirth.trim()}
                  >
                    Save Animal
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      resetForm(selectedHerd);
                      setShowAddAnimal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </section>
            )}

            <section className="card step-card compact">
              <h2>Step 2: {selectedHerd}</h2>
              <p>Dashboard is active. Patch 2 adds the Add Animal form, simple save action, and clickable preview cards.</p>
              <div className="inline-actions">
                <button className="secondary-button" type="button" onClick={handleChangeHerd}>Change Herd</button>
                {!showAddAnimal && (
                  <button className="primary-button" type="button" onClick={() => setShowAddAnimal(true)}>
                    Open Add Animal Form
                  </button>
                )}
              </div>
            </section>

            <HerdDashboard
              herd={selectedHerd}
              animals={animals}
              selectedAnimalId={selectedAnimalId}
              onSelectAnimal={setSelectedAnimalId}
            />
          </>
        )}
      </div>
    </main>
  );
}
