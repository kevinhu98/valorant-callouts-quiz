import React, { useState, useEffect } from "react";
import ChoiceDisplay from "./components/ChoiceDisplay";
import ImageDisplay from "./components/ImageDisplay";
import Dropdown from "./components/Dropdown";
import axios from "axios";

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
  const [selectedMap, setSelectedMap] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");
  const [choices, setChoices] = useState([]);
  const [seen, setSeen] = useState([]);
  const [correctScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [colorHidden, setColorHidden] = useState(true);
  const [mapNames, setMapNames] = useState([]);
  const [mapCallouts, setMapCallouts] = useState("");

  useEffect(() => {
    const getMapInfo = async () => {
      const { data } = await axios.get("https://valorant-api.com/v1/maps");
      setMapNames(data.data.map((data) => data.displayName));
      const mapInfo = [];
      data.data.forEach((elem) => {
        // iterate through each map
        var mapValues = [];
        var multipleCallouts = ["Link", "Main", "Spawn", "Site"];
        if (elem.callouts) {
          elem.callouts.forEach((eachCallout) => {
            const imageCalloutPair = new Object();
            // add each callout/image pair to map arr
            if (multipleCallouts.indexOf(eachCallout.regionName) > -1) {
              // if callout has multiple sites, include site
              imageCalloutPair.callout = `${eachCallout.superRegionName} ${eachCallout.regionName}`;
              imageCalloutPair.imageName = `${elem.displayName}_${eachCallout.superRegionName}_${eachCallout.regionName}`;
            } else {
              imageCalloutPair.callout = eachCallout.regionName;
              imageCalloutPair.imageName = `${elem.displayName}_${eachCallout.regionName}`;
            }
            mapValues.push(imageCalloutPair);
          });
          mapInfo.push({
            // add each map to total map arr
            label: elem.displayName,
            value: mapValues
          });
        }
      });
      setMapCallouts(mapInfo);
      setSelectedMap(mapInfo[5]);
    };
    getMapInfo();
  }, []);

  useEffect(() => {
    if (selectedMap) {
      const randomIndex = Math.floor(Math.random() * selectedMap.value.length); //should change this to random elem in total arr then pop
      const answer = selectedMap.value[randomIndex].callout; //should change this to random elem in total arr then pop
      var options = shuffle(
        selectedMap.value
          .map((loc) => loc.callout)
          .filter((choice) => choice !== answer) // make sure no duplicate answer
      ).slice(0, 3); // todo: make this option for number of choices
      setChoices(shuffle([...options, answer]));
      setCorrectAnswer(answer);
      setImage(selectedMap.value[randomIndex].imageName);
    }
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

      <Dropdown
        label="Select a map"
        options={mapCallouts}
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
