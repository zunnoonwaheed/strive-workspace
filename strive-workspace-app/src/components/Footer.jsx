const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-logo">Strive</h3>
          <p className="footer-description">Premium workspace solutions for modern professionals in South Jersey.</p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Workspace</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Private Offices</a></li>
            <li><a href="#" className="footer-link">Dedicated Desks</a></li>
            <li><a href="#" className="footer-link">Hot Desks</a></li>
            <li><a href="#" className="footer-link">Meeting Rooms</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Locations</a></li>
            <li><a href="#" className="footer-link">Amenities</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
            <li><a href="#" className="footer-link">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">© 2024 Strive Workspaces. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
