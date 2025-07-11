/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || "http://localhost:8000";

export const fetchEtymology = async (word: string) => {
    const response = await fetch(`${API_ROOT}/word/${encodeURIComponent(word)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
}
