const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonial-container">
        <div className="testimonial-content">
          <div className="testimonial-layout">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/206d688d0c43da9917b550a2ee25af9ab7bbbdd5?width=674"
              alt="Client testimonial"
              className="testimonial-image"
            />

            <div className="testimonial-text-block">
              <blockquote className="testimonial-quote">
                "Strive Workspaces transformed how clients perceive my business. Having a professional meeting space
                in a prime Marlton location helped us close more deals this quarter."
              </blockquote>

              <div className="testimonial-author">
                <h3 className="author-name">Marlton Innovator</h3>
                <p className="author-title">Agency Founder</p>
              </div>
            </div>

            <div className="testimonial-controls">
              <button className="control-btn" aria-label="Next testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="control-btn" aria-label="Previous testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="testimonial-pagination">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
