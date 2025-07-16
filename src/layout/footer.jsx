import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import phone from "../assets/Phone.svg";
import logo from "../assets/luxartlogo.svg";
import phoneIcon from "../assets/footer2.svg";
import mailIcon from "../assets/footer3.svg";
import mapIcon from "../assets/footer1.svg";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const windowHeight = window.innerHeight;
      const sectionHeight = servicesSection.offsetHeight;
      const offset = (windowHeight - sectionHeight) / 2;
      const sectionTop = servicesSection.offsetTop;

      window.scrollTo({
        top: Math.max(0, sectionTop - offset),
        behavior: "smooth",
      });
    }
  };

  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById("testimonials");
    if (testimonialsSection) {
      const windowHeight = window.innerHeight;
      const sectionHeight = testimonialsSection.offsetHeight;
      const offset = (windowHeight - sectionHeight) / 2;
      const sectionTop = testimonialsSection.offsetTop;

      window.scrollTo({
        top: Math.max(0, sectionTop - offset),
        behavior: "smooth",
      });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const windowHeight = window.innerHeight;
      const sectionHeight = projectsSection.offsetHeight;
      const offset = (windowHeight - sectionHeight) / 2;
      const sectionTop = projectsSection.offsetTop;

      window.scrollTo({
        top: Math.max(0, sectionTop - offset),
        behavior: "smooth",
      });
    }
  };

  const handleEnquireClick = () => {
    const phoneNumber = "+918075521186"; // Replace with your actual WhatsApp number
    const message = "Hello, I would like to enquire about your services."; // Customize your message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFooterServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home, just scroll
      scrollToServices();
    } else {
      // Navigate to home and scroll after navigation
      navigate("/", { state: { scrollTo: "services" } });
    }
  };

  const handleFooterTestimonialsClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home, just scroll
      scrollToTestimonials();
    } else {
      // Navigate to home and scroll after navigation
      navigate("/", { state: { scrollTo: "testimonials" } });
    }
  };

  const handleFooterProjectsClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home, just scroll
      scrollToProjects();
    } else {
      // Navigate to home and scroll after navigation
      navigate("/", { state: { scrollTo: "projects" } });
    }
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo === "services") {
      scrollToServices();
    } else if (location.state && location.state.scrollTo === "testimonials") {
      scrollToTestimonials();
    } else if (location.state && location.state.scrollTo === "projects") {
      scrollToProjects();
    }
  }, [location]);

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Contact Section */}
        <div className="footer__section">
          <h4 className="contact__heading">Contact</h4>
          <div className="footer__item">
            <img src={mailIcon} alt="Mail" className="footer__icon" />
            <span>md@luxartbuilders.com</span>
          </div>
          <div className="footer__item">
            <img src={phoneIcon} alt="Phone" className="footer__icon" />
            <span>8075521186</span>
          </div>
          <div className="footer__item">
            <img src={mapIcon} alt="Map" className="footer__icon" />
            <span>
              Luxart Builders Pvt. Ltd
              <br />
              HiLITE Business Park, Phase 2
              <br />
              7th Floor
              <br />
              Calicut, Kerala, India
            </span>
          </div>
        </div>

        {/* Logo and CTA */}
        <div className="footer__center">
          <img src={logo} alt="Luxart Logo" className="footer__logo" />
          <button className="enquire-button" onClick={handleEnquireClick}>
            <img src={phone} alt="Phone" className="phone-icon" />
            Enquire now
          </button>
        </div>
        {/* Quick Links */}
        <div
          className="footer__section footer_moboHide"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ul className="footer__social footer__mobileSection">
              {/* <li>
              <a href="https://www.facebook.com">Facebook</a>
            </li> */}
              <li>
                <a href="https://www.instagram.com/luxart.in" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Luxartbuilders">YouTube</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="links__heading">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <a href="#services" onClick={handleFooterServicesClick}>
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={handleFooterTestimonialsClick}>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#projects" onClick={handleFooterProjectsClick}>
                  Projects
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          © 2025 Luxart All rights reserved | Powered by{" "}
          <a href="https://marketlube.in">Marketlube</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
