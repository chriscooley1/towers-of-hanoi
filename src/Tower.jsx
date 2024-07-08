import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Disc from "./Disc";
import Flag from "./Flag";
import TowerPng from "./assets/Tower.png";

export default function Tower({ id, discs, isCompleted }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        color: isOver ? "green" : undefined,
        backgroundImage: `url(${TowerPng})`,
    };

    return (
        <section className="tower" ref={setNodeRef} style={style}>
            {isCompleted && <Flag isCompleted={isCompleted} />} {/* Pass isCompleted prop */}
            {discs.map((discId, index) => (
                <Disc key={discId} id={discId} isDraggable={index === 0} />
            ))}
        </section>
    );
}
