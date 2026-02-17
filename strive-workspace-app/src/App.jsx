import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import ChatButton from './components/ChatButton';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import Workspaces from './components/Workspaces';
import WorkspaceDesigns from './components/WorkspaceDesigns';
import FindSpace from './components/FindSpace';
import Gallery from './components/Gallery';
import PrimeDesk from './components/PrimeDesk';
import Solutions from './components/Solutions';
import WorkspaceTypes from './components/WorkspaceTypes';
import Advantages from './components/Advantages';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Scroll-triggered reveal for headings and text across the site
  useEffect(() => {
    if (isLoading) return;

    const revealOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    const revealSelectors = [
      '.section-title',
      '.section-description',
      '.professional-title',
      '.professional-description',
      '.feature-title',
      '.feature-description',
      '.amenity-title',
      '.amenity-description',
      '.workspace-card-title',
      '.workspace-card-subtitle',
      '.workspace-card-description',
      '.type-name',
      '.type-description',
      '.advantage-name',
      '.advantage-desc',
      '.advantage-description',
      '.space-name',
      '.space-description',
      '.faq-question',
      '.testimonials-section .section-title',
      '.contact-info .section-title',
      '.contact-info .section-description',
      '.prime-desk-text .section-title',
      '.prime-desk-text .section-description',
      '.find-space-form-wrapper .section-title',
      '.find-space-form-wrapper .section-description',
      '.solutions-header .section-title',
      '.solutions-header .section-description',
      '.advantage-header .section-title',
      '.advantage-header .section-description',
      '.faq-intro .section-title',
      '.faq-intro .section-description',
      '.workspaces-header .section-title',
      '.workspaces-header .section-description',
      '.gallery-header .section-title',
      '.gallery-header .section-description'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));
    
    // Immediately mark elements already in viewport as visible, and also mark first elements
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      const isFirstInSection = el.previousElementSibling === null || 
                                el.previousElementSibling.classList.contains('section-title') ||
                                el.previousElementSibling.classList.contains('section-description');
      
      if (isInViewport || isFirstInSection) {
        el.classList.add('reveal-visible');
      } else {
        revealObserver.observe(el);
      }
    });

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Prevent scrolling during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={isLoading ? 'app-content-loading' : 'app-content-loaded'}>
        <Header />
        <ChatButton isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        <div className="page-container">
          <Hero onOpenChat={() => setIsChatOpen(true)} />
          <StatsBar />
          <Workspaces />
          <Features />
          <WorkspaceDesigns />
          <FindSpace />
          <Gallery />
          <PrimeDesk />
          <Solutions />
          <WorkspaceTypes />
          <Advantages />
          <Testimonials />
          <FAQ />
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
