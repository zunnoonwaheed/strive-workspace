const PrimeDesk = () => {
  return (
    <section className="prime-desk-section">
      <div className="prime-desk-content">
        <div className="prime-desk-text">
          <h2 className="section-title">Prime Marlton Office Space — Strategic Location in South Jersey</h2>
          <p className="section-description">
            Located at the intersection of Route 73 and Route 70, our Marlton office space puts you minutes from the NJ Turnpike, Cherry Hill, Mount Laurel, and Burlington County's professional business ecosystem.
          </p>

          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.0002 4.7998L7.2002 13.5998L3.2002 9.5998" stroke="#F3F5FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="benefit-text">Easy commute from Cherry Hill, Mount Laurel & Voorhees</p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.0002 4.7998L7.2002 13.5998L3.2002 9.5998" stroke="#F3F5FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="benefit-text">Minutes from Route 73, Route 70 & NJ Turnpike Exit 4</p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.0002 4.7998L7.2002 13.5998L3.2002 9.5998" stroke="#F3F5FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="benefit-text">Walking distance to Marlton Town Center & dining options</p>
            </div>
          </div>

          <button className="btn-primary">Schedule a Tour</button>
        </div>

        <div className="prime-desk-image">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/81e452afbf980909faac1b77e886452e0c6ab9ff?width=1249"
            alt="Premium office space interior"
            className="full-width-image"
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
        </div>
      </div>
    </section>
  );
};

export default PrimeDesk;
