import Dropdown from "@/Components/Dropdown";
import React, { useState } from "react";
import route from "ziggy-js";

interface Props {
    auth: any;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderTop: React.FC<Props> = ({ auth, sidebarOpen, setSidebarOpen }) => {
    const [showNotification, setShowNotification] = useState(false);

    const handleShowNotification = () => {
        if (showNotification) {
            setShowNotification(false);
        } else {
            setShowNotification(true);
        }
    };

    return (
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">
                <button
                    className="text-gray-500 focus:outline-none lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H20M4 18H11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex items-center">
                <div className="relative">
                    <button
                        type="button"
                        onClick={handleShowNotification}
                        className="flex mx-5 cursor-pointer text-gray-600 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={`${
                            showNotification ? "absolute" : "hidden"
                        } right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10`}
                    >
                        <a
                            href="#"
                            className="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 -mx-2"
                        >
                            {/**
                             * <img
                                className="h-8 w-8 rounded-full object-cover mx-1"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                alt="avatar"
                            />
                             */}
                            <p className="text-sm mx-2">
                                <span className="font-bold text-indigo-400">
                                    Sem notificação
                                </span>
                                {/**
                                 * <span className="font-bold">Sara Salah</span>{" "}
                                replied on the{" "}
                                <span className="font-bold text-indigo-400">
                                    Upload Image
                                </span>{" "}
                                artical . 2m
                                 */}
                            </p>
                        </a>
                    </div>
                </div>

                <div className="relative">
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
                {/**
                 * <div className="relative">
                    <button
                        onClick={handleShowOptions}
                        className="relative block mx-5 overflow-hidden focus:outline-none"
                    >
                        {auth.user.name}
                    </button>

                    <div
                        className={`${
                            showOptions ? "absolute" : "hidden"
                        } right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10`}
                    >
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            Profile
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            Products
                        </a>
                        <a
                            href="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            Logout
                        </a>
                    </div>
                </div>
                 */}
            </div>
        </header>
    );
};

export default HeaderTop;
