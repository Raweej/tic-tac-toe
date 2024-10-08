"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import TicTacToeBoard from "./TicTacToeBoard";
import ScoreDisplay from "./ScoreDisplay";
import { linesWinner } from "@/constants/common";

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerScore, setPlayerScore] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

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
    const emptyCells = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const newBoard = [...board];
      newBoard[emptyCells[randomIndex]] = "O";
      setBoard(newBoard);
      setPlayerTurn(true);
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setWinner(null);
    setGameOver(false);
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setGameOver(true);
      setWinner(winner);
      if (winner === "X") {
        setPlayerScore((prevScore) => prevScore + 1);
      } else if (winner === "O") {
        setPlayerScore((prevScore) => Math.max(0, prevScore - 1));
      }
    } else if (!board.includes(null)) {
      setGameOver(true);
      setWinner("Draw");
    } else if (!playerTurn) {
      const timer = setTimeout(() => {
        botMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, playerTurn]);

  return (
    <Card className="w-full max-w-96 mx-auto overflow-hidden">
      <CardHeader className="bg-slate-400">
        <CardTitle className="text-center">Tic Tac Toe vs Bot</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <ScoreDisplay playerScore={playerScore} />
        <TicTacToeBoard
          board={board}
          onCellClick={handleCellClick}
          playerTurn={playerTurn}
        />
        {gameOver && (
          <div className="text-center mt-4">
            {winner === "Draw" ? (
              <p className="text-xl font-bold">It is a draw!</p>
            ) : (
              <p className="text-xl font-bold">
                {winner === "X" ? "You win!" : "You lose!"}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={resetGame}>New Game</Button>
      </CardFooter>
    </Card>
  );
};

export default TicTacToeGame;
