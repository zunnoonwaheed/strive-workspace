const Features = () => {
  return (
    <section className="features-section">
      <img src="/section2-mobile-bg.png" alt="" className="features-mobile-bg" />
      <div className="section-header">
        <h2 className="section-title">Extraordinary Features, Built for Real Work</h2>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <svg className="feature-icon" width="54" height="54" viewBox="0 0 54 54" fill="none">
            <path d="M18 4.5V13.5M36 4.5V13.5M6.75 22.5H47.25M20.25 36L24.75 40.5L33.75 31.5M11.25 9H42.75C45.2353 9 47.25 11.0147 47.25 13.5V45C47.25 47.4853 45.2353 49.5 42.75 49.5H11.25C8.76472 49.5 6.75 47.4853 6.75 45V13.5C6.75 11.0147 8.76472 9 11.25 9Z" stroke="#346646" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="feature-content">
            <div className="feature-text">
              <h3 className="feature-title">Flexible Leasing</h3>
              <p className="feature-description">Month-to-month options designed to scale with your team.</p>
            </div>
            <button className="btn-feature">Explore Flexible Plans</button>
          </div>
        </div>

        <div className="feature-card">
          <svg className="feature-icon" width="54" height="54" viewBox="0 0 54 54" fill="none">
            <path d="M8.99986 31.5C8.57408 31.5015 8.15663 31.3821 7.79601 31.1557C7.43538 30.9293 7.14639 30.6053 6.9626 30.2212C6.77881 29.8372 6.70777 29.4088 6.75773 28.986C6.8077 28.5631 6.97662 28.1632 7.24486 27.8325L29.5199 4.8825C29.6869 4.68963 29.9146 4.5593 30.1656 4.5129C30.4165 4.4665 30.6757 4.50678 30.9008 4.62713C31.1258 4.74749 31.3032 4.94077 31.4039 5.17524C31.5046 5.40972 31.5225 5.67146 31.4549 5.9175L27.1349 19.4625C27.0075 19.8034 26.9647 20.1702 27.0102 20.5313C27.0557 20.8924 27.1881 21.237 27.3961 21.5357C27.604 21.8344 27.8813 22.0782 28.2042 22.2461C28.5271 22.4141 28.8859 22.5012 29.2499 22.5H44.9999C45.4256 22.4985 45.8431 22.6179 46.2037 22.8443C46.5643 23.0707 46.8533 23.3947 47.0371 23.7788C47.2209 24.1628 47.2919 24.5912 47.242 25.014C47.192 25.4369 47.0231 25.8368 46.7549 26.1675L24.4799 49.1175C24.3128 49.3104 24.0851 49.4407 23.8342 49.4871C23.5832 49.5335 23.324 49.4932 23.099 49.3729C22.874 49.2525 22.6965 49.0592 22.5959 48.8248C22.4952 48.5903 22.4772 48.3285 22.5449 48.0825L26.8649 34.5375C26.9922 34.1966 27.035 33.8298 26.9895 33.4687C26.944 33.1076 26.8116 32.763 26.6037 32.4643C26.3957 32.1656 26.1184 31.9218 25.7955 31.7539C25.4726 31.5859 25.1138 31.4988 24.7499 31.5H8.99986Z" stroke="#663634" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="feature-content">
            <div className="feature-text">
              <h3 className="feature-title">High-Speed Internet</h3>
              <p className="feature-description">Reliable gigabit fiber connectivity to support calls, meetings, and deep work.</p>
            </div>
            <button className="btn-feature">Explore Amenities</button>
          </div>
        </div>

        <div className="feature-card">
          <svg className="feature-icon" width="54" height="54" viewBox="0 0 54 54" fill="none">
            <path d="M4.5 6.75H49.5M47.25 6.75V31.5C47.25 32.6935 46.7759 33.8381 45.932 34.682C45.0881 35.5259 43.9435 36 42.75 36H11.25C10.0565 36 8.91193 35.5259 8.06802 34.682C7.22411 33.8381 6.75 32.6935 6.75 31.5V6.75M15.75 47.25L27 36L38.25 47.25" stroke="#346646" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="feature-content">
            <div className="feature-text">
              <h3 className="feature-title">Professional Meeting Rooms</h3>
              <p className="feature-description">Conference-ready spaces with whiteboards and presentation support.</p>
            </div>
            <button className="btn-feature">View Meeting Rooms</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
