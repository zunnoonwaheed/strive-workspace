const WorkspaceTypes = () => {
  const workspaceTypes = [
    {
      id: 1,
      name: "Hot Desk",
      description: "Flexible shared workspace perfect for freelancers and remote workers who need a professional environment without the commitment of a dedicated space.",
      pricing: "Starting from $25/day",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/dd95b01da0823d5f625438e2f9eed069b4045a29?width=258",
      features: [
        "Flexible daily, weekly, or monthly passes",
        "First-come, first-served seating",
        "Unlimited coffee bar and kitchen access",
        "Dynamic community events and networking"
      ]
    },
    {
      id: 2,
      name: "Meeting Rooms",
      description: "State-of-the-art conference and collaboration spaces. Equipped with premium AV technology, whiteboards, and professional ambiance for client presentations, team meetings, and workshops.",
      pricing: "Starting from $45/hour",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/da24caef5b16a5410c070a500e7ecfaebf6d923d?width=258",
      features: [
        "4K video conferencing and smart boards",
        "Capacity from 4 to 50+ people",
        "Professional sound system and lighting",
        "Hourly, daily, or monthly rental options"
      ]
    },
    {
      id: 3,
      name: "Private Office",
      description: "Exclusive, fully-furnished executive suites designed for maximum privacy and professionalism. Perfect for startups, consultants, and growing teams that need a permanent, prestigious business address.",
      pricing: "Starting from $800/month",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a92347875beeccd7db59f05c9b267abd86e11728?width=258",
      features: [
        "Customizable layouts from 100–500+ sq ft",
        "Private bathrooms and kitchenette access",
        "Soundproof walls and climate control",
        "Month-to-month or annual lease options"
      ]
    },
    {
      id: 4,
      name: "Dedicated Desks",
      description: "Your personal workspace in a vibrant coworking environment. Get the benefits of a fully-serviced office with the energy and networking opportunities of an open community.",
      pricing: "Starting from $350/month",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/dd95b01da0823d5f625438e2f9eed069b4045a29?width=258",
      features: [
        "Ergonomic desk setup with dual monitor support",
        "24/7 building access with secure entry",
        "Complimentary high-speed fiber WiFi",
        "Access to meeting rooms and lounges"
      ]
    }
  ];

  return (
    <section className="workspace-types-section">
      <div className="workspace-types-grid">
        {workspaceTypes.map((type, index) => (
          <div key={type.id} className="workspace-type-card">
            <div className={`card-background ${index % 2 === 0 ? 'card-frame-1' : 'card-frame-2'}`}></div>
            <div className="card-content">
              <div className="card-header">
                <img src={type.image} alt={type.name} className="type-icon" />
                <div className="divider"></div>
                <h3 className="type-name">{type.name}</h3>
                <p className="type-description">{type.description}</p>
              </div>

              <p className="pricing">{type.pricing}</p>

              <div className="features-list">
                {type.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="check-icon">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M12.4443 3.7334L5.59988 10.5778L2.48877 7.46673" stroke="#F3F5FB" strokeWidth="1.24444" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="feature-text">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkspaceTypes;
