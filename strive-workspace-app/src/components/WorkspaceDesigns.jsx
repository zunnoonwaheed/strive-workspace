import { useState } from 'react';

const WorkspaceDesigns = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const workspaceCards = [
    {
      id: 1,
      title: "Private Offices",
      subtitle: "Private Offices & Executive Suites in Marlton",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/0a08a15401856f742f44ebd49f45f64201d91208?width=798",
      isImage: true,
    },
    {
      id: 2,
      title: "Coworking Spaces",
      subtitle: "Coworking Memberships & Hot Desks",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/089d1325cc2aaa83858cf24eba3d6e5c851b3d6d?width=700",
      isImage: false,
    },
    {
      id: 3,
      title: "Meeting Rooms",
      subtitle: "Hourly Meeting Room Rentals",
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

        <div className="workspace-carousel-container" style={{ 
          boxShadow: 'none', 
          WebkitBoxShadow: 'none',
          MozBoxShadow: 'none',
          msBoxShadow: 'none',
          OBoxShadow: 'none',
          filter: 'none', 
          WebkitFilter: 'none',
          MozFilter: 'none',
          msFilter: 'none',
          OFilter: 'none',
          dropShadow: 'none',
          WebkitDropShadow: 'none',
          isolation: 'isolate',
          mixBlendMode: 'normal',
          WebkitMixBlendMode: 'normal'
        }}>
          {workspaceCards.map((card, index) => {
            // Calculate which visual position this card should occupy
            const visualPosition = (index - currentSlide + workspaceCards.length) % workspaceCards.length;
            const isSlot1 = visualPosition === 0;
            const isSlot2 = visualPosition === 1;
            const isSlot3 = visualPosition === 2;
            
            // ALWAYS show 3 cards - no conditions
            const shouldShow = true; // Always show all cards
            
            // Determine which position class to use based on visual position
            let positionClass = '';
            if (isSlot1) {
              positionClass = card.isImage ? 'workspace-card-slot-1' : 'workspace-card-slot-1-bg';
            } else if (isSlot2) {
              positionClass = 'workspace-card-slot-2';
            } else if (isSlot3) {
              positionClass = 'workspace-card-slot-3';
            }
            
            return (
              <div
                key={card.id}
                className={positionClass}
                style={{ 
                  backgroundImage: `url(${card.backgroundImage})`,
                  opacity: shouldShow ? 1 : 0,
                  zIndex: isSlot1 ? 3 : isSlot2 ? 2 : 1,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0,
                  margin: 0,
                  border: 'none',
                  boxShadow: '0 0 0 transparent',
                  WebkitBoxShadow: '0 0 0 transparent',
                  MozBoxShadow: '0 0 0 transparent',
                  msBoxShadow: '0 0 0 transparent',
                  OBoxShadow: '0 0 0 transparent',
                  outline: 'none',
                  WebkitOutline: 'none',
                  borderImage: 'none',
                  WebkitBorderImage: 'none',
                  MozBorderImage: 'none',
                  filter: 'none',
                  WebkitFilter: 'none',
                  MozFilter: 'none',
                  msFilter: 'none',
                  OFilter: 'none',
                  dropShadow: 'none',
                  WebkitDropShadow: 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'transparent',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  textShadow: 'none',
                  WebkitTextShadow: 'none',
                  MozTextShadow: 'none',
                  msTextShadow: 'none',
                  OTextShadow: 'none',
                  isolation: 'isolate',
                  mixBlendMode: 'normal',
                  WebkitMixBlendMode: 'normal',
                  clipPath: 'none',
                  WebkitClipPath: 'none',
                  WebkitMaskImage: 'none',
                  maskImage: 'none',
                  WebkitMask: 'none',
                  mask: 'none',
                  boxShadow: '0 0 0 transparent',
                  WebkitBoxShadow: '0 0 0 transparent',
                  MozBoxShadow: '0 0 0 transparent',
                  msBoxShadow: '0 0 0 transparent',
                  OBoxShadow: '0 0 0 transparent'
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
                    style={{
                      boxShadow: 'none',
                      filter: 'none',
                      WebkitFilter: 'none'
                    }}
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
