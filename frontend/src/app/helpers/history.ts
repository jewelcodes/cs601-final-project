/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

export const getHistory = () => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
};

export const addToHistory = (word: string) => {
    const history = getHistory();
    if(!history.includes(word)) {
        history.push(word);
        localStorage.setItem("history", JSON.stringify(history));
    } else {
        const index = history.indexOf(word);
        if(index > -1) {
            history.splice(index, 1);
            history.push(word);
            localStorage.setItem("history", JSON.stringify(history));
        }
    }
};

export const clearHistory = () => {
    localStorage.removeItem("history");
};
