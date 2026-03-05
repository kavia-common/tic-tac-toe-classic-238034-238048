import React from "react";
import type { SquareValue } from "../lib/gameTypes";

type Props = {
  value: SquareValue;
  onClick: () => void;
  isHighlighted: boolean;
  ariaLabel: string;
};

export default function Square({ value, onClick, isHighlighted, ariaLabel }: Props) {
  const isDisabled = value !== null;

  return (
    <button
      type="button"
      className={["Square", isHighlighted ? "Square--highlight" : ""].join(" ")}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      <span className="SquareValue" aria-hidden="true">
        {value ?? ""}
      </span>
    </button>
  );
}
