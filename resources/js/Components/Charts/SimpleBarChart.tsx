import React from 'react';
import { formatCurrency } from '@/utils/rechartsConfig';

interface SimpleBarChartProps {
    data: Array<{
        name: string;
        value: number;
        color?: string;
    }>;
    title?: string;
    height?: number;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
    data, 
    title = "Gráfico de Barras",
    height = 300
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <p>Nenhum dado disponível</p>
                    </div>
                </div>
            </div>
        );
    }

    const maxValue = Math.max(...data.map(item => item.value));
    const chartHeight = height - 100; // Espaço para labels e título

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="relative" style={{ height: `${height}px` }}>
                <div className="flex items-end justify-between h-full px-4 pb-8">
                    {data.map((item, index) => {
                        const barHeight = (item.value / maxValue) * chartHeight;
                        const color = item.color || '#3B82F6';
                        
                        return (
                            <div key={index} className="flex flex-col items-center flex-1 mx-1">
                                <div
                                    className="w-full rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer relative group"
                                    style={{
                                        height: `${barHeight}px`,
                                        backgroundColor: color,
                                        minHeight: item.value > 0 ? '4px' : '0px'
                                    }}
                                    title={`${item.name}: ${formatCurrency(item.value)}`}
                                >
                                    {/* Tooltip flutuante */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                        <div className="font-medium">{item.name}</div>
                                        <div>{formatCurrency(item.value)}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600 mt-2 text-center">
                                    {item.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SimpleBarChart;
