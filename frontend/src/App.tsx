import React from "react";
import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main className="AppShell" role="main" aria-label="Tic Tac Toe">
        <header className="Header">
          <div className="HeaderText">
            <h1 className="Title">Tic Tac Toe</h1>
            <p className="Subtitle">Two-player local play. First to 3 in a row wins.</p>
          </div>
        </header>

        <section className="Card" aria-label="Game area">
          <Game />
        </section>

        <footer className="Footer">
          <span className="FooterText">Classic 3×3 • Responsive • Minimal UI</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
