import React from "react";
import { Button } from "./ui/button";

interface TicTacToeBoardProps {
  board: Array<string | null>;
  onCellClick: (index: number) => void;
  playerTurn: boolean;
}

const TicTacToeBoard = ({
  board,
  onCellClick,
  playerTurn,
}: TicTacToeBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mx-auto">
      {board.map((cell, index) => (
        <Button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={cell !== null || !playerTurn}
          className="h-20 text-4xl font-bold"
          variant={
            cell === "X" ? "default" : cell === "O" ? "secondary" : "outline"
          }>
          {cell}
        </Button>
      ))}
    </div>
  );
};

export default TicTacToeBoard;
