import { useState, useRef, useEffect } from 'react';

const REGION_OPTIONS = [
  { value: '', label: 'Select Region' },
  { value: 'marlton', label: 'Marlton' },
  { value: 'cherry-hill', label: 'Cherry Hill' },
  { value: 'burlington', label: 'Burlington County' },
  { value: 'all', label: 'All Regions' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'Select Workspace Type' },
  { value: 'private-office', label: 'Private Office' },
  { value: 'coworking', label: 'Coworking' },
  { value: 'meeting-room', label: 'Meeting Room' },
  { value: 'all', label: 'All Types' },
];

const FindSpace = () => {
  const [region, setRegion] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');
  const [regionOpen, setRegionOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const cardsRef = useRef(null);
  const regionRef = useRef(null);
  const typeRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (regionRef.current && !regionRef.current.contains(e.target)) setRegionOpen(false);
      if (typeRef.current && !typeRef.current.contains(e.target)) setTypeOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const handleFindSpaces = (e) => {
    e.preventDefault();
    setRegionOpen(false);
    setTypeOpen(false);
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const regionLabel = REGION_OPTIONS.find((o) => o.value === region)?.label ?? 'Select Region';
  const typeLabel = TYPE_OPTIONS.find((o) => o.value === workspaceType)?.label ?? 'Select Workspace Type';

  return (
    <section className="find-space-section">
      <div className="find-space-content">
        <div className="find-space-form-wrapper">
          <h2 className="section-title">Find Your Strive Space</h2>
          <p className="section-description">
            Discover South Jersey's premium workspace. Filter by region and type.
          </p>

          <form className="filter-form" onSubmit={handleFindSpaces}>
            <div className="filter-group" ref={regionRef}>
              <label className="filter-label">Select Region</label>
              <div
                className="filter-select filter-select-trigger"
                role="button"
                tabIndex={0}
                onClick={() => setRegionOpen((o) => !o)}
                onKeyDown={(e) => e.key === 'Enter' && setRegionOpen((o) => !o)}
                aria-expanded={regionOpen}
                aria-haspopup="listbox"
              >
                <span className={region ? '' : 'filter-select-placeholder'}>{regionLabel}</span>
              </div>
              {regionOpen && (
                <ul className="filter-select-dropdown" role="listbox">
                  {REGION_OPTIONS.map((opt) => (
                    <li
                      key={opt.value || 'empty'}
                      role="option"
                      aria-selected={region === opt.value}
                      className="filter-select-option"
                      onClick={() => {
                        setRegion(opt.value);
                        setRegionOpen(false);
                      }}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="filter-group" ref={typeRef}>
              <label className="filter-label">Select Workspace Type</label>
              <div
                className="filter-select filter-select-trigger"
                role="button"
                tabIndex={0}
                onClick={() => setTypeOpen((o) => !o)}
                onKeyDown={(e) => e.key === 'Enter' && setTypeOpen((o) => !o)}
                aria-expanded={typeOpen}
                aria-haspopup="listbox"
              >
                <span className={workspaceType ? '' : 'filter-select-placeholder'}>{typeLabel}</span>
              </div>
              {typeOpen && (
                <ul className="filter-select-dropdown" role="listbox">
                  {TYPE_OPTIONS.map((opt) => (
                    <li
                      key={opt.value || 'empty'}
                      role="option"
                      aria-selected={workspaceType === opt.value}
                      className="filter-select-option"
                      onClick={() => {
                        setWorkspaceType(opt.value);
                        setTypeOpen(false);
                      }}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="btn-primary">Find Spaces</button>
          </form>
        </div>

        <div className="space-cards" ref={cardsRef}>
          <div className="space-card">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/34a01d8d71ec7ca5090fcbc8977f40399e02ae41?width=733"
              alt="Marlton West location"
              className="space-image"
              style={{
                boxShadow: 'none',
                WebkitBoxShadow: 'none',
                MozBoxShadow: 'none',
                msBoxShadow: 'none',
                OBoxShadow: 'none',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box'
              }}
            />
            <div className="space-info">
              <p className="space-location">Marlton West</p>
              <h3 className="space-name">Elite Executive Suites with High-Speed Fiber</h3>
            </div>
          </div>

          <div className="space-card">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ca080e553ff10fd88d58ab033058dc5a6745ba00?width=733"
              alt="Cherry Hill location"
              className="space-image"
              style={{
                boxShadow: 'none',
                WebkitBoxShadow: 'none',
                MozBoxShadow: 'none',
                msBoxShadow: 'none',
                OBoxShadow: 'none',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box'
              }}
            />
            <div className="space-info">
              <p className="space-location">Cherry Hill</p>
              <h3 className="space-name">Modern Co-Working with Premium Amenities</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindSpace;
