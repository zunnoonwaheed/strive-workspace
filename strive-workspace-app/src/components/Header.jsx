import { useState, useEffect } from 'react';
import Login from './Login';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
                <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
                <li><a href="#workspaces" onClick={() => setIsMenuOpen(false)}>Workspaces</a></li>
                <li><a href="#locations" onClick={() => setIsMenuOpen(false)}>Locations</a></li>
                <li><a href="#amenities" onClick={() => setIsMenuOpen(false)}>Amenities</a></li>
                <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
                <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              </ul>

              <div className="nav-footer">
                <button className="nav-cta-btn" onClick={() => { setIsMenuOpen(false); setIsLoginOpen(true); }}>Sign In</button>
                <button className="nav-cta-btn" onClick={() => setIsMenuOpen(false)}>Schedule a Tour</button>
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

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Header;
