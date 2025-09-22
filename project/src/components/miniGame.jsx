// MiniGame.jsx
import React, { useState } from "react";

function MiniGame() {
  const [score, setScore] = useState(0);

  const handleClick = () => setScore(score + 1);

  return (
    <div className="text-center">
      <p>Click the button as many times as you can in your break!</p>
      <button className="btn btn-success" onClick={handleClick}>
        🎯 Click Me!
      </button>
      <p className="mt-2">Your Score: {score}</p>
    </div>
  );
}

export default MiniGame;
