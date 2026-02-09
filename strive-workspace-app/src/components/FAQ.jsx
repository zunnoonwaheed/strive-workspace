import { useState } from 'react';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "What defines the Strive Workspaces experience in Marlton, NJ?",
      answer: "Strive Workspaces is more than a traditional office rental; it is a high-performance ecosystem designed for professionals who value focus and executive-level aesthetics. Our Marlton location serves as a central hub for businesses in the Evesham-Dietrich corridor, providing a sophisticated atmosphere that home offices often lack. We provide \"plug-and-play\" solutions, meaning you can walk in on day one and have access to premium furniture, professional cleaning, and a community of like-minded innovators without the typical overhead of commercial real estate."
    },
    {
      id: 2,
      question: "How does flexible leasing benefit modern businesses and growing teams?",
      answer: ""
    },
    {
      id: 3,
      question: "What technical infrastructure is available for high-performance work?",
      answer: ""
    },
    {
      id: 4,
      question: "Can I host formal client meetings and presentations at your facility?",
      answer: ""
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="faq-content">
        <div className="faq-intro">
          <h2 className="section-title">Common Questions About Premier Workspace in Marlton</h2>
          <p className="section-description">
            Everything you need to know about our flexible private offices, high-speed fiber connectivity, and the
            strategic advantages of working in South Jersey's most professional business environment.
          </p>
          <button className="btn-primary">Ask a Question</button>
        </div>

        <div className="faq-list-wrapper">
          <div className="faq-card-background"></div>
          <div className="faq-list">
            {faqs.map(faq => (
              <div key={faq.id} className={`faq-item ${expandedId === faq.id ? 'expanded' : ''}`}>
                <div className="faq-question-header">
                  <h3 className="faq-question">{faq.question}</h3>
                  <button className="faq-toggle" aria-label="Toggle answer" onClick={() => toggleFAQ(faq.id)}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M18.75 9.375C18.75 9.67337 18.6315 9.95952 18.4205 10.1705C18.2095 10.3815 17.9234 10.5 17.625 10.5H10.5V17.625C10.5 17.9234 10.3815 18.2095 10.1705 18.4205C9.95952 18.6315 9.67337 18.75 9.375 18.75C9.07663 18.75 8.79048 18.6315 8.5795 18.4205C8.36853 18.2095 8.25 17.9234 8.25 17.625V10.5H1.125C0.826631 10.5 0.540483 10.3815 0.329505 10.1705C0.118526 9.95952 0 9.67337 0 9.375C0 9.07663 0.118526 8.79048 0.329505 8.5795C0.540483 8.36853 0.826631 8.25 1.125 8.25H8.25V1.125C8.25 0.826631 8.36853 0.540483 8.5795 0.329505C8.79048 0.118526 9.07663 0 9.375 0C9.67337 0 9.95952 0.118526 10.1705 0.329505C10.3815 0.540483 10.5 0.826631 10.5 1.125V8.25H17.625C17.9234 8.25 18.2095 8.36853 18.4205 8.5795C18.6315 8.79048 18.75 9.07663 18.75 9.375Z" fill="#1E293B"/>
                    </svg>
                  </button>
                </div>
                {faq.answer && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
