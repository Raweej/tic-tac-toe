import React from "react";
import { Button } from "../ui/button";

interface TicTacToeCellProps {
  board: Array<string | null>;
  handleCellClick: (index: number) => void;
  winner: string | null;
  isPlayerTurn: boolean;
}

const TicTacToeCell = ({
  board,
  handleCellClick,
  winner,
  isPlayerTurn,
}: TicTacToeCellProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {board.map((cell, index) => (
        <Button
          key={index}
          onClick={() => handleCellClick(index)}
          disabled={!!cell || !!winner || !isPlayerTurn}
          className="w-full h-full text-2xl font-bold aspect-[4/3]">
          {cell}
        </Button>
      ))}
    </div>
  );
};

export default TicTacToeCell;
