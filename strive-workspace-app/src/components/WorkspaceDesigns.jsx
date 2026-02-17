import { useEffect, useRef } from 'react';
import { STRIVE_LINKS } from '../links';

const WorkspaceDesigns = () => {
  const carouselRef = useRef(null);
  const isArrowClickRef = useRef(false);
  const pauseAutoScrollRef = useRef(null);

  const workspaces = [
    {
      id: 1,
      name: 'Private Office',
      price: '$450',
      period: 'mo',
      description: 'Secure, lockable offices for privacy and team collaboration.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a08a15401856f742f44ebd49f45f64201d91208?width=798',
    },
    {
      id: 2,
      name: 'Dedicated Desk',
      price: '$300',
      period: 'mo',
      description: 'Reserve your own desk in a shared area for a consistent workspace.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/089d1325cc2aaa83858cf24eba3d6e5c851b3d6d?width=700',
    },
    {
      id: 3,
      name: 'Meeting Rooms',
      price: '$30',
      period: 'hr',
      description: 'Professional spaces with AV equipment, bookable by the hour or day.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/090648f9a1ce986a270896ac4f988f3196dc0460?width=594',
    },
    {
      id: 4,
      name: 'Event Spaces',
      price: '$160',
      period: 'hr',
      description: 'Versatile venues for workshops, seminars, and networking events.',
      image: '/workspace-event-spaces.webp',
    },
    {
      id: 5,
      name: 'Hot Desk/Coworking',
      price: '$99',
      period: 'hr',
      description: 'Flexible seating in our communal area, ideal for freelancers and remote workers.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/089d1325cc2aaa83858cf24eba3d6e5c851b3d6d?width=700',
    },
    {
      id: 6,
      name: 'Virtual Offices',
      price: '$65',
      period: 'mo',
      description: 'Professional business address with mail handling services for remote teams.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a08a15401856f742f44ebd49f45f64201d91208?width=798',
    },
  ];

  // Duplicate workspaces for seamless infinite scroll
  const duplicatedWorkspaces = [...workspaces, ...workspaces];

  const scrollToNext = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector('.workspace-type-card-carousel');
    if (!firstCard) return;
    const computedStyle = window.getComputedStyle(carousel);
    const gap = parseFloat(computedStyle.gap) || 24;
    const cardWidth = firstCard.offsetWidth + gap;
    const currentScroll = carousel.scrollLeft;
    const targetScroll = currentScroll + cardWidth;
    
    // Mark as arrow click and pause auto-scroll
    isArrowClickRef.current = true;
    if (pauseAutoScrollRef.current) {
      pauseAutoScrollRef.current(true);
    }
    
    carousel.scrollTo({ left: targetScroll, behavior: 'smooth' });
    
    // Reset flag and resume auto-scroll after scroll completes
    setTimeout(() => {
      isArrowClickRef.current = false;
      if (pauseAutoScrollRef.current) {
        pauseAutoScrollRef.current(false);
      }
    }, 800);
  };

  const scrollToPrev = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector('.workspace-type-card-carousel');
    if (!firstCard) return;
    const computedStyle = window.getComputedStyle(carousel);
    const gap = parseFloat(computedStyle.gap) || 24;
    const cardWidth = firstCard.offsetWidth + gap;
    const currentScroll = carousel.scrollLeft;
    const targetScroll = currentScroll - cardWidth;
    
    // Mark as arrow click and pause auto-scroll
    isArrowClickRef.current = true;
    if (pauseAutoScrollRef.current) {
      pauseAutoScrollRef.current(true);
    }
    
    carousel.scrollTo({ left: targetScroll, behavior: 'smooth' });
    
    // Reset flag and resume auto-scroll after scroll completes
    setTimeout(() => {
      isArrowClickRef.current = false;
      if (pauseAutoScrollRef.current) {
        pauseAutoScrollRef.current(false);
      }
    }, 800);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 4; // pixels per frame (increased for faster, smoother scrolling)
    let isPaused = false;
    let animationFrameId = null;
    let userScrollTimeout = null;
    let lastScrollLeft = 0;
    let isUserScrolling = false;

    // Expose pause function to arrow handlers
    pauseAutoScrollRef.current = (pause) => {
      isPaused = pause;
      if (!pause) {
        scrollPosition = carousel.scrollLeft;
      }
    };

    const getCardWidth = () => {
      const firstCard = carousel.querySelector('.workspace-type-card-carousel');
      if (!firstCard) return 400;
      // Get computed gap from CSS (default 24px desktop, 16px mobile)
      const computedStyle = window.getComputedStyle(carousel);
      const gap = parseFloat(computedStyle.gap) || 24;
      return firstCard.offsetWidth + gap; // card width + gap
    };

    const autoScroll = () => {
      if (isPaused || isUserScrolling) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }

      const cardWidth = getCardWidth();
      const totalWidth = cardWidth * workspaces.length;
      
      // Sync scrollPosition with actual scroll position
      scrollPosition = carousel.scrollLeft;
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled through one set of workspaces
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft = scrollPosition;
      }
      
      lastScrollLeft = carousel.scrollLeft;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Pause on hover (desktop)
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    // Pause on touch/interaction (mobile)
    const handleTouchStart = () => {
      isPaused = true;
      isUserScrolling = true;
    };

    const handleTouchEnd = () => {
      // Resume after user stops touching
      setTimeout(() => {
        isPaused = false;
        isUserScrolling = false;
        scrollPosition = carousel.scrollLeft; // Sync position
      }, 1500);
    };

    const handleScroll = () => {
      // Ignore scroll events triggered by arrow clicks
      if (isArrowClickRef.current) {
        lastScrollLeft = carousel.scrollLeft;
        return;
      }
      
      // Detect if user is manually scrolling
      const currentScrollLeft = carousel.scrollLeft;
      const scrollDifference = Math.abs(currentScrollLeft - lastScrollLeft);
      
      // If scroll difference is significant, user is scrolling manually
      if (scrollDifference > 5) {
        isUserScrolling = true;
        isPaused = true;
        scrollPosition = currentScrollLeft; // Sync with user's scroll position
        
        // Clear existing timeout
        if (userScrollTimeout) {
          clearTimeout(userScrollTimeout);
        }
        
        // Resume auto-scroll after user stops scrolling
        userScrollTimeout = setTimeout(() => {
          isUserScrolling = false;
          isPaused = false;
          scrollPosition = carousel.scrollLeft; // Sync position
        }, 2000);
      }
      
      lastScrollLeft = currentScrollLeft;
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
    carousel.addEventListener('scroll', handleScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (userScrollTimeout) {
        clearTimeout(userScrollTimeout);
      }
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchend', handleTouchEnd);
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [workspaces.length]);

  return (
    <section className="workspace-designs-section">
      <div className="workspace-designs-header">
        <h2 className="section-title">Workspaces Designed for High-Performance Days</h2>
      </div>

      <div className="workspace-types-carousel-wrapper">
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={scrollToPrev}
          aria-label="Previous workspace"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div 
          ref={carouselRef}
          className="workspace-types-carousel"
        >
          {duplicatedWorkspaces.map((workspace, index) => (
            <div key={`${workspace.id}-${index}`} className="workspace-type-card-carousel">
              <div className="workspace-card-image-wrapper">
                <img 
                  src={workspace.image} 
                  alt={workspace.name}
                  className="workspace-card-image"
                />
                <div className="workspace-price-overlay">
                  <span className="workspace-price-label">From</span>
                  <span className="workspace-price-amount">{workspace.price}</span>
                  <span className="workspace-price-period">/{workspace.period}</span>
                </div>
                <div className="workspace-card-overlay">
                  <h3 className="workspace-card-name">{workspace.name}</h3>
                  <p className="workspace-card-description">{workspace.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={scrollToNext}
          
          aria-label="Next workspace"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default WorkspaceDesigns;
