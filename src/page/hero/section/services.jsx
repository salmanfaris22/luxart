import React, { useEffect, useRef } from "react";

const servicesData = [
  {
    title: "3D Design",
    description: "Creating visual representations of your building ideas.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254112/image1_nsppay.png",
  },
  {
    title: "Modeling",
    description: "Detailed and realistic modeling for visualization.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254111/image2_drbwz5.png",
  },
  {
    title: "Construction",
    description: "Reliable and structured execution of architectural plans.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254112/image3_kbldzd.png",
  },
  {
    title: "Interior Design",
    description: "Elegant and functional interior space planning.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254112/image4_pojwyd.png",
  },
  {
    title: "Planning",
    description: "Strategic development and regulation your project.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254114/image5_vmjdzs.png",
  },
  {
    title: "Exterior Design",
    description: "Appealing and weather-resistant outer aesthetics.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254112/image1_nsppay.png",
  },
  {
    title: "Renovation",
    description: "Upgrading old spaces with modern solutions.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254111/image2_drbwz5.png",
  },
  {
    title: "Landscape Design",
    description: "Organizing outdoor areas creatively.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254112/image3_kbldzd.png",
  },
  {
    title: "Consultation",
    description: "Expert advice for design and execution.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254112/image4_pojwyd.png",
  },
  {
    title: "Budget Planning",
    description: "Estimate and manage costs efficiently.",
    image:
      "https://res.cloudinary.com/ds07e7rod/image/upload/v1750254114/image5_vmjdzs.png",
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
