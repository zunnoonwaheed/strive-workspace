const Advantages = () => {
  const advantages = [
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8.71406 13.9995H5.00406C4.79439 13.9996 4.59005 14.0656 4.41994 14.1882C4.24982 14.3107 4.12253 14.4837 4.05606 14.6825L2.05206 20.6825C2.00182 20.8328 1.98803 20.9929 2.01182 21.1496C2.03561 21.3063 2.0963 21.4551 2.18888 21.5837C2.28147 21.7123 2.40331 21.8171 2.54434 21.8894C2.68538 21.9617 2.84158 21.9994 3.00006 21.9995H21.0001C21.1584 21.9994 21.3145 21.9617 21.4554 21.8894C21.5964 21.8172 21.7181 21.7125 21.8107 21.584C21.9033 21.4555 21.964 21.3069 21.9879 21.1503C22.0118 20.9938 21.9981 20.8338 21.9481 20.6835L19.9481 14.6835C19.8817 14.4843 19.7543 14.311 19.584 14.1883C19.4137 14.0655 19.209 13.9995 18.9991 13.9995H15.2871M18.0001 7.99951C18.0001 11.6125 14.1311 15.4285 12.6071 16.7945C12.4327 16.9277 12.2194 16.9998 12.0001 16.9998C11.7807 16.9998 11.5674 16.9277 11.3931 16.7945C9.87006 15.4285 6.00006 11.6125 6.00006 7.99951C6.00006 6.40821 6.6322 4.88209 7.75742 3.75687C8.88264 2.63165 10.4088 1.99951 12.0001 1.99951C13.5914 1.99951 15.1175 2.63165 16.2427 3.75687C17.3679 4.88209 18.0001 6.40821 18.0001 7.99951ZM14.0001 7.99951C14.0001 9.10408 13.1046 9.99951 12.0001 9.99951C10.8955 9.99951 10.0001 9.10408 10.0001 7.99951C10.0001 6.89494 10.8955 5.99951 12.0001 5.99951C13.1046 5.99951 14.0001 6.89494 14.0001 7.99951Z" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Route 73 Corridor Location",
      description: "Our Marlton office space sits on the Route 73 business corridor with direct access to NJ Turnpike Exit 4, making commutes from Cherry Hill and Mount Laurel under 10 minutes."
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 9.99951C16 11.0604 15.5786 12.0778 14.8284 12.8279C14.0783 13.5781 13.0609 13.9995 12 13.9995C10.9391 13.9995 9.92172 13.5781 9.17157 12.8279C8.42143 12.0778 8 11.0604 8 9.99951M3.103 6.03351H20.897M3.4 5.46651C3.14036 5.8127 3 6.23377 3 6.66651V19.9995C3 20.5299 3.21071 21.0387 3.58579 21.4137C3.96086 21.7888 4.46957 21.9995 5 21.9995H19C19.5304 21.9995 20.0391 21.7888 20.4142 21.4137C20.7893 21.0387 21 20.5299 21 19.9995V6.66651C21 6.23377 20.8596 5.8127 20.6 5.46651L18.6 2.79951C18.4137 2.55112 18.1721 2.34951 17.8944 2.21066C17.6167 2.0718 17.3105 1.99951 17 1.99951H7C6.68951 1.99951 6.38328 2.0718 6.10557 2.21066C5.82786 2.34951 5.58629 2.55112 5.4 2.79951L3.4 5.46651Z" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Marlton Town Center Proximity",
      description: "Walking distance to Marlton's shopping, dining, and services along Route 73, making work-life balance effortless for South Jersey professionals."
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3.99999 13.9997C3.81076 14.0003 3.62522 13.9473 3.46495 13.8467C3.30467 13.746 3.17623 13.602 3.09454 13.4313C3.01286 13.2606 2.98129 13.0703 3.00349 12.8823C3.0257 12.6944 3.10077 12.5166 3.21999 12.3697L13.12 2.16967C13.1943 2.08396 13.2955 2.02603 13.407 2.00541C13.5185 1.98478 13.6337 2.00269 13.7337 2.05618C13.8337 2.10967 13.9126 2.19557 13.9573 2.29978C14.0021 2.40399 14.0101 2.52032 13.98 2.62967L12.06 8.64967C12.0034 8.8012 11.9844 8.96419 12.0046 9.12468C12.0248 9.28517 12.0837 9.43836 12.1761 9.5711C12.2685 9.70385 12.3918 9.81219 12.5353 9.88684C12.6788 9.96148 12.8382 10.0002 13 9.99967H20C20.1892 9.99903 20.3748 10.0521 20.535 10.1527C20.6953 10.2533 20.8238 10.3973 20.9054 10.568C20.9871 10.7387 21.0187 10.9291 20.9965 11.117C20.9743 11.3049 20.8992 11.4827 20.78 11.6297L10.88 21.8297C10.8057 21.9154 10.7045 21.9733 10.593 21.9939C10.4815 22.0146 10.3663 21.9967 10.2663 21.9432C10.1663 21.8897 10.0874 21.8038 10.0427 21.6996C9.99791 21.5954 9.98991 21.479 10.02 21.3697L11.94 15.3497C11.9966 15.1982 12.0156 15.0352 11.9954 14.8747C11.9752 14.7142 11.9163 14.561 11.8239 14.4282C11.7315 14.2955 11.6082 14.1872 11.4647 14.1125C11.3212 14.0379 11.1617 13.9991 11 13.9997H3.99999Z" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Enterprise Fiber Internet",
      description: "Gigabit internet speeds for remote workers, video conferences, and cloud collaboration — critical for modern South Jersey businesses."
    },
    {
      id: 5,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 7H22M22 7V13M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Month-to-Month Flexibility",
      description: "Scale your office space as your team grows with flexible coworking memberships and private offices in Marlton — no long-term lease required."
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 12L11 14L15 9.99996M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0202 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.73474 4.10536 5.48039 4.29289 5.29285C4.48043 5.10532 4.73478 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.4519 2.09896 11.7214 1.99951 12 1.99951C12.2786 1.99951 12.5481 2.09896 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.2652 4.99996 19.5196 5.10532 19.7071 5.29285C19.8946 5.48039 20 5.73474 20 5.99996V13Z" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Professional Meeting Spaces",
      description: "Impress clients with our Marlton meeting rooms and private offices featuring presentation technology — a credible business address in South Jersey."
    },
    {
      id: 6,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 20.9995V18.9995C16 17.9386 15.5786 16.9212 14.8284 16.1711C14.0783 15.4209 13.0609 14.9995 12 14.9995H6C4.93913 14.9995 3.92172 15.4209 3.17157 16.1711C2.42143 16.9212 2 17.9386 2 18.9995V20.9995M16 3.12751C16.8578 3.34988 17.6174 3.85078 18.1597 4.55157C18.702 5.25237 18.9962 6.1134 18.9962 6.99951C18.9962 7.88562 18.702 8.74665 18.1597 9.44745C17.6174 10.1482 16.8578 10.6491 16 10.8715M22 20.9995V18.9995C21.9993 18.1132 21.7044 17.2523 21.1614 16.5518C20.6184 15.8514 19.8581 15.3511 19 15.1295M13 6.99951C13 9.20865 11.2091 10.9995 9 10.9995C6.79086 10.9995 5 9.20865 5 6.99951C5 4.79037 6.79086 2.99951 9 2.99951C11.2091 2.99951 13 4.79037 13 6.99951Z" stroke="#575FB9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "Burlington County Business Community",
      description: "Network with South Jersey entrepreneurs, consultants, and remote professionals in Marlton's most connected coworking space."
    }
  ];

  return (
    <section className="advantage-section">
      <div className="advantage-content">
        <div className="advantage-header">
          <h2 className="section-title">Why Choose Office Space in Marlton, South Jersey</h2>
          <p className="section-description">
            Strive Workspaces provides premium coworking and private office space in Marlton, located in Burlington County's business corridor along Route 73. Our flexible workspace solutions help South Jersey professionals work productively without commuting to Philadelphia.
          </p>
          <button className="btn-primary">Schedule a Tour</button>
        </div>

        <div className="advantage-visual">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0d0eb2d5f1f06242856f46729de1b85332015465?width=2592"
            alt="Strategic location overview"
            className="advantage-hero-image"
          />

          <div className="advantage-grid">
            {advantages.map(advantage => (
              <div key={advantage.id} className="advantage-card">
                <div className="advantage-icon">{advantage.icon}</div>
                <div className="advantage-text">
                  <h3 className="advantage-name">{advantage.name}</h3>
                  <p className="advantage-desc">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
