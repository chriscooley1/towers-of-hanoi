import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Disc1 from "./assets/1Cyan.png";
import Disc2 from "./assets/2Blue.png";
import Disc3 from "./assets/3Green.png";
import Disc4 from "./assets/4Yellow.png";
import Disc5 from "./assets/5Red.png";

const discImages = [Disc1, Disc2, Disc3, Disc4, Disc5];

export default function Disc({ id }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const discIndex = parseInt(id.split("-")[1], 10);
    const image = discImages[discIndex];

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundImage: `url(${image})`,
    } : { backgroundImage: `url(${image})` };

    return (
        <div className="disc" ref={setNodeRef} style={style} {...listeners} {...attributes}>
        </div>
    );
}
