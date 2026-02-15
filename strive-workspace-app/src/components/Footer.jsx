import { STRIVE_LINKS } from '../links';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <img src="/footer-desktop.png" alt="" className="footer-frame-bg footer-desktop-bg" />
          <img src="/footer-frame.png" alt="" className="footer-frame-bg footer-mobile-bg" />
          <div className="footer-content-wrapper">
            {/* Desktop Footer */}
            <div className="footer-desktop-content">
              <div className="footer-promo">
                <p className="footer-promo-text">Join hundreds of working people with Strive</p>
              </div>

              <div className="footer-divider"></div>

              <div className="footer-main-content">
                <div className="footer-brand-section">
                  <h3 className="footer-logo-small">Strive</h3>
                  <p className="footer-tagline-large">Premium Private Offices & Coworking Space in Marlton, NJ</p>
                </div>

                <div className="footer-links-container">
                  <div className="footer-column">
                    <h4 className="footer-heading">Company</h4>
                    <ul className="footer-links">
                      <li><a href={STRIVE_LINKS.locations} className="footer-link" target="_blank" rel="noopener noreferrer">Location</a></li>
                      <li><a href={STRIVE_LINKS.home} className="footer-link" target="_blank" rel="noopener noreferrer">Amenities</a></li>
                      <li><a href={STRIVE_LINKS.pricing} className="footer-link" target="_blank" rel="noopener noreferrer">Membership Options</a></li>
                      <li><a href={STRIVE_LINKS.home} className="footer-link" target="_blank" rel="noopener noreferrer">FAQs</a></li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h4 className="footer-heading">Product</h4>
                    <ul className="footer-links">
                      <li><a href={STRIVE_LINKS.privateOffices} className="footer-link" target="_blank" rel="noopener noreferrer">Private Offices</a></li>
                      <li><a href={STRIVE_LINKS.hotDesks} className="footer-link" target="_blank" rel="noopener noreferrer">Coworking Spaces</a></li>
                      <li><a href={STRIVE_LINKS.meetingRooms} className="footer-link" target="_blank" rel="noopener noreferrer">Meeting Rooms</a></li>
                      <li><a href={STRIVE_LINKS.scheduleTour} className="footer-link" target="_blank" rel="noopener noreferrer">Schedule a Tour</a></li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="footer-links">
                      <li><a href={STRIVE_LINKS.contact} className="footer-link" target="_blank" rel="noopener noreferrer">Tour Checklist</a></li>
                      <li><a href={STRIVE_LINKS.home} className="footer-link" target="_blank" rel="noopener noreferrer">Workspace Guide</a></li>
                      <li><a href={STRIVE_LINKS.terms} className="footer-link" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
                      <li><a href={STRIVE_LINKS.privacy} className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="footer-divider"></div>

              <div className="footer-copyright">
                <p className="footer-copyright-text">© 2026 Strive Workspaces. All rights reserved.</p>
                <div className="footer-legal-links">
                  <a href={STRIVE_LINKS.privacy} className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  <span className="footer-bullet"> • </span>
                  <a href={STRIVE_LINKS.terms} className="footer-link" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                </div>
              </div>
            </div>

            {/* Mobile Footer - Original Structure */}
            <div className="footer-mobile-content">
              <div className="footer-brand">
                <h3 className="footer-logo">Strive</h3>
                <p className="footer-tagline">Premium Private Offices & Coworking Space in Marlton, NJ</p>
              </div>

              <div className="footer-divider"></div>

              <div className="footer-links-container">
                <div className="footer-column">
                  <h4 className="footer-heading">Product</h4>
                  <ul className="footer-links">
                    <li><a href={STRIVE_LINKS.privateOffices} className="footer-link" target="_blank" rel="noopener noreferrer">Private Offices</a></li>
                    <li><a href={STRIVE_LINKS.hotDesks} className="footer-link" target="_blank" rel="noopener noreferrer">Coworking Spaces</a></li>
                    <li><a href={STRIVE_LINKS.meetingRooms} className="footer-link" target="_blank" rel="noopener noreferrer">Meeting Rooms</a></li>
                    <li><a href={STRIVE_LINKS.scheduleTour} className="footer-link" target="_blank" rel="noopener noreferrer">Schedule a Tour</a></li>
                  </ul>
                </div>

                <div className="footer-column">
                  <h4 className="footer-heading">Resources</h4>
                  <ul className="footer-links">
                    <li><a href={STRIVE_LINKS.contact} className="footer-link" target="_blank" rel="noopener noreferrer">Tour Checklist</a></li>
                    <li><a href={STRIVE_LINKS.home} className="footer-link" target="_blank" rel="noopener noreferrer">Workspace Guide</a></li>
                    <li><a href={STRIVE_LINKS.terms} className="footer-link" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
                    <li><a href={STRIVE_LINKS.privacy} className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>

              <div className="footer-divider"></div>

              <div className="footer-copyright">
                <p>© 2026 Strive Workspaces. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
