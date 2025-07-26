import React from "react";

const logos = [
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector1.svg",//1
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector2.svg",//2
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector3.svg",//3
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector4.svg",//4
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector5.svg",//5
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector6.svg",//6
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector7.svg",//7
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector8.svg",//8
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector9.svg",//9
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector10.svg",//10
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector11.svg",//11
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector12.svg",//12
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector13.svg",//13
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector14.svg",//14
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector15.svg",//15
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector16.png",//16
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector17.svg",//17
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector18.png",//18
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector19.png",//19
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector20.png",//20
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-vector/lux-vector21.png",//21
];

const vector = () => {
  // Create two sets of logos for seamless animation
  const repeatedLogos = [...logos, ...logos];

  const getLogoClassName = (index) => {
    // The 18th logo (index 17) needs the larger class
    const isLargerLogo = index % logos.length === 17;
    return `vector__logo vector__logo--grayscale ${
      isLargerLogo ? "vector__logo--larger" : ""
    }`;
  };

  return (
    <section className="vector">
      <h2 className="vector__title">
        We believe in creating <span>Homes</span> you love
      </h2>

      <div className="vector__slider-wrapper">
        {/* First line - scrolls left */}
        <div className="vector__slider vector__slider--line1">
          {[...repeatedLogos, ...repeatedLogos].map((logo, index) => (
            <div className="vector__logo-box" key={`line1-${index}`}>
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className={getLogoClassName(index)}
              />
            </div>
          ))}
        </div>

        {/* Second line - scrolls right */}
        <div className="vector__slider vector__slider--line2">
          {[...repeatedLogos, ...repeatedLogos].map((logo, index) => (
            <div className="vector__logo-box" key={`line2-${index}`}>
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className={getLogoClassName(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default vector;
