import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const engineers = [
  {
    id: 1,
    name: "Shabeer A.M., Saleel Kumar R.",
    title: "Founders of Shabeer Saleel Associates",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-engineer/lux-engineer1.jpg",
    projectBy: "shabeer",
    hasProjects: true,
  },
  {
    id: 2,
    name: "Barun Patro, Sekar Dhandapani, Shiju Pareed",
    title: "Amar Architecture and Designs Pvt Ltd",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-engineer/lux-engineer2.jpg",
    projectBy: "shiju",
    hasProjects: true,
  },
  {
    id: 3,
    name: "P C Rasheed",
    title: "Founder of P C Rasheed and Associates, TSSA Luxart Builders",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-engineer/lux-engineer3.jpg",
    projectBy: "rasheed",
    hasProjects: true,
  },
  {
    id: 4,
    name: "Imthiyaz Ahammed",
    title: "Founder of Ingrid Architects",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-engineer/lux-engineer4.jpg",
    projectBy: "imthiyas",
    hasProjects: true,
  },
  {
    id: 5,
    name: "Rashiq Muhamad Ali",
    title: "Founder of RqMA Architecture + Design",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/engineers/architect2.jpg",
    projectBy: "rashiq",
    hasProjects: true,
  },
  {
    id: 6,
    name: "Abdulla Vasif",
    title: "CEO of Concetto Design Co",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/engineers/architect5.webp",
    projectBy: "abdulla",
    hasProjects: true,
  },
];

const ChooseExpert = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);
  const cardsContainerRef = useRef(null);
  const sectionRef = useRef(null); // Reference to the entire section
  const autoScrollIntervalRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false); // Start as false
  const [isInView, setIsInView] = useState(false); // Track if section is in view
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const handleCardClick = (engineer) => {
    window.scrollTo(0, 0);
    localStorage.setItem("selectedArchitect", engineer.projectBy);
    navigate(`/projects`, {
      state: {
        noProjects: !engineer.hasProjects,
        architectName: engineer.name,
      },
    });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Keep track of whether we can scroll to the left/right
  useEffect(() => {
    const updateScrollAvailability = () => {
      const container = cardsContainerRef.current;
      if (!container) {
        setCanScrollRight(false);
        setCanScrollLeft(false);
        return;
      }
      const atStart = container.scrollLeft <= 0;
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
      setCanScrollLeft(!atStart);
      setCanScrollRight(!atEnd);
    };

    // Initial check
    updateScrollAvailability();

    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollAvailability, { passive: true });
    }
    window.addEventListener("resize", updateScrollAvailability);

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollAvailability);
      }
      window.removeEventListener("resize", updateScrollAvailability);
    };
  }, []);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        // Only enable auto-scroll when section is in view and on desktop/tablet
        const isDesktopOrTablet = window.innerWidth > 768;
        if (inView && isDesktopOrTablet) {
          setIsAutoScrolling(true);
        } else {
          setIsAutoScrolling(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-scroll functionality - only when section is in view
  useEffect(() => {
    const isDesktopOrTablet = window.innerWidth > 768;
    
    if (isAutoScrolling && cardsContainerRef.current && isDesktopOrTablet && isInView) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (cardsContainerRef.current) {
          const container = cardsContainerRef.current;
          const scrollAmount = 280;
          
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
          }
        }
      }, 4000);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, isInView]);

  // Navigation functions
  const handlePrevClick = () => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current;
      const scrollAmount = 280;
      container.scrollTo({ left: container.scrollLeft - scrollAmount, behavior: 'smooth' });
    }
    setIsAutoScrolling(false);
    setTimeout(() => {
      if (isInView) setIsAutoScrolling(true);
    }, 5000);
  };

  const handleNextClick = () => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current;
      const scrollAmount = 280;
      container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
    }
    setIsAutoScrolling(false);
    setTimeout(() => {
      if (isInView) setIsAutoScrolling(true);
    }, 5000);
  };

  // Pause auto-scroll on hover (only if section is in view)
  const handleContainerMouseEnter = () => {
    if (isInView) {
      setIsAutoScrolling(false);
    }
  };

  const handleContainerMouseLeave = () => {
    if (isInView) {
      setIsAutoScrolling(true);
    }
  };

  const viewButtonInline = {
    // Remove positioning overrides to let CSS absolute positioning work
    opacity: 1,
    transform: "none",
    animation: "none",
  };

  return (
    <section className="choose-expert" id="projects" ref={sectionRef}>
      <h2 className="choose-expert__title">
        Our empanelled <span className="highlight">Architects</span>
      </h2>
      <p className="choose-expert__subtitle">
        Our engineers are here to design, secure, and support—every step of the
        way.
      </p>

      {/* Desktop/Tablet Layout with Navigation */}
      <div className="choose-expert__container choose-expert__container--desktop">
        <div
          className="swiper-button-prev-custom"
          onClick={handlePrevClick}
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            background: "rgba(244, 211, 0, 0.1)",
            backdropFilter: "blur(10px)",
            color: "#f4d300",
            cursor: canScrollLeft ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            opacity: canScrollLeft ? 1 : 0.3,
            pointerEvents: canScrollLeft ? "auto" : "none",
            filter: canScrollLeft ? "none" : "blur(2px)"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </div>

        <div 
          className="choose-expert__cards"
          ref={cardsContainerRef}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
        >
          {engineers.map((engineer) => (
          <div
            key={engineer.id}
            className="expert-card"
            onClick={() => handleCardClick(engineer)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(engineer.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="expert-card__image-container">
              <img
                src={engineer.image}
                alt={engineer.name}
                className="expert-card__image"
              />
              {/* Hover overlay disabled per request */}
            </div>
            <div className="expert-card__info">
              <div className="expert-card__meta"></div>
              <h3 className="expert-card__name">{engineer.name}</h3>
              <p className="expert-card__role">{engineer.title}</p>
              {engineer.hasProjects && (
                <button
                  className="expert-card__projects-badge"
                  style={viewButtonInline}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(engineer);
                  }}
                >
                  <span className="badge-text">View Projects</span>
                  <GoArrowUpRight className="badge-icon" />
                </button>
              )}
            </div>
          </div>
        ))}
        </div>

        <div
          className="swiper-button-next-custom"
          onClick={handleNextClick}
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            background: "rgba(244, 211, 0, 0.1)",
            backdropFilter: "blur(10px)",
            color: "#f4d300",
            cursor: canScrollRight ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            opacity: canScrollRight ? 1 : 0.3,
            pointerEvents: canScrollRight ? "auto" : "none",
            filter: canScrollRight ? "none" : "blur(2px)"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </div>

      {/* Mobile Layout - One Engineer per Row */}
      <div className="choose-expert__container choose-expert__container--mobile">
        {engineers.map((engineer) => (
          <div
            key={engineer.id}
            className="expert-card expert-card--mobile"
            onClick={() => handleCardClick(engineer)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(engineer.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="expert-card__image-container">
              <img
                src={engineer.image}
                alt={engineer.name}
                className="expert-card__image"
              />
              {/* Hover overlay disabled per request */}
            </div>
            <div className="expert-card__info">
              <div className="expert-card__meta"></div>
              <h3 className="expert-card__name">{engineer.name}</h3>
              <p className="expert-card__role">{engineer.title}</p>
              {engineer.hasProjects && (
                <button
                  className="expert-card__projects-badge"
                  style={viewButtonInline}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(engineer);
                  }}
                >
                  <span className="badge-text">View Projects</span>
                  <GoArrowUpRight className="badge-icon" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseExpert;