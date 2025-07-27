/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

import { Etymology } from "../interfaces/etymology";

const MAX_HISTORY_ITEMS = 20;

export const getHistory = (): Etymology[] => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
};

export const getWordFromHistory = (word: string): Etymology | null => {
    const history = getHistory();
    return history.find((item: Etymology) => item.word === word) || null;
};

export const addToHistory = (etymology: Etymology) => {
    const history = getHistory();
    const existing = history.findIndex((e: Etymology) => e.word === etymology.word);

    if(existing !== -1) {
        history.splice(existing, 1);
    }

    history.unshift(etymology);

    if(history.length > MAX_HISTORY_ITEMS) {
        history.splice(MAX_HISTORY_ITEMS);
    }

    localStorage.setItem("history", JSON.stringify(history));
};

export const clearHistory = () => {
    localStorage.removeItem("history");
};

export const deleteFromHistory = (word: string) => {
    const history = getHistory();
    const index = history.findIndex((e: Etymology) => e.word === word);
    if(index !== -1) {
        history.splice(index, 1);
        localStorage.setItem("history", JSON.stringify(history));
    }
};