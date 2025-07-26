import React, { useEffect, useRef } from "react";

const servicesData = [
  {
    title: "3D Design",
    description: "Creating visual representations of your building ideas.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service1.png",
  },
  {
    title: "Modeling",
    description: "Detailed and realistic modeling for visualization.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service2.png",
  },
  {
    title: "Construction",
    description: "Reliable and structured execution of architectural plans.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service3.png",
  },
  {
    title: "Interior Design",
    description: "Elegant and functional interior space planning.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service4.png",
  },
  {
    title: "Planning",
    description: "Strategic development and regulation your project.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service5.png",
  },
  {
    title: "Exterior Design",
    description: "Appealing and weather-resistant outer aesthetics.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service6.png",
  },
  {
    title: "Renovation",
    description: "Upgrading old spaces with modern solutions.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service7.png",
  },
  {
    title: "Landscape Design",
    description: "Organizing outdoor areas creatively.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service8.png",
  },
  {
    title: "Consultation",
    description: "Expert advice for design and execution.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service9.png",
  },
  {
    title: "Budget Planning",
    description: "Estimate and manage costs efficiently.",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-services/lux-service10.png",
  },
];

const Services = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    let animationFrameId;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += 0.5; // Reduced speed for smoother scrolling
        scrollContainer.scrollLeft = scrollAmount;

        // Reset scroll when reached end
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0;
        }

        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div id="services" className="services__wrapper" ref={scrollRef}>
      <div className="services">
        {servicesData.map((service, index) => (
          <div
            className="services__card"
            key={index}
            style={{ backgroundImage: `url(${service.image})` }}
          >
            <div className="services__content">
              <h3 className="services__title">{service.title}</h3>
              <p className="services__desc" style={{ minHeight: "3rem" }}>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
