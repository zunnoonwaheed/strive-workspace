import { useState, useEffect } from 'react';
import { STRIVE_LINKS } from '../links';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="mobile-header">
        <button
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="mobile-logo">Strive</h1>
      </header>

      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <div className="nav-header">
              <h2 className="nav-logo">Strive</h2>
              <button className="nav-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="nav-content">
              <ul className="mobile-nav-list">
                <li><a href={STRIVE_LINKS.home} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                <li><a href={STRIVE_LINKS.home + '#amenities'} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Features</a></li>
                <li><a href={STRIVE_LINKS.home + '#spaces'} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Workspaces</a></li>
                <li><a href={STRIVE_LINKS.locations} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Locations</a></li>
                <li><a href={STRIVE_LINKS.home + '#amenities'} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Amenities</a></li>
                <li><a href={STRIVE_LINKS.about} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
                <li><a href={STRIVE_LINKS.contact} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              </ul>

              <div className="nav-footer">
                <a href={STRIVE_LINKS.scheduleTour} target="_blank" rel="noopener noreferrer" className="nav-cta-btn" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>Schedule a Tour</a>
                <div className="nav-contact">
                  <p className="nav-contact-label">Get in Touch</p>
                  <a href="tel:214-851-1233" className="nav-contact-link">(214) 851-1233</a>
                  <a href="mailto:info@striveworkspaces.com" className="nav-contact-link">info@striveworkspaces.com</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}

    </>
  );
};

export default Header;
