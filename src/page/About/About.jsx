import React, { useEffect, useState, useRef } from "react";
// import Chairman from "../../assets/Chairman.jpg";

// Custom hook for counting animation
const useCountAnimation = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue + (target - startValue) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible, target, duration]);

  return [count, elementRef];
};

export default function About() {
  const [happyClientsCount, happyClientsRef] = useCountAnimation(100, 2000);
  const [architectCount, architectRef] = useCountAnimation(25, 2000);
  const [sqftCount, sqftRef] = useCountAnimation(100, 2000);

  useEffect(() => {
    const smoothScrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };
    smoothScrollToTop();
  }, []);

  return (
    <>
      <div className="aboutPage-container">
        <div className="aboutPage-container__Banner">
          <h1>
            Precision <span>Building</span>
          </h1>
        </div>
        <div className="aboutPage-container__Content">
          <div className="aboutPage-container__Content__top">
            <h1>
              About <span>Us</span>
            </h1>
            <p className="para1">
              At Luxart Homes, we redefine modern luxury by crafting bespoke
              residences that blend timeless elegance, advanced innovation, and
              master craftsmanship. Our mission is to be a trusted name in the
              luxury home market — delivering personalized designs, exceptional
              quality, and lasting value. With a commitment to excellence and
              meticulous attention to detail, we create living spaces that
              inspire, elevate lifestyles, and stand the test of time.
            </p>
          </div>
          <div className="aboutPage-container__Content__bottom">
            <div className="aboutPage-container__Content__bottom__left">
              <div className="aboutPage-container__Content__bottom__left__top">
                <div
                  className="aboutPage-container__Content__bottom__left__top__countup"
                  ref={happyClientsRef}
                >
                  <h2>{happyClientsCount}+</h2>
                  <p>Happy Clients</p>
                </div>
                <div
                  className="aboutPage-container__Content__bottom__left__top__countup"
                  ref={architectRef}
                >
                  <h2>{architectCount}+</h2>
                  <p>Architects</p>
                </div>
                <div
                  className="aboutPage-container__Content__bottom__left__top__countup"
                  ref={sqftRef}
                >
                  <h2>{sqftCount}K+</h2>
                  <p>Sq. ft</p>
                </div>
              </div>
              <div className="aboutPage-container__Content__bottom__left__bottom">
                <h1>
                  The <span>Man</span> Behind
                </h1>
                <p>
                  Farzin Ahamed, the visionary CMD of Luxart, brings over a
                  decade of leadership across sales, education, automotive, and
                  luxury lifestyle sectors. With a passion for empowering
                  others, he has personally mentored over 50 young entrepreneurs
                  through dedicated business coaching and training. Farzin's
                  approach to leadership is shaped by global mentors like John
                  C. Maxwell, Tony Robbins, and Dr. PP Vijayan. His inspiration,
                  however, comes from Andrew Carnegie—the American steel magnate
                  who built his empire by helping others become millionaires.
                  Likewise, Farzin believes true success is built by creating
                  wealth and fulfillment for those around you. Currently
                  authoring a book for aspiring entrepreneurs, his mission is
                  simple yet powerful: "Luxury is not a privilege for a few.
                  Everyone deserves to experience it—affordably." At LUXART,
                  this philosophy fuels everything we do.
                </p>
              </div>
            </div>

            <div className="aboutPage-container__Content__bottom__right">
              <img
                src={
                  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-about/lux-about2.jpg"
                }
                alt="Chairman"
              />
              <h2>Farzin Ahamed</h2>
              <p>CMD of Luxart</p>
            </div>
          </div>
        </div>
        <div className="aboutPage-container__Mission">
          <div className="aboutPage-container__Mission__top">
            <h2>
              Our <span>Mission</span>
            </h2>
            <p>
              Our mission is to create luxury living experiences for 50,000
              people over the next 25 years — delivering bespoke homes that
              blend design, comfort, and enduring value.
              {/* <span>lasting architectural realities</span>. */}
            </p>
          </div>
        </div>

        <div className="aboutPage-container__VisionGoal">
          <div className="aboutPage-container__VisionGoal__Container">
            <div className="aboutPage-container__VisionGoal__Container__Left">
              <div className="aboutPage-container__VisionGoal__Container__Left__ExpandingGoal">
                <h2>
                  Expanding <span>Goal</span>
                </h2>
                <p>
                  At Luxart Builders, our mission is to bring luxury living to
                  50,000 individuals over the next 25 years. We aim to achieve
                  this by crafting bespoke homes that combine timeless design,
                  architectural excellence, and personalized comfort. Every home
                  we build is a reflection of our commitment to quality,
                  innovation, and lifestyle enhancement. By integrating smart
                  technologies, sustainable practices, and refined aesthetics,
                  we ensure that each residence adds enduring value to our
                  clients' lives.
                </p>
              </div>

              <div className="aboutPage-container__VisionGoal__Container__Left__CompanyVision">
                <h2>
                  Company <span>Vision</span>
                </h2>
                <p>
                  To be a leading force in luxury home construction,
                  transforming the lives of 50,000 people over the next 25 years
                  through iconic, personalized living spaces. We envision a
                  future where modern design, architectural excellence, and
                  refined comfort come together to define how luxury is lived.
                  By consistently delivering enduring quality and innovation, we
                  aim to set new benchmarks in the premium housing industry. Our
                  vision is rooted in trust, craftsmanship, and a deep
                  understanding of lifestyle aspirations. Through every home we
                  create, we seek to inspire, uplift, and redefine what it means
                  to live luxuriously.us?
                </p>
              </div>
            </div>
            <div className="aboutPage-container__VisionGoal__Container__Right">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-about/lux-about4.jpg"
                alt="vision"
              />
            </div>
          </div>
        </div>

        <div className="aboutPage-container__Story">
          <h2>
            The <span>Brand</span> Story
          </h2>
          <p>
            "From the street to the skyline — we build homes with a story
            inside." From resilience to refinement — the story of Luxart
            Builders is built on bold beginnings, tireless passion, and a vision
            to redefine luxury living. At the heart of this journey is Farzin
            Ahmed — a business coach, author, trainer, and visionary
            entrepreneur. His life is a testament to grit: from cleaning hotel
            restrooms and driving local taxis to working in street sales and
            consulting, Farzin experienced life at every level. Each role, each
            hardship, became a stepping stone — not just for survival, but for
            mastery. Backed by the legacy of his father — a respected contractor
            with his own quarry and heavy machinery operations — Farzin merged
            hands-on construction insight with strategic leadership. His deep
            drive to build something meaningful led to the birth of Luxart
            Builders. Luxart began as a premium division under the wings of
            “Designer,” a respected name in architecture and interiors. With the
            creative support of Designer’s expert team, Luxart grew with a
            strong foundation in luxury design and execution. Today, Luxart
            Builders is powered by a team of leading architects, engineers, and
            construction experts. From concept to completion, we offer
            custom-built luxury homes that reflect innovation, elegance, and
            engineering precision. We don’t just construct buildings — We craft
            experiences. We build stories that last. With a bold mission to
            create luxury living for 50,000 people in the next 25 years, Luxart
            stands as a trusted name for those who seek more than just a home —
            they seek a lifestyle.
          </p>
        </div>
      </div>
    </>
  );
}
