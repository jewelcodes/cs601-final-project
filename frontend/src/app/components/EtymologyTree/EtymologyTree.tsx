/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import "./EtymologyTree.css";
import { Etymology } from "@/app/interfaces/etymology";
import { useState, useEffect } from "react";

const STAR_COUNT = 40;

interface Star {
    x: number,
    color: string,
    duration: number
};

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
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        const newStars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * 100,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            duration: Math.round(Math.random() * 10) + 5
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="etymology-tree">
            <div className="etymology-tree-bg-overlay">
                {stars.map((star, index) => (
                    <i key={index} aria-hidden={true} className="etymology-tree-star-bg" style={{
                        "animation": `star-bg ${star.duration}s linear infinite`,
                        "left": `${star.x}%`,
                        "color": star.color,
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
