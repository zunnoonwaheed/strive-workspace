import { useState } from 'react';

const SPACE_TYPES = [
  'Private Office',
  'Hot Desks/Coworking',
  'Dedicated Desk',
  'Meeting Room',
  'Virtual Office',
];

const SEAT_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'];

const LOCATIONS = [
  'Select a Location',
  'Marlton',
  'Philadelphia',
  'New York',
  'Other',
];

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [spaceType, setSpaceType] = useState('Private Office');
  const [numberOfSeats, setNumberOfSeats] = useState('1');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app you would send to an API or email service here
  };

  return (
    <section className="contact-section" style={{
      background: '#FFFFFF',
      backgroundColor: '#FFFFFF'
    }}>
      <div className="contact-content" style={{
      background: '#FFFFFF',
      backgroundColor: '#FFFFFF'
    }}>
        <div className="contact-info">
          <h2 className="section-title">Ready to Tour Your New Workspace?</h2>
          <p className="section-description">
            Fill out the form and our team will get right back to you within 24 hours. Or reach us directly using
            the contact information below.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#21215B"/>
                  <path d="M21.2215 23.0453C21.3592 23.1085 21.5143 23.1229 21.6613 23.0862C21.8083 23.0495 21.9384 22.9638 22.0302 22.8433L22.2668 22.5333C22.391 22.3677 22.5521 22.2333 22.7372 22.1407C22.9224 22.0481 23.1265 21.9999 23.3335 21.9999H25.3335C25.6871 21.9999 26.0263 22.1404 26.2763 22.3904C26.5264 22.6405 26.6668 22.9796 26.6668 23.3333V25.3333C26.6668 25.6869 26.5264 26.026 26.2763 26.2761C26.0263 26.5261 25.6871 26.6666 25.3335 26.6666C22.1509 26.6666 19.0987 25.4023 16.8482 23.1519C14.5978 20.9014 13.3335 17.8492 13.3335 14.6666C13.3335 14.313 13.474 13.9738 13.724 13.7238C13.9741 13.4737 14.3132 13.3333 14.6668 13.3333H16.6668C17.0205 13.3333 17.3596 13.4737 17.6096 13.7238C17.8597 13.9738 18.0002 14.313 18.0002 14.6666V16.6666C18.0002 16.8736 17.952 17.0777 17.8594 17.2629C17.7668 17.448 17.6324 17.6091 17.4668 17.7333L17.1548 17.9673C17.0324 18.0607 16.9462 18.1936 16.9107 18.3435C16.8752 18.4933 16.8927 18.6508 16.9602 18.7893C17.8713 20.6398 19.3698 22.1364 21.2215 23.0453Z" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="contact-detail">(214)-851-1233</p>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#21215B"/>
                  <path d="M26.6668 16.6667L20.6728 20.4847C20.4694 20.6029 20.2384 20.6651 20.0032 20.6651C19.7679 20.6651 19.5369 20.6029 19.3335 20.4847L13.3335 16.6667M14.6668 14.6667H25.3335C26.0699 14.6667 26.6668 15.2637 26.6668 16.0001V24.0001C26.6668 24.7365 26.0699 25.3334 25.3335 25.3334H14.6668C13.9304 25.3334 13.3335 24.7365 13.3335 24.0001V16.0001C13.3335 15.2637 13.9304 14.6667 14.6668 14.6667Z" stroke="#F8FAFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="contact-detail">info@striveworkspaces.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper" style={{
          background: 'transparent',
          backgroundColor: 'transparent'
        }}>
          <div className="form-background" style={{
            background: 'url(/subtract-3.png) no-repeat center',
            backgroundSize: '100% 100%',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0
          }}></div>
          <form className="contact-form" style={{
            background: 'transparent',
            backgroundColor: 'transparent'
          }} onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success">
                <p>Thanks! We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-fullName">Full Name</label>
                  <input
                    id="contact-fullName"
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Jane Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="jane@work.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-spaceType">Space Type</label>
                  <select
                    id="contact-spaceType"
                    name="spaceType"
                    className="form-select form-select-native"
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value)}
                  >
                    {SPACE_TYPES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-seats">Number Of Seats</label>
                  <select
                    id="contact-seats"
                    name="numberOfSeats"
                    className="form-select form-select-native"
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(e.target.value)}
                  >
                    {SEAT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-location">Location</label>
                  <select
                    id="contact-location"
                    name="location"
                    className="form-select form-select-native"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {LOCATIONS.map((opt) => (
                      <option key={opt} value={opt === 'Select a Location' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn-submit">Submit</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/721158e6ac8c140a4be7a81e5109be95ddb65447?width=2600"
        alt="Office workspace"
        className="contact-section-image"
      />
    </section>
  );
};

export default Contact;
