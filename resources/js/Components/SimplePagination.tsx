import React, { useState } from "react";
import {
    NavigateBefore,
    NavigateNext,
    SkipNext,
    SkipPrevious,
} from "@material-ui/icons";
import { Inertia } from "@inertiajs/inertia";

type parameters = {
    month?: string;
    term?: string;
};

interface Props {
    total: number;
    last_page: number;
    current_page: number;
    url: string;
    params?: parameters;
}

const SimplePagination: React.FC<Props> = ({
    total,
    last_page,
    current_page,
    url,
    params,
}) => {
    const handlePagination = (page: number) => {
        let parameters: parameters | undefined = params;

        if (parameters?.month === "") {
            delete parameters.month;
        }
        if (parameters?.term === "") {
            delete parameters.term;
        }

        Inertia.get(
            url,
            {
                ...parameters,
                page: page,
            },
            {
                replace: true,
                preserveState: true,
            }
        );
    };

    return (
        <div className="inline-flex justify-center items-center">
            <div className="hidden mr-2 text-sm text-gray-600 lg:block">
                {total} registros
            </div>

            <div className="flex space-x-1 items-top">
                <button
                    disabled={current_page - 1 <= 0}
                    onClick={(e) => handlePagination(1)}
                    className={`${
                        current_page - 1 <= 0 && "opacity-50"
                    } inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 lg:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                >
                    <SkipPrevious className="text-gray-700" />
                </button>
                <button
                    disabled={current_page - 1 <= 0}
                    onClick={(e) => handlePagination(current_page - 1)}
                    className={`${
                        current_page - 1 <= 0 && "opacity-50"
                    } inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                >
                    <NavigateBefore className="text-gray-700" />
                </button>

                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-1">
                    <input
                        type="text"
                        value={current_page}
                        onChange={(e) => {}}
                        className="px-2 w-11 h-11 text-center rounded border border-gray-400 shadow-sm lg:h-9 lg:w-9 lg:text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="px-2 text-gray-600 lg:text-sm">
                        de {last_page}
                    </div>
                </div>

                <button
                    disabled={current_page + 1 > last_page}
                    onClick={(e) => handlePagination(current_page + 1)}
                    className={`${
                        current_page + 1 > last_page && "opacity-50"
                    } inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-300 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                >
                    <NavigateNext className="text-gray-700" />
                </button>

                <button
                    disabled={current_page + 1 > last_page}
                    onClick={(e) => handlePagination(last_page)}
                    className={`${
                        current_page + 1 > last_page && "opacity-50"
                    } inline-flex justify-center items-center w-11 h-11 text-gray-700 bg-white rounded border border-gray-300 shadow-sm outline-none hover:bg-gray-50 lg:h-9 lg:w-9 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                >
                    <SkipNext className="text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default SimplePagination;
