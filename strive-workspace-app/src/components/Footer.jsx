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
                  <p className="footer-tagline-large">Premium Private Offices & Coworking in Marlton, NJ</p>
                </div>

                <div className="footer-links-container">
                  <div className="footer-column">
                    <h4 className="footer-heading">Company</h4>
                    <ul className="footer-links">
                      <li><a href="#" className="footer-link">Location</a></li>
                      <li><a href="#" className="footer-link">Amenities</a></li>
                      <li><a href="#" className="footer-link">Membership Options</a></li>
                      <li><a href="#" className="footer-link">FAQs</a></li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h4 className="footer-heading">Product</h4>
                    <ul className="footer-links">
                      <li><a href="#" className="footer-link">Private Offices</a></li>
                      <li><a href="#" className="footer-link">Coworking Spaces</a></li>
                      <li><a href="#" className="footer-link">Meeting Rooms</a></li>
                      <li><a href="#" className="footer-link">Schedule a Tour</a></li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="footer-links">
                      <li><a href="#" className="footer-link">Tour Checklist</a></li>
                      <li><a href="#" className="footer-link">Workspace Guide</a></li>
                      <li><a href="#" className="footer-link">Terms of Service</a></li>
                      <li><a href="#" className="footer-link">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="footer-divider"></div>

              <div className="footer-copyright">
                <p className="footer-copyright-text">© 2026 Strive Workspaces. All rights reserved.</p>
                <div className="footer-legal-links">
                  <a href="#" className="footer-link">Privacy Policy</a>
                  <span className="footer-bullet"> • </span>
                  <a href="#" className="footer-link">Terms of Service</a>
                </div>
              </div>
            </div>

            {/* Mobile Footer - Original Structure */}
            <div className="footer-mobile-content">
              <div className="footer-brand">
                <h3 className="footer-logo">Strive</h3>
                <p className="footer-tagline">Private Offices & Coworking in Marlton, NJ</p>
              </div>

              <div className="footer-divider"></div>

              <div className="footer-links-container">
                <div className="footer-column">
                  <h4 className="footer-heading">Product</h4>
                  <ul className="footer-links">
                    <li><a href="#" className="footer-link">Private Offices</a></li>
                    <li><a href="#" className="footer-link">Coworking Spaces</a></li>
                    <li><a href="#" className="footer-link">Meeting Rooms</a></li>
                    <li><a href="#" className="footer-link">Schedule a Tour</a></li>
                  </ul>
                </div>

                <div className="footer-column">
                  <h4 className="footer-heading">Resources</h4>
                  <ul className="footer-links">
                    <li><a href="#" className="footer-link">Tour Checklist</a></li>
                    <li><a href="#" className="footer-link">Workspace Guide</a></li>
                    <li><a href="#" className="footer-link">Terms of Service</a></li>
                    <li><a href="#" className="footer-link">Privacy Policy</a></li>
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
