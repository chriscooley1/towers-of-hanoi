import React from "react";
import Disc from "./Disc";
import TowerSvg from "./assets/Tower.svg";
import Disc1 from "./assets/1Cyan.svg";
import Disc2 from "./assets/2Blue.svg";
import Disc3 from "./assets/3Green.svg";
import Disc4 from "./assets/4Yellow.svg";
import Disc5 from "./assets/5Red.svg";

const discImages = [Disc1, Disc2, Disc3, Disc4, Disc5];
const discLabels = ["1", "2", "3", "4", "5"];

export default function Tower({ empty }) {
    return (
        <section className="tower" style={{ backgroundImage: `url(${TowerSvg})` }}>
            {!empty && discImages.map((image, index) => (
                <Disc key={index} image={image} label={discLabels[index]} />
            ))}
        </section>
    );
}
