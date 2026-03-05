import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Tic Tac Toe app", () => {
  test("renders title and initial status", () => {
    render(<App />);
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test("allows moves and detects a win", () => {
    render(<App />);

    // Click sequence for X win on top row: X(0), O(3), X(1), O(4), X(2)
    const squares = [
      screen.getByLabelText("Square 1"),
      screen.getByLabelText("Square 2"),
      screen.getByLabelText("Square 3"),
      screen.getByLabelText("Square 4"),
      screen.getByLabelText("Square 5")
    ];

    fireEvent.click(squares[0]); // X at 0
    fireEvent.click(squares[3]); // O at 3
    fireEvent.click(squares[1]); // X at 1
    fireEvent.click(squares[4]); // O at 4
    fireEvent.click(squares[2]); // X at 2

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });

  test("reset clears the board", () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText("Square 1"));
    expect(screen.getByLabelText("Square 1")).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();

    // After reset, square should be enabled again.
    expect(screen.getByLabelText("Square 1")).not.toBeDisabled();
  });
});
