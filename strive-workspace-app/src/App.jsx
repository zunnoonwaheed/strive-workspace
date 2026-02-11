import { useEffect } from 'react';
import Header from './components/Header';
import ChatButton from './components/ChatButton';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import Workspaces from './components/Workspaces';
import WorkspaceDesigns from './components/WorkspaceDesigns';
import FindSpace from './components/FindSpace';
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
  useEffect(() => {
    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.workspaces-section, .features-section, .workspace-designs-section, .find-space-section, .prime-desk-section, .solutions-section, .workspace-types-section, .advantage-section, .testimonials-section, .faq-section, .contact-section');
    
    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Header />
      <ChatButton />
      <div className="page-container">
        <Hero />
        <StatsBar />
        <Workspaces />
        <Features />
        <WorkspaceDesigns />
        <FindSpace />
        <PrimeDesk />
        <Solutions />
        <WorkspaceTypes />
        <Advantages />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
