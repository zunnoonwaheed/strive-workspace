import { useState } from 'react';

const WorkspaceDesigns = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const workspaceCards = [
    {
      id: 1,
      title: "Private Offices",
      subtitle: "50+ Executive Suites",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/0a08a15401856f742f44ebd49f45f64201d91208?width=798",
      isImage: true,
    },
    {
      id: 2,
      title: "Coworking Spaces",
      subtitle: "Flexible Seating",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/089d1325cc2aaa83858cf24eba3d6e5c851b3d6d?width=700",
      isImage: false,
    },
    {
      id: 3,
      title: "Meeting Rooms",
      subtitle: "Professional Setup",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/090648f9a1ce986a270896ac4f988f3196dc0460?width=594",
      isImage: false,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % workspaceCards.length);
  };

  return (
    <section className="workspace-designs-section">
      <div className="workspace-designs-content">
        <div className="workspace-designs-text">
          <h2 className="section-title">Workspaces Designed for High-Performance Days</h2>
          <p className="section-description">
            Whether you need privacy, a collaborative environment, or a client-ready setting — Strive gives you premium spaces that feel professional from day one.
          </p>
          <button className="btn-primary">Schedule a Tour</button>
        </div>

        <div className="workspace-carousel-container">
          {workspaceCards.map((card, index) => {
            // Calculate which visual position this card should occupy
            const visualPosition = (index - currentSlide + workspaceCards.length) % workspaceCards.length;
            const isSlot1 = visualPosition === 0;
            const isSlot2 = visualPosition === 1;
            const isSlot3 = visualPosition === 2;
            
            if (card.isImage) {
              // Image card - only show when it's in front position (slot 1)
              return (
                <div
                  key={card.id}
                  className="workspace-card-slot-1"
                  style={{ 
                    opacity: isSlot1 ? 1 : 0,
                    zIndex: isSlot1 ? 3 : 0,
                    transition: 'opacity 0.6s ease',
                    backgroundImage: `url(${card.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="workspace-card-content">
                    <div className="workspace-card-text">
                      <h3 className="workspace-card-title">{card.title}</h3>
                      <p className="workspace-card-subtitle">{card.subtitle}</p>
                    </div>
                    <button
                      className="workspace-card-icon-btn"
                      aria-label={`View ${card.title} details`}
                      onClick={nextSlide}
                    >
                      <img src="/arrow-right.png" alt="Next" className="workspace-card-arrow-icon" />
                    </button>
                  </div>
                </div>
              );
            }

            // Background image cards - determine which position class to use
            let positionClass = '';
            if (isSlot1) {
              positionClass = 'workspace-card-slot-1-bg';
            } else if (isSlot2) {
              positionClass = 'workspace-card-slot-2';
            } else {
              positionClass = 'workspace-card-slot-3';
            }
            
            return (
              <div
                key={card.id}
                className={positionClass}
                style={{ 
                  backgroundImage: `url(${card.backgroundImage})`,
                  opacity: visualPosition < 3 ? 1 : 0,
                  zIndex: isSlot1 ? 3 : isSlot2 ? 2 : 1,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="workspace-card-content">
                  <div className="workspace-card-text">
                    <h3 className="workspace-card-title">{card.title}</h3>
                    <p className="workspace-card-subtitle">{card.subtitle}</p>
                  </div>
                  <button
                    className="workspace-card-icon-btn"
                    aria-label={`View ${card.title} details`}
                    onClick={nextSlide}
                  >
                    <img src="/arrow-right.png" alt="Next" className="workspace-card-arrow-icon" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="workspace-progress-bar">
            <div className="workspace-progress-track"></div>
            <div 
              className="workspace-progress-fill"
              style={{ width: `${((currentSlide + 1) / workspaceCards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceDesigns;
