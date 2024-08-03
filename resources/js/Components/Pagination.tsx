import React from "react";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
import PageLink from "@/Interfaces/PageLink";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    links: Array<any>;
    totalRows: number;
}

const Pagination: React.FC<Props> = ({ links, totalRows }) => {
    console.log(totalRows);

    return (
        <div className="overflow-x-auto">
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Anterior
                    </a>
                    <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Próximo
                    </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                        >
                            {links.map((link: PageLink, index: number) => {
                                console.log(index + 1);
                                return (
                                    <InertiaLink
                                        key={index}
                                        href={link.url == null ? "#" : link.url}
                                        className={`${
                                            link.active
                                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                        } ${
                                            link.url == null &&
                                            "opacity-50 cursor-not-allowed"
                                        } px-4 relative inline-flex items-center py-2 border text-sm font-medium`}
                                    >
                                        {link.label}
                                    </InertiaLink>
                                );
                            })}
                            {/*<a href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                2
                            </a>*/}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
