import React, { useState } from "react";
import "./App.css";
import Game from "./Game";

function App() {
  const [towers, setTowers] = useState({
    A: ["disc-0", "disc-1", "disc-2", "disc-3", "disc-4"],
    B: [],
    C: []
  });

  return (
    <>
      <header>
        <h1>Towers of Hanoi</h1>
      </header>
      <Game towers={towers} setTowers={setTowers} />
      <footer>
        <p>Created by Chris Cooley</p>
      </footer>
    </>
  );
}

export default App;
