const Workspaces = () => {
  return (
    <section className="workspaces-section">
      <div className="workspaces-content">
        <div className="workspaces-text">
          <h2 className="section-title">Workspaces Designed for High-Performance Days</h2>
          <p className="section-description">
            Whether you need privacy, a collaborative environment, or a client-ready setting — Strive gives you
            premium spaces that feel professional from day one.
          </p>
          <button className="btn-primary">Schedule a Tour</button>
        </div>

        <div className="workspace-carousel">
          <div className="workspace-card-large">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0a08a15401856f742f44ebd49f45f64201d91208?width=798"
              alt="Private office space"
              className="workspace-image"
            />
            <div className="workspace-overlay">
              <div className="workspace-info">
                <h3 className="workspace-name">Private Offices</h3>
                <p className="workspace-count">50+ Executive Suites</p>
              </div>
              <button className="btn-icon" aria-label="View details">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M11.1808 20.2495L19.9086 10.8411M19.9086 10.8411L10.8405 11.1814M19.9086 10.8411L20.2489 19.9092" stroke="#575FB9" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="workspace-card-medium">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/089d1325cc2aaa83858cf24eba3d6e5c851b3d6d?width=700"
              alt="Collaborative workspace"
              className="workspace-image"
            />
            <div className="workspace-overlay">
              <div className="workspace-info">
                <h3 className="workspace-name">Private Offices</h3>
                <p className="workspace-count">50+ Executive Suites</p>
              </div>
              <button className="btn-icon" aria-label="View details">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M9.93934 17.9999L17.6974 9.63685M17.6974 9.63685L9.63686 9.93933M17.6974 9.63685L17.9999 17.6974" stroke="#575FB9" strokeWidth="1.62963" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="workspace-card-small">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/090648f9a1ce986a270896ac4f988f3196dc0460?width=594"
              alt="Dedicated desk"
              className="workspace-image"
            />
            <div className="workspace-overlay">
              <div className="workspace-info">
                <h3 className="workspace-name">Private Offices</h3>
                <p className="workspace-count">50+ Executive Suites</p>
              </div>
              <button className="btn-icon" aria-label="View details">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8.94502 16.1998L15.9273 8.67306M15.9273 8.67306L8.67278 8.9453M15.9273 8.67306L16.1995 15.9276" stroke="#575FB9" strokeWidth="1.46667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="carousel-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workspaces;
