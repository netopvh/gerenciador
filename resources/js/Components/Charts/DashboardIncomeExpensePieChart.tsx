import React from 'react';
import SimplePieChart from './SimplePieChart';
import { formatCurrency } from '@/utils/rechartsConfig';

interface DashboardIncomeExpensePieChartProps {
    totalIncome: number;
    totalExpenses: number;
    title?: string;
}

const DashboardIncomeExpensePieChart: React.FC<DashboardIncomeExpensePieChartProps> = ({ 
    totalIncome, 
    totalExpenses, 
    title = "Distribuição Financeira" 
}) => {
    const total = totalIncome + totalExpenses;
    
    if (total === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <p>Nenhum dado financeiro disponível</p>
                    </div>
                </div>
            </div>
        );
    }

    // Dados para o gráfico de pizza
    const chartData = [
        {
            name: 'Receitas',
            value: Number(totalIncome) || 0,
            color: '#10B981'
        },
        {
            name: 'Despesas',
            value: Number(totalExpenses) || 0,
            color: '#EF4444'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            
            <div className="flex flex-col items-center gap-6">
                <div className="flex-shrink-0">
                    <SimplePieChart data={chartData} size={200} />
                </div>
                
                <div className="w-full max-w-sm">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">
                                {formatCurrency(totalIncome)}
                            </div>
                            <div className="text-xs text-gray-600">Receitas</div>
                        </div>
                        
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-xl font-bold text-red-600">
                                {formatCurrency(totalExpenses)}
                            </div>
                            <div className="text-xs text-gray-600">Despesas</div>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 text-center">
                        <div className="text-lg font-semibold">
                            Saldo: 
                            <span className={`ml-2 ${
                                (totalIncome - totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {formatCurrency(totalIncome - totalExpenses)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardIncomeExpensePieChart;
