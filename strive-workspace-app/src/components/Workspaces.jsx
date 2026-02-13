const Workspaces = () => {
  return (
    <section className="workspaces-section">
      <div className="workspaces-header">
        <h2 className="section-title">Built for Professionals Who Take Work Seriously</h2>
        <p className="section-description">
          Whether you're building a startup, meeting clients, or need professional office space in Marlton away from home — our flexible coworking space in South Jersey was created to support your momentum and growth.
        </p>
      </div>

      <div className="professionals-grid">
        <div className="professional-card">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0a08a15401856f742f44ebd49f45f64201d91208?width=798"
            alt="Entrepreneurs and Startups"
            className="professional-image"
          />
          <div className="professional-info">
            <h3 className="professional-title">Startups & Entrepreneurs in South Jersey</h3>
            <p className="professional-description">
              Launch and grow in a credible environment. Flexible offices help you scale with your team.
            </p>
          </div>
        </div>

        <div className="professional-card">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/089d1325cc2aaa83858cf24eba3d6e5c851b3d6d?width=700"
            alt="Remote Professionals"
            className="professional-image"
          />
          <div className="professional-info">
            <h3 className="professional-title">Remote Workers & Freelancers</h3>
            <p className="professional-description">
              Escape home distractions. Enjoy reliable internet, focused spaces, and meeting rooms when you need them.
            </p>
          </div>
        </div>

        <div className="professional-card">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/090648f9a1ce986a270896ac4f988f3196dc0460?width=594"
            alt="Agencies and Consultants"
            className="professional-image"
          />
          <div className="professional-info">
            <h3 className="professional-title">Marketing Agencies & Consultants</h3>
            <p className="professional-description">
              Impress clients with on-demand sessions, make every interaction-room professional & memorable.
            </p>
          </div>
        </div>

        <div className="professional-card">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/6cb69d8089f50ce1aa8a4b7a2f8508d47e44e0d4?width=835"
            alt="Growing Teams"
            className="professional-image"
          />
          <div className="professional-info">
            <h3 className="professional-title">Growing Teams & Small Businesses</h3>
            <p className="professional-description">
              Build your team in a productive, distraction-free environment without long-term lease commitments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workspaces;
