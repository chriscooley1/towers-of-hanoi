import React, { useState, useEffect } from "react";
import Tower from "./Tower";
import { DndContext } from "@dnd-kit/core";

export default function Game({ towers, setTowers }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [completedTowerId, setCompletedTowerId] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

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

                    if (checkCompletion(newTowers)) {
                        setIsCompleted(true);
                        setCompletedTowerId(over.id);
                        setShowConfetti(true);
                    } else {
                        setIsCompleted(false);
                    }
                } else {
                    console.log("Invalid move: larger disc cannot be placed on top of a smaller disc.");
                }

                return newTowers;
            });
        }
    }

    const checkCompletion = (towers) => {
        const correctOrder = ["disc-0", "disc-1", "disc-2", "disc-3", "disc-4"];
        return JSON.stringify(towers.C) === JSON.stringify(correctOrder);
    };

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <main>
                {Object.keys(towers).map(id => (
                    <Tower
                        key={id}
                        id={id}
                        discs={towers[id]}
                        isCompleted={isCompleted}
                        showConfetti={showConfetti && completedTowerId === id}
                    />
                ))}
            </main>
        </DndContext>
    );
}
