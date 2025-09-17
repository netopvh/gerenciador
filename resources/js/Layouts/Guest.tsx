import ApplicationLogo from '../Components/ApplicationLogo';
import ThemeToggle from '../Components/ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    children: React.ReactNode;
}

export default function Guest({ children }: Props) {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                {/* Header com logo e botão de tema */}
                <div className="w-full max-w-md flex justify-between items-center mb-6 px-6">
                    <InertiaLink href="/" className="flex items-center space-x-3">
                        <ApplicationLogo className="w-12 h-12" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Sistema de Gestão
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Acesso ao sistema
                            </p>
                        </div>
                    </InertiaLink>
                    
                    <ThemeToggle />
                </div>

                {/* Card de login */}
                <div className="w-full sm:max-w-md px-6 py-8 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden sm:rounded-xl">
                    {children}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2024 Sistema de Gestão. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </ThemeProvider>
    );
}
