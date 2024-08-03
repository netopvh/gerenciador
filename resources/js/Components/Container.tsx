import React from "react";

interface Props {
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-2 py-8">{children}</div>
        </main>
    );
};

export default Container;
