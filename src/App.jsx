import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import "./App.css";
import Game from "./Game";

function App() {
  const [towers, setTowers] = useState({
    A: ["disc-0", "disc-1", "disc-2", "disc-3", "disc-4"],
    B: [],
    C: []
  });

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTowers(prevTowers => {
        const newTowers = { ...prevTowers };
        // Find the source tower
        const sourceTower = Object.keys(newTowers).find(key => newTowers[key].includes(active.id));
        // Remove the disc from the source tower
        newTowers[sourceTower] = newTowers[sourceTower].filter(id => id !== active.id);
        // Add the disc to the target tower
        newTowers[over.id].unshift(active.id);
        return newTowers;
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <header>
        <h1>Towers of Hanoi</h1>
      </header>
      <Game towers={towers} />
      <footer>
        <p>Created by Chris Cooley</p>
      </footer>
    </DndContext>
  );
}

export default App;
