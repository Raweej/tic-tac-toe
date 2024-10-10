import React from "react";

interface ScoreDisplayProps {
  playerScore: number;
  winStreak: number;
}

const ScoreDisplay = ({ playerScore, winStreak }: ScoreDisplayProps) => {
  return (
    <div className="flex justify-between">
      <p className="text-lg font-semibold">Score: {playerScore}</p>
      <p>Win Streak: {winStreak}</p>
    </div>
  );
};

export default ScoreDisplay;
