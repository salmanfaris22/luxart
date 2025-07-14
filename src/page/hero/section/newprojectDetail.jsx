import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaDownload,
  FaRuler,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import projectData from "./ProjectData";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import locationIcon from "../../../assets/footer1.svg";
import architectIcon from "../../../assets/architect.svg";
import areaIcon from "../../../assets/area.svg";
import UserIcon from "../../../assets/user.png";

export default function NewProjectDetail() {
  const { projectId } = useParams();
  // Filter only imthiyas projects
  const project = projectData.find((p) => p.id === projectId);

  // Dynamically filter projects by the current project's projectBy
  const filteredProjects = projectData.filter(
    (p) => p.projectBy === project?.projectBy
  );

  const currentIndex = filteredProjects.findIndex((p) => p.id === projectId);
  const previousIndex =
    currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
  const nextIndex =
    currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
  const previousProject = filteredProjects[previousIndex];
  const nextProject = filteredProjects[nextIndex];
   console.log("imthiyasProjects", filteredProjects);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!project) {
    return <div>Project not found</div>;
  }

  // Use images array if available, otherwise use the main image
  const allImages = project.images || [project.image];

  const handleDownloadPDF = () => {
    // Handle PDF download
    if (project.pdfLink) {
      window.open(project.pdfLink, "_blank");
    }
  };

  // Function to trim long project names
  const trimTitle = (title, maxLength = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const handlePreviousProject = () => {
    window.location.href = `/projects/${previousProject.id}`;
  };

  const handleNextProject = () => {
    window.location.href = `/projects/${nextProject.id}`;
  };

  

  return (
    <section className="new-project-detail">
      <div className="new-project-detail__container">
        {/* Header Section */}
        <div className="new-project-detail__header">
          <div className="new-project-detail__title-section">
            <h1 className="new-project-detail__title">{project.title}</h1>
            <div className="new-project-detail__metadata">
              <div className="metadata-item">
                <img
                  src={locationIcon}
                  alt="location"
                  className="location-icon"
                />
                <span>{project.location}</span>
              </div>
              <div className="metadata-item">
                <img src={areaIcon} alt="Area" className="metadata-icon" />
                <span>{project.area}</span>
              </div>
              {project?.client && (
                <div className="metadata-item">
                  <img src={UserIcon} alt="Client" className="metadata-icon" />
                  <span>{project?.client}</span>
                </div>
              )}
            </div>
          </div>

          {project.pdfLink && (
            <button
              className="new-project-detail__download-btn"
              onClick={handleDownloadPDF}
            >
              <FaDownload className="download-icon" />
              Download PDF
            </button>
          )}
        </div>

        {/* Hero Image Section */}
        <div className="new-project-detail__hero-image">
          <img
            src={project.images[0]}
            alt={project.title}
            className="hero-image"
          />
        </div>

        {/* Description Section */}
        <div className="new-project-detail__description">
          <div className="description-content">
            <div className="description-text">
              <p>{project.description}</p>
            </div>

            <div className="new-project-detail__credits">
              {project?.client && (
                <div className="credits-column">
                  <span className="credits-label">Client Name</span>
                  <span className="credits-value">{project?.client}</span>
                </div>
              )}
              {project?.architect && (
                <div className="credits-column">
                  <span className="credits-label">Architect</span>
                  <span className="credits-value">{project?.architect}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swiper Carousel Section */}
        <div className="new-project-detail__swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="project-swiper"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-slide-content">
                  <img
                    src={image}
                    alt={`${project.title} - View ${index + 1}`}
                    className="swiper-image"
                  />

                  {/* Project Details Overlay */}
                  <div className="new-project-detail__project-details">
                    {project?.projectType && (
                      <div className="project-details__left">
                        <div className="detail-item">
                          <span className="detail-label">PROJECT TYPE</span>
                          <span className="detail-value">
                            {project.projectType}
                          </span>
                        </div>
                      </div>
                    )}
                    {project?.contractor && (
                      <div className="project-details__center">
                        <div className="detail-item">
                          <span className="detail-label">CLIENT</span>
                          <span className="detail-value">
                            {project.contractor}
                          </span>
                        </div>
                      </div>
                    )}
                    {project?.consultant && (
                      <div className="project-details__right">
                        <div className="detail-item">
                          <span className="detail-label">
                            PROJECT CONSULTANT
                          </span>
                          <span className="detail-value">
                            {project.consultant}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom">
            <FaChevronLeft />
          </button>
          <button className="swiper-button-next-custom">
            <FaChevronRight />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="new-project-detail__navigation">
          <button
            className="nav-button nav-button--prev"
            onClick={handlePreviousProject}
          >
            <FaChevronLeft className="nav-icon" />
            <div className="nav-text">
              <span className="nav-label">Previous Project</span>
              <span className="nav-title">
                {trimTitle(previousProject.title)}
              </span>
            </div>
          </button>

          <button
            className="nav-button nav-button--next"
            onClick={handleNextProject}
          >
            <div className="nav-text">
              <span className="nav-label">Next Project</span>
              <span className="nav-title">{trimTitle(nextProject.title)}</span>
            </div>
            <FaChevronRight className="nav-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
