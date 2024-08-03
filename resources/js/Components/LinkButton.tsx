import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

interface Props {
    href: string;
    children?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({ href, children }) => {
    return (
        <InertiaLink
            href={href}
            className="bg-indigo-500 hover:bg-indigo-600 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
            <span>{children}</span>
        </InertiaLink>
    );
};

export default LinkButton;
