const StatsBar = () => {
  const stats = [
    { id: 1, image: "https://api.builder.io/api/v1/image/assets/TEMP/d5379ba5f2e25bc69c4d1ef165e5c3a4cc85b0cf?width=200", alt: "Office icon" },
    { id: 2, image: "https://api.builder.io/api/v1/image/assets/TEMP/ee4a5d42e4a81b925aa6a00e28c06e3f2f3acb87?width=200", alt: "Users icon" },
    { id: 3, image: "https://api.builder.io/api/v1/image/assets/TEMP/3d798c2be1e5e1fbab8b88154d5efd70c20a53f7?width=200", alt: "Location icon" },
    { id: 4, image: "https://api.builder.io/api/v1/image/assets/TEMP/d8d90e50ed47f17ab6c97e16ba6d4d56df6c0742?width=200", alt: "Growth icon" }
  ];

  return (
    <div className="stats-bar">
      {stats.map(stat => (
        <div key={stat.id} className="stat-item">
          <img src={stat.image} alt={stat.alt} className="stat-icon" />
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
