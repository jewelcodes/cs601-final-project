/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use client";
"use strict";

import "./Link.css";
import NextLink from "next/link";

export default function Link({ ...props }: Readonly<{
    href?: string,
    target?: "_blank" | "_self" | null,
    onClick?: () => void,
    children?: React.ReactNode
}>) {
    return (
        <NextLink href={props.href || ""}
            target={props.target || "_self"}
            className="link"
            onClick={props.onClick}
        >
            [ {props.children} ]
        </NextLink>
    );
}
