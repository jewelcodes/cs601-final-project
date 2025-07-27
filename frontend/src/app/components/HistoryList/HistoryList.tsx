/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import "./HistoryList.css";
import { useState, useEffect } from "react";
import { getHistory, deleteFromHistory, clearHistory } from "../../helpers/history";
import { Etymology } from "../../interfaces/etymology";
import Link from "../Link/Link";

export default function HistoryList() {
    const [history, setHistory] = useState<Etymology[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    return (<>
        <div className="history-header">
            <h2>History</h2>
            {history.length !== 0 && <Link onClick={() => {
                clearHistory();
                setHistory(getHistory());
            }}>Delete All</Link>}
        </div>

        <ul className="history-list">
            {history.map((e: Etymology) => (
                <li key={e.word}>
                    <div>
                        {e.word}
                    </div>
                    <div>
                        <Link href={`/?word=${e.word}`}>
                            View
                        </Link>
                        <Link onClick={() => {
                            deleteFromHistory(e.word);
                            setHistory(getHistory());
                        }}>
                            Delete
                        </Link>
                    </div>
                </li>
            ))}

            {history.length === 0 && (
                <li>
                    Nothing to see here yet.
                </li>
            )}
        </ul>
    </>);
}
