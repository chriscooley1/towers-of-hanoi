import React from "react";
import Tower from "./Tower";
import { DndContext } from "@dnd-kit/core";

export default function Game({ towers, setTowers }) {
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
