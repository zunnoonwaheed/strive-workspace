import { useState, useEffect } from 'react';

const testimonialsData = [
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/206d688d0c43da9917b550a2ee25af9ab7bbbdd5?width=674",
    quote: "Strive Workspaces changed client perceptions. A professional meeting space in Marlton helped us close more deals.",
    name: "Marlton Innovator",
    title: "Agency Founder",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/206d688d0c43da9917b550a2ee25af9ab7bbbdd5?width=674",
    quote: "The flexible workspace options at Strive allowed our team to scale without the hassle of long-term leases. We love the professional environment and the community of like-minded entrepreneurs.",
    name: "Sarah Chen",
    title: "Startup CEO",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/206d688d0c43da9917b550a2ee25af9ab7bbbdd5?width=674",
    quote: "Best decision we made for our remote team. The meeting rooms are always available, and the high-speed internet keeps us connected with clients worldwide.",
    name: "James Rivera",
    title: "Tech Lead",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/206d688d0c43da9917b550a2ee25af9ab7bbbdd5?width=674",
    quote: "Strive's Marlton location is perfect for our hybrid workforce. Professional setting, great amenities, and the staff goes above and beyond.",
    name: "Emily Foster",
    title: "Operations Director",
  },
];

const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll to next testimonial
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const testimonial = testimonialsData[currentIndex];

  return (
    <section className="testimonials-section">
      <div className="testimonial-container">
        <div className="testimonial-content">
          <div className="testimonial-layout" key={currentIndex}>
            <img
              src={testimonial.image}
              alt={`${testimonial.name} testimonial`}
              className="testimonial-image testimonial-slide-in"
            />

            <div className="testimonial-text-block testimonial-slide-in">
              <blockquote className="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>

              <div className="testimonial-author">
                <h3 className="author-name">{testimonial.name}</h3>
                <p className="author-title">{testimonial.title}</p>
              </div>
            </div>

            <div className="testimonial-controls">
              <button className="control-btn" aria-label="Previous testimonial" onClick={goToPrev}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="testimonial-pagination">
                {testimonialsData.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    onKeyDown={(e) => e.key === 'Enter' && setCurrentIndex(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button className="control-btn" aria-label="Next testimonial" onClick={goToNext}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
