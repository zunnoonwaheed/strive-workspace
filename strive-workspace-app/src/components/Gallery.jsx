const Gallery = () => {
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

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="section-title">Snaps of the Space</h2>
        <p className="section-description">
          Discover South Jersey's premium workspace. Filter by region and type.
        </p>
      </div>
      <div className="gallery-grid">
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
    </section>
  );
};

export default Gallery;
