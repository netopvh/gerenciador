import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface Props {
    label: string;
    name: string;
    value?: string | number;
    className?: string;
    data: Array<any>;
    errors?: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

const Select: React.FC<Props> = ({
    label,
    name,
    className,
    value,
    data,
    errors,
    onChange,
}) => {
    return (
        <div>
            <label
                htmlFor={label}
                className="block text-gray-700 tracking-wide text-xs font-bold mb-3"
            >
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`${
                    errors ? "border-red-500" : "border-gray-300"
                } form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm`}
            >
                {data.map((item) => (
                    <option value={item.id} key={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>
            {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
        </div>
    );
};

export default Select;
