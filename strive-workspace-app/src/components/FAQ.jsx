import { useState } from 'react';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "What makes Strive the best coworking space in Marlton, NJ?",
      answer: "Strive Workspaces is South Jersey's premier coworking and office space in Marlton, designed for professionals who need flexibility without sacrificing quality. Located on Route 73 in Burlington County, our Marlton workspace offers private offices, dedicated desks, meeting room rentals, and hot desking — all with month-to-month flexibility. Unlike traditional office leases in South Jersey, we provide turnkey workspace solutions with high-speed fiber internet, 24/7 access, on-site fitness center, and professional amenities from day one. Our location puts you minutes from Cherry Hill, Mount Laurel, and the NJ Turnpike, making it the ideal workspace for professionals who want to avoid the Philadelphia commute."
    },
    {
      id: 2,
      question: "How much does coworking space cost in Marlton, NJ?",
      answer: "Strive Workspaces offers flexible pricing to match your needs: Hot Desk (Day Pass): Starting at $25/day for flexible shared workspace access. Dedicated Desk: Starting at $350/month for your reserved workspace with 24/7 access. Private Office: Starting at $800/month for fully-furnished executive suites. Meeting Room Rental: Starting at $45/hour for professional conference spaces. All memberships include high-speed fiber internet, access to our community kitchen, printing services, and networking events. Unlike other coworking spaces in South Jersey, we offer month-to-month leasing with no long-term commitment — making it affordable to scale as your business grows."
    },
    {
      id: 3,
      question: "Can I rent office space in Marlton without a long-term lease?",
      answer: "Yes! Strive Workspaces specializes in flexible, month-to-month office space rentals in Marlton. Unlike traditional commercial real estate which requires 3-5 year leases, our private offices and coworking memberships have no long-term commitment. This makes Strive ideal for: Startups testing the South Jersey market before committing to a lease, Remote workers who need professional workspace a few days per week, Growing teams that need to scale up or down quickly, Consultants who want a prestigious Marlton business address without overhead. You can upgrade from a dedicated desk to a private office, or downgrade if needed — all with 30 days' notice. Our Burlington County location offers the flexibility modern businesses need."
    },
    {
      id: 4,
      question: "Can I use Strive Workspaces for client meetings and presentations?",
      answer: "Absolutely! Strive Workspaces Marlton is designed for professionals who meet clients regularly. Our facility offers: Professional Meeting Rooms: Conference rooms seating 4-50 people, 4K video conferencing equipment, Smart boards and presentation displays, Professional sound system and lighting, Whiteboard walls and flip charts, High-speed internet for virtual attendees. Hourly and Day Rentals: Meeting rooms start at $45/hour and can be reserved by the hour, half-day, or full day — perfect for client presentations, team workshops, depositions, training sessions, or board meetings. Impressive First Impression: Strive's location on Route 73 in Marlton provides a prestigious South Jersey business address that's easy for clients to find (major highway frontage), has ample free parking on-site, professional reception area, and is walking distance to lunch options at Marlton Town Center. Many consultants, attorneys, therapists, financial advisors, and agency owners choose Strive specifically for the ability to host professional client meetings without the cost of a traditional office lease in Burlington County."
    },
    {
      id: 5,
      question: "Where exactly is Strive Workspaces located in Marlton?",
      answer: "Strive Workspaces is located in the Evesham District at the intersection of Route 73 and Route 70 in Marlton, New Jersey — the heart of Burlington County's business corridor. Easy access from: Route 73 North/South: Direct frontage on Route 73, Route 70 East/West: 2 minutes from intersection, NJ Turnpike: 5 minutes from Exit 4, Cherry Hill: 8-minute drive via Route 70, Mount Laurel: 10-minute drive via Route 73, Moorestown: 12 minutes via Route 73 South, Philadelphia: 25 minutes without traffic. Nearby landmarks: Marlton Town Center (walking distance), Wegmans Plaza, Evesham Township Municipal Complex, Multiple dining and retail options on Route 73. Ample free parking is available on-site, making it convenient for client meetings and daily commutes across South Jersey."
    },
    {
      id: 6,
      question: "What's included in a coworking membership at Strive Marlton?",
      answer: "Every coworking membership at Strive Workspaces Marlton includes: Workspace Essentials: High-speed gigabit fiber internet (WiFi + ethernet), Ergonomic desk and chair setup, 24/7 building access with keycard entry, Printing, scanning, and copying services. Professional Amenities: Complimentary coffee bar and beverages, Full-service community kitchen (refrigerator, microwave), Professional mailing address at your Marlton business location, Mail and package handling services. Meeting & Collaboration: Meeting room credits (varies by membership tier), Access to conference rooms and phone booths, High-speed internet for video conferencing, Whiteboard and presentation equipment. Wellness & Community: On-site fitness center access, Monthly networking events with South Jersey professionals, Outdoor workspace and terrace seating, Private wellness and lactation rooms. Unlike crowded coffee shops or isolating home offices, Strive gives South Jersey professionals everything needed to work productively — without the overhead of a traditional office lease."
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
