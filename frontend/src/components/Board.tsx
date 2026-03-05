import React from "react";
import Square from "./Square";
import type { SquareValue } from "../lib/gameTypes";

type Props = {
  squares: SquareValue[];
  onPlay: (index: number) => void;
  winningLine: number[] | null;
};

export default function Board({ squares, onPlay, winningLine }: Props) {
  function isWinningIndex(index: number) {
    return Boolean(winningLine && winningLine.includes(index));
  }

  return (
    <div className="Board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onPlay(idx)}
          isHighlighted={isWinningIndex(idx)}
          ariaLabel={`Square ${idx + 1}${value ? `, ${value}` : ""}`}
        />
      ))}
    </div>
  );
}
