const FindSpace = () => {
  return (
    <section className="find-space-section">
      <div className="find-space-content">
        <div className="find-space-form-wrapper">
          <h2 className="section-title">Find Coworking Space in South Jersey</h2>
          <p className="section-description">
            Discover premium office space and coworking in Marlton, Cherry Hill, and Burlington County. Filter by location and workspace type.
          </p>

          <div className="filter-form">
            <div className="filter-group">
              <label className="filter-label">Select Region</label>
              <div className="filter-divider"></div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Select Workspace Type</label>
              <div className="filter-divider"></div>
            </div>
            <button className="btn-primary">Find Spaces</button>
          </div>
        </div>

        <div className="space-cards">
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
              <h3 className="space-name">Elite Executive Suiteswith High-Speed Fiber</h3>
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
