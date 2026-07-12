import React, { useState, useEffect } from "react";
import ProjectCard from "../../../Components/ProjectCard";
import { Link, useLocation } from "react-router-dom";
import projectData from "./ProjectData";

const Projects = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname.replace(/\/$/, "") === "/projects";
  const isHomePage = location.pathname === "/";

  const { noProjects, architectName } = location.state || {};

  // List of project IDs to show on the projects page
  const mainProjectIds = [
    "cheekkilode",
    "pattambi-heights",
    "kondotty",
    "pavangad",
    "kalamassery",
    "Proposed Residence",
    "Proposed Residence 2",
  ];

  // Ordered list for homepage display
  const homePageOrder = [
    "pavangad",
    "cheekkilode",
    "pattambi-heights",
    "kondotty",
  ];

  // State for filtered projects
  const [filteredProjects, setFilteredProjects] = useState(projectData);
  const [selectedArchitect, setSelectedArchitect] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Effect to handle filtering based on localStorage and route changes
  useEffect(() => {
    const architectFromStorage = localStorage.getItem("selectedArchitect");

    if (architectFromStorage && isProjectsPage) {
      // Filter projects based on selected architect when on projects page
      const filtered = projectData.filter(
        (project) => project.projectBy === architectFromStorage
      );

      if (filtered.length > 0) {
        setSelectedArchitect(architectFromStorage);
        setFilteredProjects(filtered);
      } else {
        // If no projects found for the architect, show main projects
        setSelectedArchitect(null);
        const mainProjects = projectData.filter((project) =>
          mainProjectIds.includes(project.id)
        );
        setFilteredProjects(mainProjects);
        localStorage.removeItem("selectedArchitect");
      }
    } else if (isProjectsPage) {
      // When on projects page without architect filter, show only main projects
      const mainProjects = projectData.filter((project) =>
        mainProjectIds.includes(project.id)
      );
      setFilteredProjects(mainProjects);
      setSelectedArchitect(null);
    } else {
      // On homepage, show all projects
      setSelectedArchitect(null);
      setFilteredProjects(projectData);
      if (!isProjectsPage) {
        localStorage.removeItem("selectedArchitect");
      }
    }
  }, [location.pathname, isProjectsPage]);

  // Clear filter function
  const clearFilter = () => {
    localStorage.removeItem("selectedArchitect");
    setSelectedArchitect(null);
    // Show only main projects when clearing filter on projects page
    if (isProjectsPage) {
      const mainProjects = projectData.filter((project) =>
        mainProjectIds.includes(project.id)
      );
      setFilteredProjects(mainProjects);
    } else {
      setFilteredProjects(projectData);
    }
  };

  // Get projects in the correct order for display
  const getOrderedProjects = () => {
    if (isHomePage) {
      // For homepage, use the specific order
      return homePageOrder.map((id) =>
        projectData.find((project) => project.id === id)
      );
    }
    return filteredProjects;
  };

  const displayProjects = getOrderedProjects();

  // Helper function to get card class based on index
  const getCardClass = (index) => {
    const patterns = ["azure", "emerald", "crystal-left", "crystal-right"];
    return `projects__card--${patterns[index % 4]}`;
  };

  const getItemClass = (index) => {
    const patterns = ["azure", "emerald", "crystal-left", "crystal-right"];
    return `projects__item--${patterns[index % 4]}`;
  };

  const getRowClass = (index) => {
    return index % 4 < 2 ? "projects__row--top" : "projects__row--bottom";
  };

  // Group projects into rows of 2
  const groupedProjects = [];
  for (let i = 0; i < displayProjects.length; i += 2) {
    groupedProjects.push(displayProjects.slice(i, i + 2));
  }

  

  if (noProjects) {
    return (
      <div className="projects">
        <div className="projects__header">
          <div>
            {/* <h2 className="projects__title">
              <span>{architectName}'s</span> Projects
            </h2> */}
          </div>
        </div>
        <div className="projects__no-content">
          <h3>Projects Coming Soon!</h3>
          <p>New projects from {architectName} will be available shortly.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Projects;
