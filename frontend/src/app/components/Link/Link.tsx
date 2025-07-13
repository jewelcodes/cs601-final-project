/*
 * Etymology App for CS601
 * Omar Elghoul
 */

"use strict";

import "./Link.css";
import NextLink from "next/link";

export default function Link({ ...props }: Readonly<{
    href: string,
    target?: "_blank" | "_self" | null,
    children?: React.ReactNode
}>) {
    return (
        <NextLink href={props.href} target={props.target || "_self"} className="link">
            [ {props.children} ]
        </NextLink>
    );
}
