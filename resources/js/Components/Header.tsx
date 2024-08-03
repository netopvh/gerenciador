import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

interface Props {
    title: string;
    button: boolean;
    action?: boolean;
    href?: string;
    name?: string;
    onClick?: () => void;
}

const Header: React.FC<Props> = ({
    title,
    button,
    action,
    href = "#",
    name = "Novo",
    onClick,
}) => {
    return (
        <header className="bg-white shadow">
            <div className="flex items-center space-y-2 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="font-semibold mt-1 text-xl text-gray-800 leading-tight">
                    {title}
                </h2>
                {button && (
                    <InertiaLink
                        href={href}
                        className="inline-flex mx-4 items-center px-3 h-11 font-medium text-gray-700 bg-white rounded border border-gray-300 shadow-sm lg:h-7 lg:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <span className="mx-1">{name}</span>
                    </InertiaLink>
                )}

                {action && (
                    <button
                        type="button"
                        className="inline-flex mx-4 items-center px-3 h-11 font-medium text-gray-700 bg-white rounded border border-gray-300 shadow-sm lg:h-7 lg:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => (onClick ? onClick() : null)}
                    >
                        <span className="mx-1">{name}</span>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
