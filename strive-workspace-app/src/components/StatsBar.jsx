const StatsBar = () => {
  const images = [];
  for (let i = 1; i <= 9; i++) {
    images.push({
      id: i,
      image: `/& Image (${i}).png`,
      alt: `Tagline image ${i}`
    });
  }

  // Duplicate images for seamless loop
  const marqueeImages = [...images, ...images];

  return (
    <div className="stats-bar">
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeImages.map((item, index) => (
            <div key={`${item.id}-${index}`} className="stat-item">
              <img src={item.image} alt={item.alt} className="stat-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
