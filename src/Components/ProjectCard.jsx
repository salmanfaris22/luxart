import React from "react";
import PropTypes from "prop-types";

const ProjectCard = ({ image, title, className }) => {
  return (
    <div className={`projects__card ${className}`}>
      <div
        className="projects__image-container"
        style={{ position: "relative" }}
      >
        <img src={image} alt={title} className="projects__image" />
      </div>
      {title && <div className="projects__name">{title}</div>}
    </div>
  );
};

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default ProjectCard;
