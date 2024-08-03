import React, { useEffect, useRef } from "react";

interface Props {
    type?: string;
    name: string;
    value: string;
    icon?: React.ReactNode;
    placeholder?: string;
    className?: string;
    required?: boolean;
    isFocused?: boolean;
    errors?: string | undefined;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputIcon: React.FC<Props> = ({
    type = "text",
    name,
    value,
    icon,
    placeholder,
    className,
    required,
    isFocused,
    errors,
    onChange,
}) => {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col mb-2">
            <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    {icon}
                </span>
                <input
                    type={type}
                    name={name}
                    value={value}
                    className={
                        `${
                            errors ? "border-red-500" : "border-gray-300"
                        } rounded-r-lg flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 ` +
                        className
                    }
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                />
            </div>
            {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
        </div>
    );
};

export default InputIcon;
