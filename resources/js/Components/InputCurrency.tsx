import React from "react";
import NumberFormat from "react-number-format";

interface Props {
    name: string;
    value: any;
    className?: string;
    errors?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputCurrency: React.FC<Props> = ({
    name,
    value,
    className,
    errors,
    onChange,
}) => {
    return (
        <div className="flex flex-col items-start">
            <NumberFormat
                type="text"
                name={name}
                value={value}
                className={
                    `${
                        errors ? "border-red-500" : "border-gray-300"
                    } focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                prefix="R$"
                allowNegative={false}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                onChange={onChange}
            />
            {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
        </div>
    );
};

export default InputCurrency;
