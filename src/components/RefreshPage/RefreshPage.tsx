import React from "react";

const RefreshPage: React.FC<{ rightGuess: number }> = ({ rightGuess }) => {
  return (
    <div className="refreshPage">
      <div>
        <h1>Total Right Guess {rightGuess}</h1>
      </div>
      <div>
        <button type="button" onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default RefreshPage;
