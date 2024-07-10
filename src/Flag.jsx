import React, { useState, useEffect } from "react";
import FlagImg from "./assets/Flag.png";
import ConfettiExplosion from "react-confetti-explosion";
import bigExplodeProps from './confettiProps';

export default function Flag({ isCompleted }) {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        if (isCompleted) {
            setIsExploding(true);
            setTimeout(() => setIsExploding(false), 5000);
        }
    }, [isCompleted]);

    return (
        <div className="flag-container" style={{ position: 'relative' }}>
            <img src={FlagImg} alt="Flag" className="flag" />
            {isCompleted && isExploding && (
                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                    <ConfettiExplosion {...bigExplodeProps} />
                </div>
            )}
        </div>
    );
}
