export type AnimalRecord = {
  id: string;
  herd: string;
  breed: string;
  tagNo: string;
  dateOfBirth: string;
  category: 'Female' | 'Male';
  identificationMark: string;
  status: string;
  archived: boolean;
};

type Props = {
  herd: string;
  animals: AnimalRecord[];
  selectedAnimalId: string | null;
  onSelectAnimal: (id: string) => void;
};

const statCards = [
  'Total Animals',
  'Females',
  'Males',
  'Heifers',
  'Colostrum-Heifer',
  'Colostrum',
  'In Milk',
  'Dry'
] as const;

export function HerdDashboard({ herd, animals, selectedAnimalId, onSelectAnimal }: Props) {
  const currentAnimals = animals.filter((animal) => !animal.archived);
  const archivedAnimals = animals.filter((animal) => animal.archived);
  const femaleAnimals = currentAnimals.filter((animal) => animal.category === 'Female');
  const maleAnimals = currentAnimals.filter((animal) => animal.category === 'Male');
  const selectedAnimal = animals.find((animal) => animal.id === selectedAnimalId) ?? null;

  const stats: Record<(typeof statCards)[number], number> = {
    'Total Animals': currentAnimals.length,
    Females: femaleAnimals.length,
    Males: maleAnimals.length,
    Heifers: 0,
    'Colostrum-Heifer': 0,
    Colostrum: 0,
    'In Milk': 0,
    Dry: 0
  };

  return (
    <section className="dashboard-grid">
      <div className="stats-grid">
        {statCards.map((title) => (
          <div key={title} className="card stat-card">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{stats[title]}</div>
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
              {femaleAnimals.length === 0 ? (
                <div className="empty-box">No female animals in current herd.</div>
              ) : (
                <div className="animal-list">
                  {femaleAnimals.map((animal) => (
                    <button
                      key={animal.id}
                      type="button"
                      className={`animal-chip ${selectedAnimalId === animal.id ? 'active' : ''}`}
                      onClick={() => onSelectAnimal(animal.id)}
                    >
                      <strong>{animal.tagNo}</strong>
                      <span>{animal.breed}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4>Males</h4>
              {maleAnimals.length === 0 ? (
                <div className="empty-box">No male animals in current herd.</div>
              ) : (
                <div className="animal-list">
                  {maleAnimals.map((animal) => (
                    <button
                      key={animal.id}
                      type="button"
                      className={`animal-chip ${selectedAnimalId === animal.id ? 'active' : ''}`}
                      onClick={() => onSelectAnimal(animal.id)}
                    >
                      <strong>{animal.tagNo}</strong>
                      <span>{animal.breed}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {archivedAnimals.length > 0 && (
            <div className="archive-note">
              Archived animals saved in this patch: {archivedAnimals.length}
            </div>
          )}
        </div>

        <div className="card preview-card">
          <h3>Selected Animal Preview</h3>
          {!selectedAnimal ? (
            <p>No animal selected for {herd}.</p>
          ) : (
            <div className="preview-grid">
              <div><span>Herd</span><strong>{selectedAnimal.herd}</strong></div>
              <div><span>Breed</span><strong>{selectedAnimal.breed}</strong></div>
              <div><span>Tag No.</span><strong>{selectedAnimal.tagNo}</strong></div>
              <div><span>Date of birth</span><strong>{selectedAnimal.dateOfBirth}</strong></div>
              <div><span>Category</span><strong>{selectedAnimal.category}</strong></div>
              <div><span>Status</span><strong>{selectedAnimal.status}</strong></div>
              <div className="full-row"><span>Identification mark</span><strong>{selectedAnimal.identificationMark || 'Not entered'}</strong></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
