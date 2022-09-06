import React, { useState, useEffect } from "react";
import ChoiceDisplay from "./components/ChoiceDisplay";
import ImageDisplay from "./components/ImageDisplay";

const pearlImages = [
  {
    imageName: "pearl_secret.png",
    callout: "Secret"
  },
  {
    imageName: "chicken1.png",
    callout: "Records"
  },
  {
    imageName: "chicken2.png",
    callout: "Restaurant"
  },
  {
    imageName: "pearl_secret.png",
    callout: "Shops"
  },
  {
    imageName: "chicken1.png",
    callout: "Spawn"
  },
  {
    imageName: "chicken2.png",
    callout: "Water"
  }
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

export default () => {
  const [map, setMap] = useState("Pearl");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");
  const [choices, setChoices] = useState([]);
  const [seen, setSeen] = useState([]);
  const [correctScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pearlImages.length); //should change this to random elem in total arr then pop
    const answer = pearlImages[randomIndex].callout; //should change this to random elem in total arr then pop
    setCorrectAnswer(answer);
    setImage(pearlImages[randomIndex].imageName);
    var options = pearlImages
      .map((loc) => loc.callout)
      .filter((choice) => choice !== answer) // make sure no duplicate answer
      //.filter((x) => !seen.includes(x))
      .sort(() => Math.random() - Math.random())
      .slice(0, 3); // todo: make this option for number of choices

    setChoices(shuffle([...options, answer]));
  }, [correctScore, incorrectScore]);

  const onChoiceClicked = (choice) => {
    if (correctAnswer === choice) {
      setCorrectScore(correctScore + 1);
    } else {
      setIncorrectScore(incorrectScore + 1);
    }
  };

  return (
    <div>
      <div>
        Score: {correctScore} - {incorrectScore}
      </div>
      <div>Correct Answer: {correctAnswer}</div>
      <ImageDisplay imageName={image}></ImageDisplay>
      <ChoiceDisplay
        choices={choices}
        onChoiceClicked={onChoiceClicked}
      ></ChoiceDisplay>
    </div>
  );
};
