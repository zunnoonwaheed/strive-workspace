import { useState, useRef, useEffect } from 'react';

const Gallery = () => {
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: '/gallery-office-space.jpg',
      alt: 'Private office space in Marlton, NJ',
    },
    {
      id: 2,
      src: '/gallery-office-gym.webp',
      alt: 'On-site fitness center at Strive Marlton',
    },
    {
      id: 3,
      src: '/gallery-meeting-space.webp',
      alt: 'Meeting room at Strive Marlton',
    },
    {
      id: 4,
      src: '/gallery-coworking.webp',
      alt: 'Reception area at Strive Marlton',
    },
    {
      id: 5,
      src: '/gallery-training-room.webp',
      alt: 'Training room at Strive Marlton',
    },
    {
      id: 6,
      src: '/gallery-hot-desk.jpg',
      alt: 'Hot desk coworking space at Strive Marlton',
    },
  ];

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const firstItem = gallery.querySelector('.gallery-item');
      if (!firstItem) return;
      const itemWidth = firstItem.offsetWidth;
      const gap = 16; // Match CSS gap
      const scrollLeft = gallery.scrollLeft;
      const newIndex = Math.round(scrollLeft / (itemWidth + gap));
      setCurrentIndex(newIndex);
    };

    gallery.addEventListener('scroll', handleScroll);
    return () => gallery.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const firstItem = gallery.querySelector('.gallery-item');
    if (!firstItem) return;
    const itemWidth = firstItem.offsetWidth;
    const gap = 16;
    const targetScroll = index * (itemWidth + gap);
    gallery.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="section-title">Snaps of the Space</h2>
        <p className="section-description">
          Discover South Jersey's premium workspace. Filter by region and type.
        </p>
      </div>
      <div className="gallery-grid" ref={galleryRef}>
        {galleryImages.map((image) => (
          <div key={image.id} className="gallery-item">
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
      {/* Navigation Dots */}
      <div className="gallery-dots">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
