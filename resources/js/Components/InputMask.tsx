import * as React from "react";
import ReactInputMask from "react-input-mask";

interface Props {
    name: string;
    value: string;
    mask: string;
    className?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputMask: React.FC<Props> = ({
    name,
    value,
    mask,
    className,
    onChange,
}) => {
    return (
        <div>
            <ReactInputMask
                name={name}
                value={value}
                className={
                    `border-gray-300 border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                onChange={onChange}
                mask={mask}
            />
        </div>
    );
};

export default InputMask;
