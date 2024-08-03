import * as React from "react";

interface Props {
    label: string;
    value: string | number | undefined;
    disabled?: boolean;
    type: string;
    name: string;
    className?: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputEdit: React.FC<Props> = ({
    label,
    disabled,
    className,
    value,
    type,
    name,
    handleChange,
}) => {
    return (
        <div>
            <label className="block uppercase text-xs font-bold mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                className={
                    `${
                        disabled
                            ? "border-0"
                            : "border-gray-300 shadow focus:ring"
                    } px-3 py-3 bg-white rounded text-sm focus:outline-none w-full ease-linear transition-all duration-150 ` +
                    className
                }
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
};

export default InputEdit;
