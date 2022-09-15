import React from "react";
import "./ScoreDisplay.scss";

const ScoreDisplay = ({ correctScore, incorrectScore }) => {
  return (
    <div className="score">
      {"Score: "}
      <div className="correct">{correctScore}</div>
      {" - "}
      <div className="incorrect">{incorrectScore}</div>
    </div>
  );
};

export default ScoreDisplay;
