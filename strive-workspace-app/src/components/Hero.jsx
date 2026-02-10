const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <img
          src="/hero-bg.png"
          alt="Hero background"
          className="hero-bg-image"
        />
        <img
          src="/hero-mobile.png"
          alt="Mobile hero"
          className="hero-mobile-image"
        />
      </div>

      <div className="hero-content">
        <h1 className="logo">Strive</h1>

        <div className="hero-main-content">
          <div className="hero-text-block">
            <h2 className="hero-title">Premium Private Offices & Coworking in Marlton, NJ</h2>
            <p className="hero-description">
              A modern workspace built for focus, client meetings, and flexible growth — with high-speed internet,
              meeting rooms, and a professional environment you'll feel proud to work from.
            </p>
          </div>

          <div className="hero-actions">
            <button className="btn-primary">Schedule a Tour</button>
            <button className="btn-secondary">Chat With Us Now</button>
          </div>
        </div>

        <div className="location-card">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/fb75501e0d525fe5d00d0d78e1382ccfeb168784?width=592"
            alt="Evesham District location"
            className="location-image"
          />
          <div className="location-info">
            <p className="location-district">Evesham District</p>
            <h3 className="location-title">New Location Active</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
