import React from "react";

interface Props {
    forInput: string;
    value: string;
    className?: string;
}

const Label: React.FC<Props> = ({ forInput, value, className, children }) => {
    return (
        <label
            htmlFor={forInput}
            className={
                `block text-gray-700 tracking-wide text-xs font-bold ` +
                className
            }
        >
            {value ? value : { children }}
        </label>
    );
};

export default Label;
