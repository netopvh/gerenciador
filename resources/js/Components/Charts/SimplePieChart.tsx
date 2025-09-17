import React from 'react';
import { formatCurrency } from '@/utils/rechartsConfig';

interface SimplePieChartProps {
    data: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    title?: string;
    size?: number;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({ 
    data, 
    title = "Gráfico de Pizza",
    size = 200
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

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = size / 2 - 20;
    const centerX = size / 2;
    const centerY = size / 2;

    let currentAngle = 0;

    const createArcPath = (startAngle: number, endAngle: number, innerRadius = 0) => {
        const start = polarToCartesian(centerX, centerY, radius, endAngle);
        const end = polarToCartesian(centerX, centerY, radius, startAngle);
        const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
        const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "L", innerEnd.x, innerEnd.y,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
            "Z"
        ].join(" ");
    };

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="flex flex-col items-center gap-6">
                <div className="flex-shrink-0">
                    <svg width={size} height={size}>
                        {data.map((item, index) => {
                            const percentage = (item.value / total) * 100;
                            const angle = (item.value / total) * 360;
                            const startAngle = currentAngle;
                            const endAngle = currentAngle + angle;
                            
                            currentAngle += angle;

                            return (
                                <path
                                    key={index}
                                    d={createArcPath(startAngle, endAngle)}
                                    fill={item.color}
                                    stroke="white"
                                    strokeWidth="2"
                                    className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                                />
                            );
                        })}
                    </svg>
                </div>
                
                <div className="w-full max-w-sm">
                    <div className="space-y-3">
                        {data.map((item, index) => {
                            const percentage = ((item.value / total) * 100).toFixed(1);
                            return (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div 
                                            className="w-4 h-4 rounded mr-3"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {formatCurrency(item.value)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {percentage}%
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Total:</span>
                            <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(total)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimplePieChart;
