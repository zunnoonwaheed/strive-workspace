import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Minimum display time for preloader (2 seconds)
    const minDisplayTime = 2000;
    const startTime = Date.now();

    // Ensure preloader shows for minimum time, then fade out
    const timer = setTimeout(() => {
      setIsAnimating(false);
      
      // Wait for fade out animation to complete
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }, 600); // Match fadeOut animation duration
    }, Math.max(minDisplayTime - (Date.now() - startTime), 0));

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${isAnimating ? 'preloader-visible' : 'preloader-fade-out'}`}>
      <div className="preloader-content">
        <div className="preloader-logo-container">
          <div className="preloader-logo">
            <h1 className="preloader-logo-text">Strive</h1>
          </div>
          <div className="preloader-spinner-wrapper">
            <div className="spinner-outer-ring">
              <div className="spinner-inner-ring">
                <div className="spinner-core"></div>
              </div>
            </div>
            <div className="spinner-orbits">
              <div className="orbit orbit-1">
                <div className="orbit-dot"></div>
              </div>
              <div className="orbit orbit-2">
                <div className="orbit-dot"></div>
              </div>
              <div className="orbit orbit-3">
                <div className="orbit-dot"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="preloader-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
        <p className="preloader-text">Preparing your workspace...</p>
      </div>
    </div>
  );
};

export default Preloader;
