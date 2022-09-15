import React from "react";
import "./ImageDisplay.scss";

const ImageDisplay = ({ imageName }) => {
  return (
    <div className="image-container">
      <img src={`/images/${imageName}.png`}></img>
    </div>
  );
};

export default ImageDisplay;
