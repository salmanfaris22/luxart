import React, { useState } from "react";
import logo from "../../src/assets/luxartlogo.svg";
import phoneIcon from "../../src/assets/Phone.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, [menuOpen]);

  React.useEffect(() => {
    setMenuOpen(false);
    setIsNavigating(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.state?.scrollTo === "testimonials") {
      setIsNavigating(true);
      setTimeout(() => {
        const testimonialsSection = document.getElementById("testimonials");
        if (testimonialsSection) {
          // Get navbar height for proper offset
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          
          // Calculate scroll position with offset
          const elementTop = testimonialsSection.offsetTop;
          const scrollPosition = elementTop - navbarHeight - 20; // 20px extra padding
          
          window.scrollTo({ 
            top: scrollPosition, 
            behavior: "smooth" 
          });
          
          // Force swiper update after scrolling
          setTimeout(() => {
            const swiperElement = testimonialsSection.querySelector(".swiper");
            if (swiperElement && swiperElement.swiper) {
              swiperElement.swiper.update();
              swiperElement.swiper.slideTo(1, 0, false);
            }
          }, 500);
          window.history.replaceState({}, document.title);
        }
        setIsNavigating(false);
      }, 100);
    } else if (location.state?.scrollTo === "experts") {
      setIsNavigating(true);
      setTimeout(() => {
        const expertsSection = document.querySelector(".choose-expert");
        if (expertsSection) {
          // Get navbar height for proper offset
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          
          // Calculate scroll position with offset
          const elementTop = expertsSection.offsetTop;
          const scrollPosition = elementTop - navbarHeight - 20; // 20px extra padding
          
          window.scrollTo({ 
            top: scrollPosition, 
            behavior: "smooth" 
          });
          window.history.replaceState({}, document.title);
        }
        setIsNavigating(false);
      }, 100);
    } else if (location.state?.scrollTo === "services") {
      setIsNavigating(true);
      setTimeout(() => {
        const servicesSection = document.querySelector("#services");
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }
        setIsNavigating(false);
      }, 100);
    }
  }, [location.state]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918075521186";
    const message = "Hello, I'm interested in your premium housing projects.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollToTestimonials = () => {
    setIsNavigating(true);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "testimonials" } });
    } else {
      setTimeout(() => {
        const testimonialsSection = document.getElementById("testimonials");
        if (testimonialsSection) {
          // Get navbar height for proper offset
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          
          // Calculate scroll position with offset
          const elementTop = testimonialsSection.offsetTop;
          const scrollPosition = elementTop - navbarHeight - 20; // 20px extra padding
          
          window.scrollTo({ 
            top: scrollPosition, 
            behavior: "smooth" 
          });
          
          // Force swiper update after scrolling
          setTimeout(() => {
            const swiperElement = testimonialsSection.querySelector(".swiper");
            if (swiperElement && swiperElement.swiper) {
              swiperElement.swiper.update();
              swiperElement.swiper.slideTo(1, 0, false);
            }
          }, 500);
        }
        setIsNavigating(false);
      }, 100);
    }
    setMenuOpen(false);
  };

  const scrollToExperts = () => {
    setIsNavigating(true);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "experts" } });
    } else {
      setTimeout(() => {
        const expertsSection = document.querySelector(".choose-expert");
        if (expertsSection) {
          // Get navbar height for proper offset
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          
          // Calculate scroll position with offset
          const elementTop = expertsSection.offsetTop;
          const scrollPosition = elementTop - navbarHeight - 20; // 20px extra padding
          
          window.scrollTo({ 
            top: scrollPosition, 
            behavior: "smooth" 
          });
        }
        setIsNavigating(false);
      }, 100);
    }
    setMenuOpen(false);
  };

  const scrollToServices = () => {
    setIsNavigating(true);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "services" } });
    } else {
      setTimeout(() => {
        const servicesSection = document.querySelector("#services");
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
        }
        setIsNavigating(false);
      }, 100);
    }
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    
    // If we're already on the home page, scroll to top
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If we're on a different page, navigate to home
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className={`navbar__logo${menuOpen ? " hide" : ""}`}>
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Luxart Logo" onClick={handleLogoClick} />
        </Link>
      </div>
      <div
        className={`navbar__hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        tabIndex={0}
        role="button"
      >
        <span />
        <span />
        <span />
      </div>
      <ul className={`navbar__links${menuOpen ? " open" : ""}`}>
        <li>
          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={handleLinkClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={handleLinkClick}
          >
            About Us
          </Link>
        </li>
        <li>
          <button
            onClick={scrollToServices}
            className={`navbar__link-button${isNavigating ? " loading" : ""}`}
            disabled={isNavigating}
          >
            {isNavigating ? "Loading..." : "Services"}
          </button>
        </li>
        <li>
          <button
            onClick={scrollToTestimonials}
            className={`navbar__link-button${isNavigating ? " loading" : ""}`}
            disabled={isNavigating}
          >
            {isNavigating ? "Loading..." : "Testimonials"}
          </button>
        </li>
        <li>
          <button
            onClick={scrollToExperts}
            className={`navbar__link-button${isNavigating ? " loading" : ""}`}
            disabled={isNavigating}
          >
            {isNavigating ? "Loading..." : "Projects"}
          </button>
        </li>
      </ul>
      <div className="navbar__cta">
        <button className="enquire-button" onClick={handleWhatsAppClick}>
          <img src={phoneIcon} alt="Phone" className="phone-icon" />
          Enquire now
        </button>
      </div>
    </nav>
  );
};

export default Header;
