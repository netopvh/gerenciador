import React from 'react';
import SimpleLineChart from './SimpleLineChart';

interface DashboardIncomeChartProps {
    data: Array<{
        date: string;
        total: number;
    }>;
    title?: string;
}

const DashboardIncomeChart: React.FC<DashboardIncomeChartProps> = ({ 
    data, 
    title = "Contas a Receber por Dia" 
}) => {
    // Formatar dados para o gráfico
    const chartData = data.map(item => ({
        label: new Date(item.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
        }),
        value: Number(item.total) || 0
    }));

    return (
        <SimpleLineChart 
            data={chartData}
            title={title}
            color="#10B981"
        />
    );
};

export default DashboardIncomeChart;
