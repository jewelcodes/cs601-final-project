/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import "./EtymologyTree.css";
import { Etymology } from "@/app/interfaces/etymology";

const STAR_COUNT = 40;

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

export default function EtymologyTree({ ...props }: Readonly<{
    etymology?: Etymology | null,
    state?: "not-found" | null
}>) {
    return (
        <div className="etymology-tree">
            <div className="etymology-tree-bg-overlay">
                {Array.from({ length: STAR_COUNT }).map((_, index) => (
                    <i key={index} aria-hidden={true} className="etymology-tree-star-bg" style={{
                        "animation": `star-bg ${Math.round(Math.random() * 10) + 5}s linear infinite`,
                        "left": `${Math.round(Math.random() * 100)}%`,
                        "color": `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`,
                    }} />
                ))}
            </div>

            {props.etymology && props.etymology.etymology && props.etymology.etymology.length > 0 ?
             props.etymology.etymology.map((node, index) => (
                <EtymologyNode key={index} word={node.word} origin={node.language} />
            )) : <div className="etymology-tree-empty">
                <h2>
                    {props.state === "not-found" && "No etymology found"}
                </h2>
                <p>
                    {props.state === "not-found" ? "Try searching for another word."
                        : "Enter a word to see its etymology."}
                </p>
            </div>}
        </div>
    );
}
