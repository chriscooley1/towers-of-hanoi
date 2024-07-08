import React from "react";
import Tower from "./Tower";
import { DndContext } from "@dnd-kit/core";

export default function Game({ towers, setTowers }) {

    function getDiscSize(discId) {
        return parseInt(discId.split("-")[1], 10);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTowers(prevTowers => {
                const newTowers = { ...prevTowers };

                const sourceTower = Object.keys(newTowers).find(key => newTowers[key].includes(active.id));
                const targetTower = newTowers[over.id];

                if (targetTower.length === 0 || getDiscSize(active.id) < getDiscSize(targetTower[0])) {
                    newTowers[sourceTower] = newTowers[sourceTower].filter(id => id !== active.id);
                    newTowers[over.id].unshift(active.id);
                } else {
                    console.log("Invalid move: larger disc cannot be placed on top of a smaller disc.");
                }

                return newTowers;
            });
        }
    }

    const checkCompletion = (discs) => {
        const correctOrder = ["disc-0", "disc-1", "disc-2", "disc-3", "disc-4"];
        return JSON.stringify(discs) === JSON.stringify(correctOrder);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <main>
                {Object.keys(towers).map(id => (
                    <Tower
                        key={id}
                        id={id}
                        discs={towers[id]}
                        isCompleted={checkCompletion(towers[id])}
                    />
                ))}
            </main>
        </DndContext>
    );
}
