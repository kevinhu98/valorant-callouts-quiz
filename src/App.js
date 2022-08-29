import React, { useState } from "react";
import ChoiceDisplay from "./components/ChoiceDisplay";
import ImageDisplay from "./components/ImageDisplay";

const pearl = [
  "Records",
  "Restaurant",
  "Screen",
  "Secret",
  "Shops",
  "Spawn",
  "Top",
  "Tower",
  "Tunnel",
  "Water"
];

const pearlImages = [
  {
    imageName: "pearl_secret.png",
    callout: "Shops"
  },
  {
    imageName: "pearl_secret.png",
    callout: "Shops"
  },
  {
    imageName: "pearl_secret.png",
    callout: "Shops"
  }
];

const seenPool = []; // pool of seen callouts

const choicePool = pearl.sort(() => Math.random() - Math.random()).slice(0, 3); // todo: make this option for number of choices

export default () => {
  //const [map, setMap] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(pearlImages[0]);
  const [choices, setChoices] = useState([]);
  const [seen, setSeen] = useState([]);
  //const [correctScore, setCorrectScore] = useState([]);
  //const [wrongScore, setWrongScore] = useState;
  return (
    <div>
      <ImageDisplay imageName={pearlImages[0].imageName}></ImageDisplay>
      <ChoiceDisplay choices={choicePool}></ChoiceDisplay>
    </div>
  );
};
