/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

export interface Response {
    ok?: boolean,
    error?: string
}

export interface EtymologyNode {
    word: string,
    language: string
}

export interface Etymology extends Response {
    word: string,
    etymology?: EtymologyNode[] | null,
}
