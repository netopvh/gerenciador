import React from 'react';
import SimpleBarChart from './SimpleBarChart';

interface DashboardMonthlyComparisonChartProps {
    data: {
        current_month: {
            income: number;
            expense: number;
            period: string;
        };
        last_month: {
            income: number;
            expense: number;
            period: string;
        };
    };
    title?: string;
}

const DashboardMonthlyComparisonChart: React.FC<DashboardMonthlyComparisonChartProps> = ({ 
    data, 
    title = "Comparação Mensal" 
}) => {
    // Formatar dados para o gráfico
    const chartData = [
        {
            name: 'Mês Atual',
            value: Number(data.current_month.income) || 0,
            color: '#10B981'
        },
        {
            name: 'Mês Anterior',
            value: Number(data.last_month.income) || 0,
            color: '#10B981'
        }
    ];

    return (
        <SimpleBarChart 
            data={chartData}
            title={title}
        />
    );
};

export default DashboardMonthlyComparisonChart;
