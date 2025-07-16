import React, { useState } from "react";
import phoneIcon from "../../../assets/Phone.svg";
import { useNavigate, Link } from "react-router-dom";

const landing = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setMousePos({ x, y });
  };

  const handleShowAll = () => {
    navigate("/projects");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918075521186"; // Replace with your WhatsApp number
    const message = "Hello, I'm interested in your premium housing projects.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="landing" id="home">
      <div className="landing__content">
        <div
          className="landing__title-wrapper"
          onMouseMove={handleMouseMove}
          style={{
            "--mouse-x": `${mousePos.x}%`,
            "--mouse-y": `${mousePos.y}%`,
          }}
        >
          <h1 className="landing__title">
            <span>Premium</span> Housing
          </h1>
        </div>
        <p className="landing__subtitle">at not so premium pricing</p>
        <div className="landing__buttons">
          <button className="btn btn--primary" onClick={handleWhatsAppClick}>
            <img src={phoneIcon} alt="Phone Icon" className="btn__icon" />
            Enquire now
          </button>
          <Link to="/projects">
            <button className="btn btn--secondary">Explore Projects</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default landing;
