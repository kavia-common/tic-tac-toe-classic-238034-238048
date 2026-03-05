import React from "react";
import TicTacToe from "./components/TicTacToe";

/**
 * Root application component.
 */
export default function App() {
  return (
    <div className="app">
      <main className="shell" aria-label="Tic Tac Toe application">
        <header className="header">
          <div>
            <h1 className="title">Tic Tac Toe</h1>
            <p className="subtitle">Local two-player game. Take turns and get three in a row.</p>
          </div>
        </header>

        <section className="card" aria-label="Game area">
          <TicTacToe />
        </section>

        <footer className="footer">
          <span className="footerText">
            Tip: You can use Tab/Enter to play. The focused square shows a ring.
          </span>
        </footer>
      </main>
    </div>
  );
}
