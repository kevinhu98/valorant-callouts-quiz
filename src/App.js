import React, { useState, useEffect } from "react";
import ChoiceDisplay from "./components/ChoiceDisplay";
import ImageDisplay from "./components/ImageDisplay";
import Dropdown from "./components/Dropdown";

const pearlObj = [
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

const fractureObj = [
  {
    imageName: "pearl_secret.png",
    callout: "A"
  },
  {
    imageName: "chicken1.png",
    callout: "B"
  },
  {
    imageName: "chicken2.png",
    callout: "C"
  },
  {
    imageName: "pearl_secret.png",
    callout: "D"
  },
  {
    imageName: "chicken1.png",
    callout: "E"
  },
  {
    imageName: "chicken2.png",
    callout: "F"
  }
];

const mapPool = [
  {
    label: "Pearl",
    value: pearlObj
  },
  {
    label: "Fracture",
    value: fractureObj
  }
];

function shuffle(array) {
  // Fisher-Yates Shuffle
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

export default () => {
  const [selectedMap, setSelectedMap] = useState(mapPool[0]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");
  const [choices, setChoices] = useState([]);
  const [seen, setSeen] = useState([]);
  const [correctScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [colorHidden, setColorHidden] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * selectedMap.value.length); //should change this to random elem in total arr then pop
    const answer = selectedMap.value[randomIndex].callout; //should change this to random elem in total arr then pop
    var options = selectedMap.value
      .map((loc) => loc.callout)
      .filter((choice) => choice !== answer) // make sure no duplicate answer
      //.filter((x) => !seen.includes(x))
      .sort(() => Math.random() - Math.random())
      .slice(0, 3); // todo: make this option for number of choices
    setChoices(shuffle([...options, answer]));
    setCorrectAnswer(answer);
    setImage(selectedMap.value[randomIndex].imageName);
  }, [correctScore, incorrectScore, selectedMap]);

  const onChoiceClicked = (choice) => {
    // reveal correct answer and pause, then resets questions
    setColorHidden(false);
    setTimeout(() => {
      setColorHidden(true);
      if (correctAnswer === choice) {
        setCorrectScore(correctScore + 1);
      } else {
        setIncorrectScore(incorrectScore + 1);
      }
    }, 2500);
  };

  return (
    <div>
      <div>
        Score: {correctScore} - {incorrectScore}
      </div>
      <div>Correct Answer: {correctAnswer}</div>

      <Dropdown
        label="Select a map"
        options={mapPool}
        selected={selectedMap}
        onSelectedChange={setSelectedMap}
      />

      <ImageDisplay imageName={image} />
      <ChoiceDisplay
        choices={choices}
        onChoiceClicked={onChoiceClicked}
        colorHidden={colorHidden}
        correctAnswer={correctAnswer}
      />
    </div>
  );
};
