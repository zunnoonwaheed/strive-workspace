import { useState } from 'react';
import { STRIVE_LINKS } from '../links';

const Hero = ({ onOpenChat }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChatClick = () => {
    // Trigger pop animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Play pop sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Fallback: silent if audio fails
    }

    // Open chat interface
    if (onOpenChat) {
      onOpenChat();
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img
          src="/hero-bg.png"
          alt="Hero background"
          className="hero-bg-image"
        />
        <img
          src="/hero-mobile.png"
          alt="Mobile hero"
          className="hero-mobile-image"
        />
      </div>

      <div className="hero-content">
        <h1 className="logo">Strive</h1>

        <div className="hero-main-content">
          <div className="hero-text-block">
            <h2 className="hero-title">Premium Private Offices & Coworking Space in Marlton, NJ</h2>
            <p className="hero-description">
              Professional coworking and office space in Marlton, South Jersey — built for client meetings, flexible growth, and focused work. High-speed internet, meeting rooms, and workspace you'll feel proud to call your own.
            </p>
          </div>

          <div className="hero-actions">
            <a className="btn-primary" href={STRIVE_LINKS.scheduleTour} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>Schedule a Tour</a>
            <button 
              className={`btn-secondary ${isAnimating ? 'chat-pop-animation' : ''}`}
              onClick={handleChatClick}
            >
              Chat With Us Now
            </button>
          </div>
        </div>

        <a 
          href={STRIVE_LINKS.marlton}
          target="_blank"
          rel="noopener noreferrer"
          className="location-card"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <img
            src="/marlton-location.webp"
            alt="Marlton, New Jersey location"
            className="location-image"
          />
          <div className="location-info">
            <p className="location-district">Marlton, NJ</p>
            <h3 className="location-title">New Location Active</h3>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
