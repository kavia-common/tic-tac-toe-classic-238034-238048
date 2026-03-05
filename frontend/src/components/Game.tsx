import React, { useMemo, useState } from "react";
import Board from "./Board";
import type { Player, SquareValue } from "../lib/gameTypes";
import { calculateWinner } from "../lib/calculateWinner";
import { isBoardFull } from "../lib/isBoardFull";

const INITIAL_BOARD: SquareValue[] = Array(9).fill(null);

function nextPlayerFrom(xIsNext: boolean): Player {
  return xIsNext ? "X" : "O";
}

function statusText(params: {
  winner: Player | null;
  isDraw: boolean;
  next: Player;
}): { title: string; tone: "neutral" | "success" | "error" } {
  if (params.winner) {
    return { title: `Winner: ${params.winner}`, tone: "success" };
  }
  if (params.isDraw) {
    return { title: "Draw game", tone: "neutral" };
  }
  return { title: `Next player: ${params.next}`, tone: "neutral" };
}

export default function Game() {
  const [squares, setSquares] = useState<SquareValue[]>(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = !winner && isBoardFull(squares);
  const next = nextPlayerFrom(xIsNext);

  const status = statusText({ winner, isDraw, next });

  function handlePlay(index: number) {
    // Prevent playing after game ends or overwriting a square.
    if (winner || isDraw || squares[index] !== null) return;

    const updated = squares.slice();
    updated[index] = next;
    setSquares(updated);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(INITIAL_BOARD);
    setXIsNext(true);
  }

  const movesCount = squares.filter((v) => v !== null).length;

  return (
    <div className="Game">
      <div className="TopRow">
        <div className="StatusGroup" aria-live="polite" aria-atomic="true">
          <div
            className={[
              "StatusPill",
              status.tone === "success" ? "StatusPill--success" : "",
              status.tone === "error" ? "StatusPill--error" : ""
            ].join(" ")}
          >
            {status.title}
          </div>
          <div className="MetaText">Moves: {movesCount}/9</div>
        </div>

        <button type="button" className="Button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <Board squares={squares} onPlay={handlePlay} winningLine={line} />

      <div className="HelpText" role="note">
        Tip: You can’t overwrite a square. Reset anytime to start over.
      </div>
    </div>
  );
}
