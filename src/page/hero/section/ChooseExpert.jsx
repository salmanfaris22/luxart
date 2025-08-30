import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import architect2 from "../../../assets/architect2.jpg";
import architect5 from "../../../assets/architect5.webp";

const engineers = [
  {
    id: 1,
    name: "Shabeer A.M., Saleel Kumar R.",
    title: "Founders of Shabeer Saleel Associates",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-engineer/lux-engineer1.jpg",
    projectBy: "shabeer",
    hasProjects: false,
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
    image: architect2,
    projectBy: "rashiq",
    hasProjects: false,
  },
  {
    id: 6,
    name: "Abdulla Vasif",
    title: "CEO of Concetto Design Co",
    image: architect5,
    projectBy: "abdulla",
    hasProjects: false,
  },
];

const ChooseExpert = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);
  const cardsContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const handleCardClick = (engineer) => {
    window.scrollTo(0, 0); // Changed to immediate scroll without smooth behavior
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

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && cardsContainerRef.current) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (cardsContainerRef.current) {
          const container = cardsContainerRef.current;
          const scrollAmount = 280; // Scroll by one card width + gap
          
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            // If we've reached the end (with small tolerance), scroll back to the beginning
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll to the right
            container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
          }
        }
      }, 4000); // Auto-scroll every 4 seconds for better user experience
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Navigation functions
  const handlePrevClick = () => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current;
      const scrollAmount = 280;
      container.scrollTo({ left: container.scrollLeft - scrollAmount, behavior: 'smooth' });
    }
    // Pause auto-scroll when manually navigating
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000); // Resume after 5 seconds
  };

  const handleNextClick = () => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current;
      const scrollAmount = 280;
      container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
    }
    // Pause auto-scroll when manually navigating
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000); // Resume after 5 seconds
  };

  // Pause auto-scroll on hover
  const handleContainerMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleContainerMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  return (
    <section className="choose-expert" id="projects">
      <h2 className="choose-expert__title">
        Our empanelled <span className="highlight">Architects</span>
      </h2>
      <p className="choose-expert__subtitle">
        Our engineers are here to design, secure, and support—every step of the
        way.
      </p>

      <div className="choose-expert__container">
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
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
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
              {engineer.hasProjects && (
                <button
                  className="expert-card__projects-badge"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(engineer);
                  }}
                >
                  <span className="badge-text">View Projects</span>
                  <MdArrowForward className="badge-icon" />
                </button>
              )}
              {hovered === engineer.id && (
                <div
                  className="expert-card__hover-overlay"
                  style={{ left: position.x, top: position.y }}
                >
                  <span>View</span>
                </div>
              )}
            </div>
            <div className="expert-card__info">
              <div className="expert-card__meta"></div>
              <h3 className="expert-card__name">{engineer.name}</h3>
              <p className="expert-card__role">{engineer.title}</p>
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
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ChooseExpert;
