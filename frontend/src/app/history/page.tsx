/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import Header from "../components/Header/Header";
import HistoryList from "../components/HistoryList/HistoryList";

export default function HistoryPage() {
    return (
        <main>
            <Header />
            <HistoryList />            
        </main>
    );
}