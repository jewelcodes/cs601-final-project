/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

import Link from "../Link/Link";
import "./Header.css";

export default function Header() {
    return (
        <header>
            <Link href="/">
                Home
            </Link>
            &nbsp;
            <Link href="/history">
                History
            </Link>
            &nbsp;
            <Link href="https://github.com/jewelcodes" target="_blank">
                GitHub
            </Link>
        </header>
    );
}
