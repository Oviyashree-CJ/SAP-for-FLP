// FunFacts.jsx
import React, { useState } from "react";

const FACTS = [
  "Your brain uses about 20% of your body’s energy! ⚡",
  "Short breaks improve memory retention. 🧠",
  "Drinking water can increase focus by 10%. 💧",
  "Laughing reduces stress hormones. 😂",
];

function FunFacts() {
  const [fact, setFact] = useState(FACTS[0]);

  const nextFact = () => {
    const random = FACTS[Math.floor(Math.random() * FACTS.length)];
    setFact(random);
  };

  return (
    <div className="text-center">
      <p>{fact}</p>
      <button className="btn btn-info" onClick={nextFact}>
        Show Another
      </button>
    </div>
  );
}

export default FunFacts;