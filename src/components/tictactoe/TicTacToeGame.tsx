"use client";

import React from "react";
import TicTacToeCell from "./TicTacToeCell";
import ScoreDisplay from "./ScoreDisplay";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTicTacToe } from "@/hooks/useTicTacToe";

const TicTacToeGame = () => {
  const { user } = useUser();
  const username = user?.nickname || "Guest";
  const email = user?.email || "";

  const {
    board,
    isPlayerTurn,
    winner,
    score,
    winStreak,
    handleCellClick,
    resetGame,
  } = useTicTacToe(username, email);

  return (
    <>
      <TicTacToeCell
        board={board}
        handleCellClick={handleCellClick}
        winner={winner}
        isPlayerTurn={isPlayerTurn}
      />
      <ScoreDisplay playerScore={score} winStreak={winStreak} />
      {winner && (
        <div className="text-center mb-4">
          <p>
            {winner === "draw"
              ? "It's a draw!"
              : `Winner: ${winner === "X" ? "You" : "Bot"}`}
          </p>
          <Button onClick={resetGame} className="mt-2">
            Play Again
          </Button>
        </div>
      )}
    </>
  );
};

export default TicTacToeGame;
