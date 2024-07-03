import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Disc from "./Disc";
import TowerSvg from "./assets/Tower.svg";

export default function Tower({ id, discs }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        color: isOver ? "green" : undefined,
        backgroundImage: `url(${TowerSvg})`,
    };

    return (
        <section className="tower" ref={setNodeRef} style={style}>
        {discs.map(discId => (
            <Disc key={discId} id={discId} />
        ))}
        </section>
    );
}
