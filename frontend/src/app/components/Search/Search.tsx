/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import "./Search.css";
import { useState } from "react";
import { fetchEtymology } from "../../helpers/fetch";
import { Etymology } from "../../interfaces/etymology";

export default function Search({ ...props }: Readonly<{
    handler: (state: { etymology: Etymology | null, state: "not-found" | null }) => void,
}>) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        const response = await fetchEtymology(searchTerm);
        if(response.status === 200) {
            const etymology: Etymology = await response.json();
            props.handler({ etymology, state: null });
        } else if(response.status === 404) {
            props.handler({ etymology: null, state: "not-found" });
        } else {
            props.handler({ etymology: null, state: "not-found" });
        }
    };

    return (
        <form className="search-container" onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
        }}>
            <input type="text" autoComplete="off" className="search-box"
                placeholder="Search for a word..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="search-button-container">
                <button className="search-button"
                    aria-label="Search"
                >Search</button>
            </div>
        </form>
    );
}