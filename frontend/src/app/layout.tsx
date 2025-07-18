/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Etymology App",
    description: "Final project for CS601",
};

export default function RootLayout({ ...props }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en-us" dir="ltr">
            <body>
                {props.children}
            </body>
        </html>
    );
}
