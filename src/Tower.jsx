import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Disc from "./Disc";
import Flag from "./Flag";
import TowerPng from "./assets/Tower.png";
import ConfettiExplosion from "react-confetti-explosion";
import bigExplodeProps from "./confettiProps";

export default function Tower({ id, discs, isCompleted, showConfetti }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        color: isOver ? "green" : undefined,
        backgroundImage: `url(${TowerPng})`,
    };

    return (
        <section className="tower" ref={setNodeRef} style={style}>
        {id === "C" && isCompleted && <Flag />}
        {showConfetti && (
            <div className="confetti-container">
            <ConfettiExplosion {...bigExplodeProps} />
            </div>
        )}
        {discs.map((discId, index) => (
            <Disc key={discId} id={discId} isDraggable={index === 0} />
        ))}
        </section>
    );
}
