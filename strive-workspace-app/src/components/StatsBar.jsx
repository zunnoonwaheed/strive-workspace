const StatsBar = () => {
  // Actual Strive Workspaces partner locations from striveworkspaces.com
  const partners = [
    { name: 'Strive Marlton', location: 'Marlton, NJ' },
    { name: 'Strive Princeton', location: 'Princeton, NJ' },
    { name: 'Strive Nashville', location: 'Nashville, TN' },
    { name: 'Strive Ann Arbor', location: 'Ann Arbor, MI' },
    { name: 'Strive Boulder', location: 'Boulder, CO' },
    { name: 'Strive Denver', location: 'Denver, CO' },
    { name: 'Strive Plano', location: 'Plano, TX' },
    { name: 'Strive North Dallas', location: 'North Dallas, TX' },
    { name: 'VX Braniff Centre', location: 'Dallas, TX' },
    { name: 'Flex at The Gild', location: 'Dallas, TX' },
    { name: 'Office Evolution', location: 'Cypress, TX' },
    { name: 'Waterfront Workspaces', location: 'Seattle, WA' },
  ];

  // Duplicate partners for seamless marquee loop
  const marqueePartners = [...partners, ...partners];

  return (
    <div className="stats-bar">
      <p className="partners-intro">We are partners with:</p>
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueePartners.map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="stat-item">
              <div className="partner-logo-text">
                <span className="partner-name">{partner.name}</span>
                <span className="partner-location">{partner.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
