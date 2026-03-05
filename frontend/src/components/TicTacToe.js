import React, { useMemo, useState } from "react";

const PLAYER_X = "X";
const PLAYER_O = "O";

const WIN_LINES = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

function isDraw(board, winner) {
  if (winner) return false;
  return board.every((cell) => cell !== null);
}

/**
 * Render a single board square as an accessible button.
 */
function Square({ value, onClick, isWinning, disabled, index }) {
  const ariaLabel = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;
  return (
    <button
      type="button"
      className={`square ${isWinning ? "square--win" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={`mark ${value === PLAYER_X ? "mark--x" : value === PLAYER_O ? "mark--o" : ""}`}>
        {value ?? ""}
      </span>
    </button>
  );
}

/**
 * TicTacToe game component implementing:
 * - 3x3 board
 * - two-player local turns
 * - win/draw detection
 * - reset functionality
 */
export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => isDraw(board, winner), [board, winner]);

  const currentPlayer = xIsNext ? PLAYER_X : PLAYER_O;

  function handleSquareClick(i) {
    if (winner || board[i] !== null) return;

    setBoard((prev) => {
      const next = prev.slice();
      next[i] = currentPlayer;
      return next;
    });
    setXIsNext((prev) => !prev);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  const statusText = winner
    ? `Winner: ${winner}`
    : draw
      ? "Draw: no moves left"
      : `Next player: ${currentPlayer}`;

  const statusVariant = winner ? "status--win" : draw ? "status--draw" : "status--turn";

  return (
    <div className="game">
      <div className="topRow">
        <div className={`status ${statusVariant}`} role="status" aria-live="polite">
          {statusText}
        </div>

        <div className="controls" aria-label="Game controls">
          <button type="button" className="btn btn--secondary" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>

      <div className="boardWrap" aria-label="Tic Tac Toe board">
        <div className="board" role="grid" aria-label="3 by 3 tic tac toe grid">
          {board.map((value, idx) => (
            <Square
              key={idx}
              value={value}
              index={idx}
              onClick={() => handleSquareClick(idx)}
              disabled={Boolean(winner) || value !== null}
              isWinning={line.includes(idx)}
            />
          ))}
        </div>
      </div>

      <div className="legend" aria-label="Game help">
        <div className="legendItem">
          <span className="chip chip--x" aria-hidden="true">
            X
          </span>
          <span>Player X</span>
        </div>
        <div className="legendItem">
          <span className="chip chip--o" aria-hidden="true">
            O
          </span>
          <span>Player O</span>
        </div>
      </div>
    </div>
  );
}
