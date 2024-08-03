import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import route from "ziggy-js";

interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
    const trigger = useRef(null);
    const sidebar = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = () => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen
                // sidebar.current.contains(target) ||
                // trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    // useEffect(() => {
    //     const keyHandler = ({ keyCode }) => {
    //         if (!sidebarOpen || keyCode !== 27) return;
    //         setSidebarOpen(false);
    //     };
    //     document.addEventListener("keydown", keyHandler);
    //     return () => document.removeEventListener("keydown", keyHandler);
    // });

    return (
        <div
            id="sidebar"
            ref={sidebar}
            className={`${sidebarOpen
                ? "translate-x-0 ease-out"
                : "-translate-x-full ease-in"
                } fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
        >
            <div className="flex justify-between mb-10 pr-3 sm:px-2">
                {/* Close button */}
                <button
                    ref={trigger}
                    className="lg:hidden text-gray-500 hover:text-gray-400"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                    </svg>
                </button>
                {/* Logo */}
                <InertiaLink href={route("dashboard")} className="block p-3">
                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                </InertiaLink>
            </div>

            <nav className="mt-10">
                <span className="flex items-center mt-1 py-2 px-6 uppercase text-gray-500 bg-black bg-opacity-80 text-xs font-bold">
                    Principal
                </span>
                <NavLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                    </svg>

                    <span className="mx-3">Dashboard</span>
                </NavLink>

                <NavLink
                    href={route("service.index")}
                    active={route().current("service.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                    </svg>

                    <span className="mx-3">Ordem de Serviço</span>
                </NavLink>

                {/* <NavLink
                    href={route("receipt.index")}
                    active={route().current("receipt.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        ></path>
                    </svg>

                    <span className="mx-3">Recibos</span>
                </NavLink> */}

                <span className="flex items-center mt-1 py-2 px-6 uppercase text-gray-500 bg-black bg-opacity-80 text-xs font-bold">
                    Gestão Financeira
                </span>

                <NavLink
                    href={route("income.index")}
                    active={route().current("income.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>

                    <span className="mx-3">Contas a Receber</span>
                </NavLink>

                <NavLink
                    href={route("expense.index")}
                    active={route().current("expense.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                    </svg>

                    <span className="mx-3">Contas a Pagar</span>
                </NavLink>

                <NavLink
                    href={route("category.index")}
                    active={route().current("category.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        ></path>
                    </svg>

                    <span className="mx-3">Centro de Custos</span>
                </NavLink>

                <span className="flex items-center mt-1 py-2 px-6 uppercase text-gray-500 bg-black bg-opacity-80 text-xs font-bold">
                    Cadastros
                </span>

                <NavLink
                    href={route("customer.index")}
                    active={route().current("customer.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                    </svg>

                    <span className="mx-3">Clientes</span>
                </NavLink>

                <NavLink
                    href={route("supplier.index")}
                    active={route().current("supplier.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        ></path>
                    </svg>

                    <span className="mx-3">Fornecedores</span>
                </NavLink>

                <NavLink
                    href={route("product.index")}
                    active={route().current("product.*")}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                    </svg>

                    <span className="mx-3">Produtos e Serviços</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
