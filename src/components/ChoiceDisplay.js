import React, { useState, useEffect } from "react";

const ChoiceDisplay = ({
  choices,
  onChoiceClicked,
  colorHidden,
  correctAnswer
}) => {
  const choiceButtons = choices.map((choice) => {
    if (choice === correctAnswer)
      return (
        <div key={choice} className="six wide column">
          <button
            className={`fluid ui ${colorHidden ? "" : "green"} button`}
            onClick={() => onChoiceClicked(choice)}
          >
            {choice}
          </button>
        </div>
      );
    return (
      <div key={choice} className="six wide column">
        <button
          className={`fluid ui ${colorHidden ? "" : "red"} button`}
          onClick={() => onChoiceClicked(choice)}
        >
          {choice}
        </button>
      </div>
    );
  });
  return (
    <div className="ui container">
      <div className="ui grid">{choiceButtons}</div>
    </div>
  );
};

export default ChoiceDisplay;
