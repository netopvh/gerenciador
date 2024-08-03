import ApplicationLogo from "../Components/ApplicationLogo";
import Dropdown from "../Components/Dropdown";
import NavLink from "../Components/NavLink";
import React, { useState } from "react";
import ResponsiveNavLink from "../Components/ResponsiveNavLink";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import Toast from "@/Components/Toast";

interface Props {
    auth: any;
    errors?: any;
    success?: string;
    children: React.ReactNode;
}

const Authenticated: React.FC<Props> = ({
    auth,
    children,
    errors,
    success,
}) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <InertiaLink href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </InertiaLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route("customer.index")}
                                    active={route().current("customer.*")}
                                >
                                    Clientes
                                </NavLink>

                                <NavLink
                                    href={route("supplier.index")}
                                    active={route().current("supplier.*")}
                                >
                                    Fornecedores
                                </NavLink>

                                <NavLink
                                    href={route("category.index")}
                                    active={route().current("category.*")}
                                >
                                    Categorias
                                </NavLink>

                                <NavLink
                                    href={route("expense.index")}
                                    active={route().current("expense.*")}
                                >
                                    Contas Pagar
                                </NavLink>

                                <NavLink
                                    href={route("income.index")}
                                    active={route().current("income.*")}
                                >
                                    Contas Receber
                                </NavLink>

                                <NavLink
                                    href={route("product.index")}
                                    active={route().current("product.*")}
                                >
                                    Produtos e Serviços
                                </NavLink>

                                <NavLink
                                    href={route("service.index")}
                                    active={route().current("service.*")}
                                >
                                    Ordem de Serviço
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Sair do Sistema
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("customer.index")}
                            active={route().current("customer.*")}
                        >
                            Clientes
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("supplier.index")}
                            active={route().current("supplier.*")}
                        >
                            Fornecedores
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("category.index")}
                            active={route().current("category.*")}
                        >
                            Categorias
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("expense.index")}
                            active={route().current("expense.*")}
                        >
                            Contas Pagar
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("income.index")}
                            active={route().current("income.*")}
                        >
                            Contas Receber
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("product.index")}
                            active={route().current("product.*")}
                        >
                            Produtos e Serviços
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("service.index")}
                            active={route().current("service.*")}
                        >
                            Ordem de Serviço
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {auth.user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Sair do Sistema
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <Toast message={success} />
            {children}
        </div>
    );
};

export default Authenticated;
