import { useState, useEffect, useCallback } from "react";
import { linesWinner } from "@/constants/common";
import { useLeaderboard } from "./useLeaderboard";

export const useTicTacToe = (username: string, email: string) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [winStreak, setWinStreak] = useState(0);

  const { updateLeaderboard } = useLeaderboard();

  const checkWinner = useCallback((board: Array<string | null>) => {
    for (const line of linesWinner) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  const handleGameEnd = useCallback(
    (result: string) => {
      setWinner(result);
      if (result === "X") {
        const newScore = score + 1;
        const newWinStreak = winStreak + 1;
        setScore(newScore);
        setWinStreak(newWinStreak);
        if (newWinStreak === 3) {
          const scoreBonus = newScore + 1;
          setScore(scoreBonus); // Bonus point for streak
          setWinStreak(0); // Reset win streak
          return updateLeaderboard({ username, email, score: scoreBonus });
        }

        return updateLeaderboard({ username, email, score: newScore });
      } else if (result === "O") {
        const updatedScore = Math.max(0, score - 1);
        setScore(updatedScore);
        setWinStreak(0);

        return updateLeaderboard({ username, email, score: updatedScore });
      }
    },
    [score, winStreak, username, email, updateLeaderboard]
  );

  const botMove = useCallback(() => {
    const emptySquares = board.reduce((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, [] as number[]);
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
  }, [board, checkWinner, handleGameEnd]);

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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(botMove, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, botMove]);

  return {
    board,
    isPlayerTurn,
    winner,
    score,
    winStreak,
    handleCellClick,
    resetGame,
  };
};
