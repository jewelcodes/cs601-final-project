/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import "./EtymologyTree.css";

function EtymologyNode({ ...props }: Readonly<{
    word: string,
    origin: string,
}>) {
    return (
        <div className="etymology-node">
            <h3>{props.origin}</h3>
            <h2>{props.word}</h2>
        </div>
    );
}

export default function EtymologyTree() {
    return (
        <div className="etymology-tree">
            <div className="etymology-tree-bg-overlay">
                {Array.from({ length: 35 }).map((_, index) => (
                    <i key={index} className="etymology-tree-star-bg" style={{
                        "animation": `star-bg ${Math.round(Math.random() * 10) + 5}s linear infinite`,
                        "left": `${Math.round(Math.random() * 100)}%`,
                        "color": `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`,
                    }} />
                ))}
            </div>

            <EtymologyNode word="*(s)kewH-" origin="Proto-Indo-European" />
            <EtymologyNode word="*skiwją" origin="Proto-Germanic" />
            <EtymologyNode word="ský" origin="Old Norse" />
            <EtymologyNode word="skie" origin="Middle English" />
            <EtymologyNode word="ski" origin="Middle English" />
            <EtymologyNode word="sky" origin="Middle English" />
            <EtymologyNode word="sky" origin="English" />
        </div>
    );
}