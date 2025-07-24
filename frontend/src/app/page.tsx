/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import { useState } from "react";
import { Etymology } from "./interfaces/etymology";
import EtymologyTree from "./components/EtymologyTree/EtymologyTree";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

export default function Home() {
    const [ state, setState ] = useState<{
        etymology: Etymology | null,
        state: "not-found" | null,
    }>({
        etymology: null,
        state: null,
    });

    return (
        <main className="transparent">
            <Header />
            <Search handler={setState} />
            <EtymologyTree
                etymology={state.etymology}
                state={state.state}
            />
        </main>
    );
}
