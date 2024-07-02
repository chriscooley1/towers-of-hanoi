import React from "react";

export default function Disc({ image }) {
    return (
        <div className="disc" style={{ backgroundImage: `url(${image})` }}>
            {}
        </div>
    );
}
