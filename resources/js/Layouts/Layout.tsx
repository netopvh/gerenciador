import Container from "@/Components/Container";
import Toast from "@/Components/Toast";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
        <ThemeProvider>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <HeaderTop
                        auth={auth}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center space-x-4">
                                <h2 className="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                                    {title}
                                </h2>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                {button && (
                                    <InertiaLink
                                        href={href}
                                        className="inline-flex items-center px-4 py-2 font-medium text-sm text-white bg-blue-600 rounded-lg border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        <span>{name}</span>
                                    </InertiaLink>
                                )}

                                {action && (
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 font-medium text-sm text-white bg-blue-600 rounded-lg border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                        onClick={() => (onClick ? onClick() : null)}
                                    >
                                        <span>{name}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>
                    <Toast message={success} />
                    <main className="flex-1 overflow-y-auto">
                        <Container>{children}</Container>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Layout;
