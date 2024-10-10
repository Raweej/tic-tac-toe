"use client";

import React, { useEffect, useState } from "react";
import TicTacToeCell from "./TicTacToeCell";
import ScoreDisplay from "./ScoreDisplay";
import { linesWinner } from "@/constants/common";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";

const TicTacToeGame = () => {
  const { user } = useUser();
  const username = user?.nickname;
  const email = user?.email;

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(0);
  const [winStreak, setWinStreak] = useState(0);

  const checkWinner = (board: Array<string | null>) => {
    for (const line of linesWinner) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const botMove = () => {
    const emptySquares = board.reduce((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, []);
    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = "O";
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      handleGameEnd(newWinner);
    } else if (newBoard.every((square) => square !== null)) {
      handleGameEnd("draw");
    } else {
      setIsPlayerTurn(true);
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      handleGameEnd(newWinner);
    } else if (newBoard.every((square) => square !== null)) {
      handleGameEnd("draw");
    } else {
      setIsPlayerTurn(false);
    }
  };

  const handleUpdateLeaderboard = async ({ username, email, score }: any) => {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ username, email, score }),
    });
    if (!response.ok) {
      console.error("Failed to update leaderboard");
    }
  };

  const handleGameEnd = (result: any) => {
    setWinner(result);
    if (result === "X") {
      const newScore = score + 1;
      setScore(newScore);
      const newWinStreak = winStreak + 1;
      setWinStreak(newWinStreak);
      if (newWinStreak === 3) {
        setScore(newScore + 1);
        setWinStreak(0);
      }
      handleUpdateLeaderboard({ username, email, newScore });
    } else if (result === "O") {
      setScore(Math.max(0, score - 1));
      setWinStreak(0);
      handleUpdateLeaderboard({
        username,
        email,
        score: Math.max(0, score - 1),
      });
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => botMove(), 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner]);

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
