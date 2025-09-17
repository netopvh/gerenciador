import React from "react";
import LatestCustomers from "@/Components/LatestCustomers";
import Customer from "@/Interfaces/Customer";
import Layout from "@/Layouts/Layout";
import BasicPeriodFilter from "@/Components/BasicPeriodFilter";
import DashboardIncomeChart from "@/Components/Charts/DashboardIncomeChart";
import DashboardExpenseChart from "@/Components/Charts/DashboardExpenseChart";
import DashboardMonthlyComparisonChart from "@/Components/Charts/DashboardMonthlyComparisonChart";
import DashboardIncomeExpensePieChart from "@/Components/Charts/DashboardIncomeExpensePieChart";
import { Inertia } from "@inertiajs/inertia";
import { 
    CurrencyDollarIcon, 
    CreditCardIcon, 
    UsersIcon, 
    ChartBarIcon
} from "@heroicons/react/solid";

interface Props {
    auth: any;
    customers: Array<Customer>;
    totalCustomers: number;
    totalIncome: number;
    totalExpenses: number;
    incomeLabel: Array<any>;
    filters: {
        start_date: string;
        end_date: string;
    };
    chartData: {
        income: Array<{
            date: string;
            total: number;
        }>;
        expense: Array<{
            date: string;
            total: number;
        }>;
        monthly_comparison: {
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
    };
}

const Dashboard: React.FC<Props> = ({
    auth,
    customers,
    totalCustomers,
    totalIncome,
    totalExpenses,
    incomeLabel,
    filters,
    chartData,
}) => {
    // Função para formatar moeda
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    };

    // Função para lidar com mudanças de período
    const handlePeriodChange = (startDate: string, endDate: string) => {
        Inertia.get('/dashboard', {
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <Layout title="Painel Principal" button={false} auth={auth}>
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                {/* Filtro de Período */}
                <BasicPeriodFilter
                    startDate={filters.start_date}
                    endDate={filters.end_date}
                    onDateChange={handlePeriodChange}
                />

                {/* Cards Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Contas a Receber</p>
                                <p className="text-2xl font-bold text-green-600 mb-2">
                                    {formatCurrency(totalIncome)}
                                </p>
                            </div>
                            <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Contas a Pagar</p>
                                <p className="text-2xl font-bold text-red-600 mb-2">
                                    {formatCurrency(totalExpenses)}
                                </p>
                            </div>
                            <CreditCardIcon className="w-8 h-8 text-red-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Saldo</p>
                                <p className={`text-2xl font-bold mb-2 ${
                                    (totalIncome - totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {formatCurrency(totalIncome - totalExpenses)}
                                </p>
                            </div>
                            <ChartBarIcon className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total de Clientes</p>
                                <p className="text-2xl font-bold text-blue-600 mb-2">
                                    {totalCustomers}
                                </p>
                            </div>
                            <UsersIcon className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo Financeiro</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total a Receber:</span>
                                <span className="font-semibold text-green-600">{formatCurrency(totalIncome)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total a Pagar:</span>
                                <span className="font-semibold text-red-600">{formatCurrency(totalExpenses)}</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between items-center">
                                <span className="text-gray-800 font-medium">Saldo Líquido:</span>
                                <span className={`font-bold text-lg ${
                                    (totalIncome - totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {formatCurrency(totalIncome - totalExpenses)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total de Clientes:</span>
                                <span className="font-semibold text-blue-600">{totalCustomers}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Período:</span>
                                <span className="font-semibold text-gray-800">
                                    {new Date(filters.start_date).toLocaleDateString('pt-BR')} - {new Date(filters.end_date).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-semibold text-green-600">Ativo</span>
                            </div>
                        </div>
                    </div>
                </div>

                       {/* Gráficos */}
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                           <DashboardIncomeChart data={chartData.income} />
                           <DashboardExpenseChart data={chartData.expense} />
                       </div>

                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                           <DashboardIncomeExpensePieChart 
                               totalIncome={totalIncome} 
                               totalExpenses={totalExpenses} 
                           />
                           <DashboardMonthlyComparisonChart data={chartData.monthly_comparison} />
                       </div>

                {/* Últimos Clientes */}
                <div className="grid grid-cols-12 gap-6 mt-6">
                    <LatestCustomers customers={customers} />
                </div>
            </div>
        </Layout>
    );
};
export default Dashboard;
