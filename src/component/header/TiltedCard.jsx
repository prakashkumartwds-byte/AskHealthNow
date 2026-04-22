import React, { useRef } from "react";

const TiltedCard = ({
  overlayContent,
  containerWidth = "100%",
  containerHeight = "400px",
  rotateAmplitude = 10,
  scaleOnHover = 1.05,
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * rotateAmplitude;
    const rotateY = ((x - centerX) / centerX) * rotateAmplitude;

    card.style.transform = `
      perspective(1000px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scaleOnHover})
    `;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        width: containerWidth,
        height: containerHeight,
        transition: "transform 0.2s ease",
      }}
    >
      {overlayContent}
    </div>
  );
};

export default TiltedCard;