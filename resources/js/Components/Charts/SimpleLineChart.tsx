import React, { useState } from 'react';
import { formatCurrency } from '@/utils/rechartsConfig';

interface SimpleLineChartProps {
    data: Array<{
        label: string;
        value: number;
    }>;
    title?: string;
    height?: number;
    color?: string;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ 
    data, 
    title = "Gráfico de Linha",
    height = 300,
    color = '#3B82F6'
}) => {
    const [hoveredPoint, setHoveredPoint] = useState<{x: number, y: number, value: number, label: string} | null>(null);
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
    const minValue = Math.min(...data.map(item => item.value));
    const range = maxValue - minValue;
    const chartHeight = height - 100;
    const chartWidth = 400;

    // Calcular pontos da linha
    const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = chartHeight - ((item.value - minValue) / range) * chartHeight;
        return { x, y, value: item.value, label: item.label };
    });

    // Criar path SVG para a linha
    const pathData = points.map((point, index) => {
        return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ');

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="relative" style={{ height: `${height}px` }}>
                <svg width="100%" height={chartHeight} className="overflow-visible">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
                        <line
                            key={index}
                            x1="0"
                            y1={ratio * chartHeight}
                            x2={chartWidth}
                            y2={ratio * chartHeight}
                            stroke="#f0f0f0"
                            strokeWidth="1"
                        />
                    ))}
                    
                    {/* Line */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    
                    {/* Points */}
                    {points.map((point, index) => (
                        <g key={index}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill={color}
                                className="hover:r-6 transition-all duration-200 cursor-pointer"
                                onMouseEnter={() => setHoveredPoint(point)}
                                onMouseLeave={() => setHoveredPoint(null)}
                            />
                        </g>
                    ))}
                </svg>
                
                {/* Tooltip flutuante */}
                {hoveredPoint && (
                    <div 
                        className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10"
                        style={{
                            left: `${hoveredPoint.x}px`,
                            top: `${hoveredPoint.y - 30}px`,
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <div className="font-medium">{hoveredPoint.label}</div>
                        <div>{formatCurrency(hoveredPoint.value)}</div>
                    </div>
                )}
                
                {/* X-axis labels */}
                <div className="flex justify-between mt-2 px-2">
                    {data.map((item, index) => (
                        <div key={index} className="text-xs text-gray-600 text-center">
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimpleLineChart;
