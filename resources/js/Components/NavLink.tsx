import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

interface Props {
    href: string;
    active: boolean;
    children: React.ReactNode;
}

export default function NavLink({ href, active, children }: Props) {
    return (
        <InertiaLink
            href={href}
            className={
                active
                    ? "flex items-center mt-1 py-2 px-6 text-sm bg-gray-700 bg-opacity-25 text-gray-100"
                    : "flex items-center mt-1 py-2 px-6 text-sm text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            }
        >
            {children}
        </InertiaLink>
    );
}
