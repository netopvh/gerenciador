import React from "react";

interface Props {
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
    );
};

export default Container;
