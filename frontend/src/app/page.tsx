/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchEtymology } from "./helpers/fetch";
import { addToHistory } from "./helpers/history";
import { Etymology } from "./interfaces/etymology";
import EtymologyTree from "./components/EtymologyTree/EtymologyTree";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

function HomePage() {
    const searchParams = useSearchParams();
    const word = searchParams.get("word");

    const [ state, setState ] = useState<{
        etymology: Etymology | null,
        state: "not-found" | null,
    }>({
        etymology: null,
        state: null,
    });

    const fetchWord = async () => {
        if(word) {
            const response = await fetchEtymology(word);
            if(response.status === 200) {
                const etymology: Etymology = await response.json();
                if(!etymology.ok) {
                    setState({ etymology: null, state: "not-found" });
                    return;
                }
                setState({ etymology, state: null });
                addToHistory(etymology);
            } else {
                setState({ etymology: null, state: "not-found" });
            }
        } else {
            setState({ etymology: null, state: null });
        }
    }

    useEffect(() => {
        fetchWord();
    }, [word]);

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

export default function Home() {
    return (
        <Suspense>
            <HomePage />
        </Suspense>
    );
}