import Container from "@/Components/Container";
import Toast from "@/Components/Toast";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import Sidebar from "./Sidebar";

interface Props {
    auth: any;
    errors?: any;
    success?: string;
    children: React.ReactNode;
    title: string;
    button: boolean;
    action?: boolean;
    href?: string;
    name?: string;
    onClick?: () => void;
}

const Layout: React.FC<Props> = ({
    auth,
    errors,
    success,
    children,
    title,
    button,
    action,
    href = "#",
    name,
    onClick,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="flex-1 flex flex-col">
                <HeaderTop
                    auth={auth}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <header className="bg-white shadow">
                    <div className="flex items-center space-y-2 max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
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
                <Toast message={success} />
                <Container>{children}</Container>
            </div>
        </div>
    );
};

export default Layout;
