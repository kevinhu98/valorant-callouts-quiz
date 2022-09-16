import React from "react";
import "./ImageDisplay.scss";

const ImageDisplay = ({ imageName }) => {
  const handleImageError = (e) => {
    e.currentTarget.src = "/images/error.png";
  };

  return (
    <div className="image-container">
      <img onError={handleImageError} src={`/images/${imageName}.png`}></img>
    </div>
  );
};

export default ImageDisplay;
