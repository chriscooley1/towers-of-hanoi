import React, { useState, useEffect } from "react";
import Tower from "./Tower";
import { DndContext } from "@dnd-kit/core";
import ConfettiExplosion from "react-confetti-explosion";
import bigExplodeProps from "./confettiProps";

export default function Game({ towers, setTowers }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [completedTowerId, setCompletedTowerId] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentTower, setCurrentTower] = useState(null);
    const [finalExplosion, setFinalExplosion] = useState(false);

    function getDiscSize(discId) {
        return parseInt(discId.split("-")[1], 10);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
        setTowers((prevTowers) => {
            const newTowers = { ...prevTowers };

            const sourceTower = Object.keys(newTowers).find((key) =>
            newTowers[key].includes(active.id)
            );
            const targetTower = newTowers[over.id];

            if (
            targetTower.length === 0 ||
            getDiscSize(active.id) < getDiscSize(targetTower[0])
            ) {
            newTowers[sourceTower] = newTowers[sourceTower].filter(
                (id) => id !== active.id
            );
            newTowers[over.id].unshift(active.id);

            if (checkCompletion(newTowers)) {
                setIsCompleted(true);
                setCurrentTower("A");
                setShowConfetti(true);
            } else {
                setIsCompleted(false);
            }
            } else {
            console.log(
                "Invalid move: larger disc cannot be placed on top of a smaller disc."
            );
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
        const sequence = ["A", "B", "C"];
        let index = 0;
        const interval = setInterval(() => {
            if (index < sequence.length) {
            setCurrentTower(sequence[index]);
            index++;
            } else {
            clearInterval(interval);
            setFinalExplosion(true);
            setTimeout(() => {
                setShowConfetti(false);
                setFinalExplosion(false);
            }, 5000);
            }
        }, 2000);
        return () => clearInterval(interval);
        }
    }, [showConfetti]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
        <main>
            {Object.keys(towers).map((id) => (
            <Tower
                key={id}
                id={id}
                discs={towers[id]}
                isCompleted={isCompleted}
                showConfetti={showConfetti && currentTower === id}
            />
            ))}
            {finalExplosion && (
            <div className="full-screen-confetti">
                <ConfettiExplosion {...bigExplodeProps} force={1.2} duration={6000} particleCount={500} />
            </div>
            )}
        </main>
        </DndContext>
    );
}
