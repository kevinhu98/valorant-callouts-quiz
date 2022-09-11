import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = ({ imageName }) => {
  return (
    <div className="ui container">
      <div className="image-container">
        <img src={`/images/${imageName}.png`}></img>
      </div>
    </div>
  );
};

export default ImageDisplay;
