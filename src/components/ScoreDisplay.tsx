import React from "react";

interface ScoreDisplayProps {
  playerScore: number;
}

const ScoreDisplay = ({ playerScore }: ScoreDisplayProps) => {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold">Your Score: {playerScore}</div>
    </div>
  );
};

export default ScoreDisplay;
