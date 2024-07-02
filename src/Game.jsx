import React from "react";
import Tower from "./Tower";

export default function Game() {
    return (
        <main>
            <Tower />
            <Tower empty />
            <Tower empty />
        </main>
    );
}
