import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
];

const ChooseExpert = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);

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

  return (
    <section className="choose-expert" id="projects">
      <h2 className="choose-expert__title">
        Our empanelled <span className="highlight">Architects</span>
      </h2>
      <p className="choose-expert__subtitle">
        Our engineers are here to design, secure, and support—every step of the
        way.
      </p>

      <div className="choose-expert__cards">
        {engineers.map((engineer) => (
          <div
            key={engineer.id}
            className="expert-card"
            onClick={() => handleCardClick(engineer)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(engineer.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={engineer.image}
              alt={engineer.name}
              className="expert-card__image"
            />
            {hovered === engineer.id && (
              <div
                className="expert-card__hover-overlay"
                style={{ left: position.x, top: position.y }}
              >
                <span>View</span>
              </div>
            )}
            <div className="expert-card__info">
              <div className="expert-card__meta"></div>
              <h3 className="expert-card__name">{engineer.name}</h3>
              <p className="expert-card__role">{engineer.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseExpert;
