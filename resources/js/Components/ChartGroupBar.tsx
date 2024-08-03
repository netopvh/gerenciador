import React from "react";
import { Bar, Chart } from "react-chartjs-2";

interface Props {
    title: string;
    labels: Array<any>;
    data: Array<any>;
}

const ChartGroupBar: React.FC<Props> = ({ title, labels, data }) => {
    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "A Receber",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgb(255, 99, 132)",
                stack: "Stack 0",
            },
            {
                label: "A Pagar",
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: "rgb(54, 162, 235)",
                stack: "Stack 0",
            },
        ],
    };

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="px-5 py-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h2>
                <div className="flex items-start">
                    <Bar data={dataChart} />
                </div>
            </div>
        </div>
    );
};

export default ChartGroupBar;
