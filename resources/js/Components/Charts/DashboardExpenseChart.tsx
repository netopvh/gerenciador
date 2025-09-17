import React from 'react';
import SimpleLineChart from './SimpleLineChart';

interface DashboardExpenseChartProps {
    data: Array<{
        date: string;
        total: number;
    }>;
    title?: string;
}

const DashboardExpenseChart: React.FC<DashboardExpenseChartProps> = ({ 
    data, 
    title = "Contas a Pagar por Dia" 
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
            color="#EF4444"
        />
    );
};

export default DashboardExpenseChart;
