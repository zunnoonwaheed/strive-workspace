import { STRIVE_LINKS } from '../links';

const Advantages = () => {
  const advantages = [
    {
      id: 1,
      icon: <img src="/icons/advantage-location.png" alt="" aria-hidden="true" />,
      name: "Rapid Transit Access",
      description: "Located in the Evesham-Dietrich corridor, Strive provides a rapid commute via Route 73 and the NJ Turnpike."
    },
    {
      id: 2,
      icon: <img src="/icons/advantage-lightning.png" alt="" aria-hidden="true" />,
      name: "Seamless Connectivity",
      description: "Enjoy gigabit fiber for intensive calls and virtual meetings during your workday."
    },
    {
      id: 3,
      icon: <img src="/icons/advantage-shield.png" alt="" aria-hidden="true" />,
      name: "Elite Professionalism",
      description: "Impress clients with premium private offices and executive suites featuring whiteboards and presentation support to help close deals."
    },
    {
      id: 4,
      icon: <img src="/icons/advantage-bag.png" alt="" aria-hidden="true" />,
      name: "Lifestyle Integration",
      description: "Close to South Jersey's top shopping and dining, making your commute easier near Route 73."
    },
    {
      id: 5,
      icon: <img src="/icons/advantage-growth.png" alt="" aria-hidden="true" />,
      name: "Flexible Scalability",
      description: "We offer month-to-month options and flexible leasing plans designed to scale with your team's evolving professional needs."
    },
    {
      id: 6,
      icon: <img src="/icons/advantage-community.png" alt="" aria-hidden="true" />,
      name: "Local Networking",
      description: "Join hundreds of professionals and innovators at Strive, benefiting from a culture that drives high performance and connections."
    }
  ];

  return (
    <section className="advantage-section">
      <div className="advantage-content">
        <div className="advantage-header">
          <h2 className="section-title">Strategic Advantage of Marlton Workspaces</h2>
          <p className="section-description">
            Strive Workspaces provides a flexible, elite environment in Burlington County.
          </p>
          <a className="btn-primary" href={STRIVE_LINKS.scheduleTour} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>Schedule a Tour</a>
        </div>

        <div className="advantage-visual">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0d0eb2d5f1f06242856f46729de1b85332015465?width=2592"
            alt="Strategic location overview"
            className="advantage-hero-image"
          />

          <div className="advantage-grid">
            {advantages.map(advantage => (
              <div key={advantage.id} className="advantage-card">
                <div className="advantage-icon">{advantage.icon}</div>
                <div className="advantage-text">
                  <h3 className="advantage-name">{advantage.name}</h3>
                  <p className="advantage-desc">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
