import { STRIVE_LINKS } from '../links';

const WorkspaceTypes = () => {
  const workspaceTypes = [
    {
      id: 1,
      name: "Hot Desks/Coworking",
      description: "Flexible, day-pass or membership-based workspaces for freelancers, remote workers, and flexible professionals. Perfect for those who need workspace without long-term commitment.",
      pricing: "Starting from $25/day or $150/month",
      image: "/workspace-hot-desks.webp",
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
      description: "Professional meeting room rentals in Marlton by the hour. Conference spaces with AV technology, whiteboards, and presentation equipment — ideal for client meetings, team workshops, and training sessions in South Jersey.",
      pricing: "Starting from $45/hour",
      image: "/workspace-meeting-rooms.webp",
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
      description: "Private office space for rent in Marlton with flexible month-to-month leasing. Fully-furnished executive suites perfect for consultants, startups, and growing teams in South Jersey.",
      pricing: "Starting from $800/month",
      image: "/workspace-private-office.webp",
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
      description: "Reserved dedicated desk in Marlton's premier coworking space. Your personal workspace with the networking benefits of shared office space — includes 24/7 access, high-speed internet, and meeting room credits.",
      pricing: "Starting from $350/month",
      image: "/workspace-dedicated-desks.webp",
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
      <div className="workspace-types-header">
        <div className="workspace-types-header-text">
          <h2 className="section-title">Our Space Types</h2>
          <p className="section-description">
            Choose the workspace solution for comfort and productivity.
          </p>
        </div>
        <a className="btn-primary" href={STRIVE_LINKS.scheduleTour} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>Schedule a Tour</a>
      </div>
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
