import { useState, useRef, useEffect } from 'react';

const Solutions = () => {
  const gridRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const amenityCards = [
    { id: 1, title: 'On-site Fitness Center' },
    { id: 2, title: 'Community Kitchen' },
    { id: 3, title: '24/7 Security' },
    { id: 4, title: 'Outdoor Workspace' },
    { id: 5, title: 'Enterprise Internet' },
    { id: 6, title: 'Printing & Scanning' },
  ];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScroll = () => {
      const firstCard = grid.querySelector('.amenity-card');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = 20; // Match CSS gap
      const scrollLeft = grid.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
    };

    grid.addEventListener('scroll', handleScroll);
    return () => grid.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const grid = gridRef.current;
    if (!grid) return;
    const firstCard = grid.querySelector('.amenity-card');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const targetScroll = index * (cardWidth + gap);
    grid.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  return (
    <section className="solutions-section">
      <div className="solutions-content">
        <div className="solutions-header">
          <h2 className="section-title">Seamless Work Solutions</h2>
          <p className="section-description">
            Beyond workspace, we provide a complete ecosystem of amenities designed to support your professional
            and personal well-being.
          </p>
        </div>

        <div className="amenities-grid" ref={gridRef} style={{
          boxShadow: '0 0 0 transparent',
          WebkitBoxShadow: '0 0 0 transparent',
          MozBoxShadow: '0 0 0 transparent',
          filter: 'none',
          WebkitFilter: 'none'
        }}>
          <div className="amenity-card" style={{
            boxShadow: '0 0 0 transparent',
            WebkitBoxShadow: '0 0 0 transparent',
            MozBoxShadow: '0 0 0 transparent',
            msBoxShadow: '0 0 0 transparent',
            OBoxShadow: '0 0 0 transparent',
            filter: 'none',
            WebkitFilter: 'none',
            MozFilter: 'none',
            msFilter: 'none',
            OFilter: 'none',
            dropShadow: 'none',
            WebkitDropShadow: 'none',
            border: 'none',
            outline: 'none'
          }}>
            <img
              src="/solutions/Frame_2147226711_3.png"
              alt="Fitness center"
              className="amenity-image"
              style={{
                boxShadow: '0 0 0 transparent',
                WebkitBoxShadow: '0 0 0 transparent',
                MozBoxShadow: '0 0 0 transparent',
                msBoxShadow: '0 0 0 transparent',
                OBoxShadow: '0 0 0 transparent',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box',
                filter: 'none',
                WebkitFilter: 'none',
                MozFilter: 'none',
                msFilter: 'none',
                OFilter: 'none',
                dropShadow: 'none',
                WebkitDropShadow: 'none'
              }}
            />
            <div className="amenity-overlay">
              <div className="amenity-info">
                <h3 className="amenity-title">On-site Fitness Center</h3>
                <p className="amenity-description">On-site fitness center exclusive to Marlton coworking members with cardio equipment and weights</p>
              </div>
            </div>
          </div>

          <div className="amenity-card" style={{
            boxShadow: '0 0 0 transparent',
            WebkitBoxShadow: '0 0 0 transparent',
            MozBoxShadow: '0 0 0 transparent',
            msBoxShadow: '0 0 0 transparent',
            OBoxShadow: '0 0 0 transparent',
            filter: 'none',
            WebkitFilter: 'none',
            MozFilter: 'none',
            msFilter: 'none',
            OFilter: 'none',
            dropShadow: 'none',
            WebkitDropShadow: 'none',
            border: 'none',
            outline: 'none'
          }}>
            <img
              src="/solutions/Frame_2147226712_1.png"
              alt="Community Kitchen"
              className="amenity-image"
              style={{
                boxShadow: '0 0 0 transparent',
                WebkitBoxShadow: '0 0 0 transparent',
                MozBoxShadow: '0 0 0 transparent',
                msBoxShadow: '0 0 0 transparent',
                OBoxShadow: '0 0 0 transparent',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box',
                filter: 'none',
                WebkitFilter: 'none',
                MozFilter: 'none',
                msFilter: 'none',
                OFilter: 'none',
                dropShadow: 'none',
                WebkitDropShadow: 'none'
              }}
            />
            <div className="amenity-overlay">
              <div className="amenity-info">
                <h3 className="amenity-title">Community Kitchen</h3>
                <p className="amenity-description">Complimentary coffee bar, full kitchen, and breakout space for South Jersey professionals</p>
              </div>
            </div>
          </div>

          <div className="amenity-card" style={{
            boxShadow: '0 0 0 transparent',
            WebkitBoxShadow: '0 0 0 transparent',
            MozBoxShadow: '0 0 0 transparent',
            msBoxShadow: '0 0 0 transparent',
            OBoxShadow: '0 0 0 transparent',
            filter: 'none',
            WebkitFilter: 'none',
            MozFilter: 'none',
            msFilter: 'none',
            OFilter: 'none',
            dropShadow: 'none',
            WebkitDropShadow: 'none',
            border: 'none',
            outline: 'none'
          }}>
            <img
              src="/solutions/Frame_2147226713_1.png"
              alt="24/7 Security"
              className="amenity-image"
              style={{
                boxShadow: '0 0 0 transparent',
                WebkitBoxShadow: '0 0 0 transparent',
                MozBoxShadow: '0 0 0 transparent',
                msBoxShadow: '0 0 0 transparent',
                OBoxShadow: '0 0 0 transparent',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box',
                filter: 'none',
                WebkitFilter: 'none',
                MozFilter: 'none',
                msFilter: 'none',
                OFilter: 'none',
                dropShadow: 'none',
                WebkitDropShadow: 'none'
              }}
            />
            <div className="amenity-overlay">
              <div className="amenity-info">
                <h3 className="amenity-title">24/7 Security</h3>
                <p className="amenity-description">Advanced surveillance & keycard access with badge entry systems</p>
              </div>
            </div>
          </div>

          <div className="amenity-card" style={{
            boxShadow: '0 0 0 transparent',
            WebkitBoxShadow: '0 0 0 transparent',
            MozBoxShadow: '0 0 0 transparent',
            msBoxShadow: '0 0 0 transparent',
            OBoxShadow: '0 0 0 transparent',
            filter: 'none',
            WebkitFilter: 'none',
            MozFilter: 'none',
            msFilter: 'none',
            OFilter: 'none',
            dropShadow: 'none',
            WebkitDropShadow: 'none',
            border: 'none',
            outline: 'none'
          }}>
            <img
              src="/solutions/Frame_2147226711_2.png"
              alt="Outdoor Workspace"
              className="amenity-image"
              style={{
                boxShadow: '0 0 0 transparent',
                WebkitBoxShadow: '0 0 0 transparent',
                MozBoxShadow: '0 0 0 transparent',
                msBoxShadow: '0 0 0 transparent',
                OBoxShadow: '0 0 0 transparent',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box',
                filter: 'none',
                WebkitFilter: 'none',
                MozFilter: 'none',
                msFilter: 'none',
                OFilter: 'none',
                dropShadow: 'none',
                WebkitDropShadow: 'none'
              }}
            />
            <div className="amenity-overlay">
              <div className="amenity-info">
                <h3 className="amenity-title">Outdoor Workspace</h3>
                <p className="amenity-description">Landscaped terrace with seating for outdoor meetings & breaks</p>
              </div>
            </div>
          </div>

          <div className="amenity-card" style={{
            boxShadow: '0 0 0 transparent',
            WebkitBoxShadow: '0 0 0 transparent',
            MozBoxShadow: '0 0 0 transparent',
            msBoxShadow: '0 0 0 transparent',
            OBoxShadow: '0 0 0 transparent',
            filter: 'none',
            WebkitFilter: 'none',
            MozFilter: 'none',
            msFilter: 'none',
            OFilter: 'none',
            dropShadow: 'none',
            WebkitDropShadow: 'none',
            border: 'none',
            outline: 'none'
          }}>
            <img
              src="/solutions/Frame_2147226712_2.png"
              alt="Enterprise Internet"
              className="amenity-image"
              style={{
                boxShadow: '0 0 0 transparent',
                WebkitBoxShadow: '0 0 0 transparent',
                MozBoxShadow: '0 0 0 transparent',
                msBoxShadow: '0 0 0 transparent',
                OBoxShadow: '0 0 0 transparent',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box',
                filter: 'none',
                WebkitFilter: 'none',
                MozFilter: 'none',
                msFilter: 'none',
                OFilter: 'none',
                dropShadow: 'none',
                WebkitDropShadow: 'none'
              }}
            />
            <div className="amenity-overlay">
              <div className="amenity-info">
                <h3 className="amenity-title">Enterprise Internet</h3>
                <p className="amenity-description">Gigabit fiber internet with 99.9% uptime for remote work and video conferencing</p>
              </div>
            </div>
          </div>

          <div className="amenity-card" style={{
            boxShadow: '0 0 0 transparent',
            WebkitBoxShadow: '0 0 0 transparent',
            MozBoxShadow: '0 0 0 transparent',
            msBoxShadow: '0 0 0 transparent',
            OBoxShadow: '0 0 0 transparent',
            filter: 'none',
            WebkitFilter: 'none',
            MozFilter: 'none',
            msFilter: 'none',
            OFilter: 'none',
            dropShadow: 'none',
            WebkitDropShadow: 'none',
            border: 'none',
            outline: 'none'
          }}>
            <img
              src="/solutions/Frame_2147226713.png"
              alt="Printing & Scanning"
              className="amenity-image"
              style={{
                boxShadow: '0 0 0 transparent',
                WebkitBoxShadow: '0 0 0 transparent',
                MozBoxShadow: '0 0 0 transparent',
                msBoxShadow: '0 0 0 transparent',
                OBoxShadow: '0 0 0 transparent',
                border: 'none',
                outline: 'none',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                backgroundClip: 'padding-box',
                WebkitBackgroundClip: 'padding-box',
                filter: 'none',
                WebkitFilter: 'none',
                MozFilter: 'none',
                msFilter: 'none',
                OFilter: 'none',
                dropShadow: 'none',
                WebkitDropShadow: 'none'
              }}
            />
            <div className="amenity-overlay">
              <div className="amenity-info">
                <h3 className="amenity-title">Printing & Scanning</h3>
                <p className="amenity-description">Enterprise-grade multifunction devices and document management</p>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Dots - Mobile Only */}
        <div className="amenities-dots">
          {amenityCards.map((_, index) => (
            <button
              key={index}
              className={`amenities-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to amenity ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
