const PrimeDesk = () => {
  return (
    <section className="prime-desk-section">
      <div className="prime-desk-content">
        <div className="prime-desk-text">
          <h2 className="section-title">Prime Marlton Desk — Your Strategic South Jersey Workspace</h2>
          <p className="section-description">
            Located at the intersection of business and convenience, Strive puts you minutes from key highways,
            top-tier retail, and the professional ecosystem that drives growth in Burlington County.
          </p>

          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.0002 4.7998L7.2002 13.5998L3.2002 9.5998" stroke="#F3F5FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="benefit-text">Easy commute from <strong>Cherry Hill & Mount Laurel</strong></p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.0002 4.7998L7.2002 13.5998L3.2002 9.5998" stroke="#F3F5FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="benefit-text">Rapid access to <strong>Route 73 and NJ Turnpike</strong></p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.0002 4.7998L7.2002 13.5998L3.2002 9.5998" stroke="#F3F5FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="benefit-text">Minutes from <strong>shopping, dining, and daily essentials</strong></p>
            </div>
          </div>

          <button className="btn-primary">Schedule a Tour</button>
        </div>

        <div className="prime-desk-image">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/81e452afbf980909faac1b77e886452e0c6ab9ff?width=1249"
            alt="Premium office space interior"
            className="full-width-image"
          />
        </div>
      </div>
    </section>
  );
};

export default PrimeDesk;
