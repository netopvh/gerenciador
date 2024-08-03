import React from "react";
import AllOutIcon from "@material-ui/icons/AllOut";
import { MonetizationOn, MoneyOff, Person } from "@material-ui/icons";

interface Props {
    icon: number;
    title: string;
    value: string | number;
    currency?: boolean;
}

const arrayIcon = [
    <AllOutIcon fontSize="small" className="text-red text-xs" />,
    <MoneyOff fontSize="small" className="text-red text-xs" />,
    <MonetizationOn fontSize="small" className="text-red text-xs" />,
    <Person fontSize="small" className="text-red text-xs" />,
];

const Card: React.FC<Props> = ({ title, icon, value, currency = false }) => {
    return (
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="px-5 py-5">
                <header className="flex justify-between items-start mb-2">
                    {arrayIcon[icon]}
                    {/*<img src={Icon} width="32" height="32" alt="Icon 01" />*/}
                </header>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h2>
                <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 mr-2">
                        {value == null ? "0" : currency ? "R$ " + value : value}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
