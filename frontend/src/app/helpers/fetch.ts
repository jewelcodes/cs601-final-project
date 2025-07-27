/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

import { getWordFromHistory } from "./history";

const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || "http://localhost:8000";

export const fetchEtymology = async (word: string) => {
    const cache = getWordFromHistory(word.trim().toLowerCase());
    if(cache && cache.ok) {
        // avoid hitting the API when unnecessary
        return new Response(JSON.stringify(cache), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }

    const response = await fetch(`${API_ROOT}/word/${encodeURIComponent(word)}`, {
        method: "GET"
    });

    return response;
}
