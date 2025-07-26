import React, { useEffect } from "react";
import phoneIcon from "../../../assets/Phone.svg";

const floatingImages = [
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float1.jpg",//1
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float2.jpg",//2
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float3.jpg",//3
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float4.jpg",//4
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float5.jpg",//5
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float6.jpg",//6
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float7.jpg",//7
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float8.jpg",//8
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float9.jpg",//9
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float10.jpg",//10
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float11.jpg",//11
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float12.jpg",//12
  "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/luxart/luxart-floating-image/lux-float13.jpg",//13

];

const DetailSection = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+918075521186"; // Replace with your WhatsApp number
    const message = "Hello, I'm interested in your premium housing projects.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="detail-section">
      {/* Floating background images */}
      {floatingImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`floating-${index}`}
          className={`floating-image pos-${index + 1}`}
        />
      ))}

      {/* Main content */}
      <div className="detail-section__content">
        <h2>
          We Handle Every <span>Detail</span>
        </h2>
        <p>
          From start to finish, we handle everything—so you can enjoy moving
          into the home you've dreamed of
        </p>
        <button className="enquire-btn" onClick={handleWhatsAppClick}>
          <img src={phoneIcon} alt="Phone" className="phone-icon" />
          Enquire now
        </button>
      </div>
    </section>
  );
};

export default DetailSection;
