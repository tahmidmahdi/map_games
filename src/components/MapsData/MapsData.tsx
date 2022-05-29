import React from "react";
import randomCityGenerate from "../../Helper/randomCity";
import { CityInterface } from "../../Lib/mapData";

const MapsData: React.FC<{
  cityGenerate: CityInterface;
  totalDistance: number;
  rightGuess: number;
  setCityGenerate: React.Dispatch<React.SetStateAction<CityInterface>>;
}> = ({ cityGenerate, totalDistance, rightGuess, setCityGenerate }) => {
  const eventClearHandler = (): void => {
    setCityGenerate({
      name: "",
      position: { lat: 0, lng: 0 },
    });
  };
  const eventHandler = (): void => {
    setCityGenerate(randomCityGenerate);
  };

  return (
    <div className="distance_container">
      <div>
        <p>NB. Click Clear button after generating random city</p>
      </div>
      <div className="maps-data-button">
        <button type="button" onClick={() => eventHandler()}>
          Generate A City
        </button>
        <button
          className="danger"
          type="button"
          onClick={() => eventClearHandler()}
        >
          Clear
        </button>
      </div>
      <div>
        <h1>
          {cityGenerate?.name
            ? `Find ${cityGenerate.name}`
            : "Click Generate Button to generate a city"}
        </h1>
      </div>
      <div>
        <h1>Total KM left {totalDistance.toFixed(2)}</h1>
      </div>
      <div>
        <h1>Total Right Guesses {rightGuess}</h1>
      </div>
    </div>
  );
};

export default MapsData;
