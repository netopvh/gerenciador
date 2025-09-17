import NoTableData from "@/Components/NoTableData";
import SimplePagination from "@/Components/SimplePagination";
import Expense from "@/Interfaces/Expense";
import PaginationData from "@/Interfaces/PaginationData";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import React, { useState, useCallback, useMemo } from "react";
import route from "ziggy-js";
import { formatCurrency } from "@/utils/currency";
import QuickDateFilters from "@/Components/QuickDateFilters";

type parameters = {
    month?: string;
    term?: string;
    list?: string;
    start_date?: string;
    end_date?: string;
};

interface Props {
    auth: any;
    errors: any;
    success: any;
    expenses: PaginationData;
    total: string;
    paid: string;
    months: Array<any>;
    queryParams: parameters;
}

const ExpenseIndex: React.FC<Props> = ({
    auth,
    errors,
    success,
    expenses,
    total,
    paid,
    months,
    queryParams,
}) => {
    const [query, setQuery] = useState({
        month: queryParams.month || "",
        term: queryParams.term || "",
        list: queryParams.list || "",
        start_date: queryParams.start_date || "",
        end_date: queryParams.end_date || "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [filterType, setFilterType] = useState<'month' | 'period'>('month');

    const filter = useCallback(() => {
        setIsLoading(true);
        let params: parameters = { ...query };

        // Limpar parâmetros vazios
        Object.keys(params).forEach(key => {
            if (params[key as keyof parameters] === "") {
                delete params[key as keyof parameters];
            }
        });

        // Se estiver usando filtro por período, remover month
        if (filterType === 'period') {
            delete params.month;
        } else {
            delete params.start_date;
            delete params.end_date;
        }

        Inertia.get(route("expense.index"), params, {
            replace: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    }, [query, filterType]);

    const handleClick = useCallback((expense: number) => {
        let params: parameters = { ...query };
        
        // Limpar parâmetros vazios
        Object.keys(params).forEach(key => {
            if (params[key as keyof parameters] === "") {
                delete params[key as keyof parameters];
            }
        });

        Inertia.get(route("expense.show", { id: expense }), params);
    }, [query]);

    const handleBg = useCallback((date: string, status: string) => {
        if (moment().isBefore(date, "day") && status === "O") {
            return "bg-green-300";
        } else if (status === "P") {
            return "bg-yellow-600 bg-opacity-70";
        } else if (status === "T") {
            return "bg-blue-400";
        } else {
            return "bg-red-300";
        }
    }, []);

    // Memoizar dados formatados para melhor performance
    const formattedExpenses = useMemo(() => {
        return expenses.data.map((expense: Expense) => ({
            ...expense,
            formattedPayable: formatCurrency(expense.payable),
            formattedTransactions: expense.transactions.map(transaction => ({
                ...transaction,
                formattedReceived: formatCurrency(transaction.received),
                formattedDate: moment(transaction.date_payment).format("DD/MM/YYYY")
            }))
        }));
    }, [expenses.data]);

    // Verificar se há filtros ativos
    const hasActiveFilters = useMemo(() => {
        return query.month || query.term || query.list || query.start_date || query.end_date;
    }, [query]);

    // Função para aplicar filtro rápido de data
    const handleQuickDateFilter = useCallback((startDate: string, endDate: string) => {
        setQuery(prev => ({
            ...prev,
            start_date: startDate,
            end_date: endDate,
            month: "" // Limpar filtro de mês quando usar período
        }));
        setFilterType('period');
    }, []);

    return (
        <Layout
            auth={auth}
            errors={errors}
            success={success}
            title="Contas a Pagar"
            button={true}
            href={route("expense.create")}
            name="Novo"
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                {/* Filtros Melhorados */}
                <section className="p-4 mb-4 bg-white shadow rounded-lg">
                    <div className="flex flex-col space-y-4">
                        {/* Tipo de Filtro */}
                        <div className="flex items-center space-x-4">
                            <label className="text-sm font-medium text-gray-700">Filtrar por:</label>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setFilterType('month')}
                                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                        filterType === 'month'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Mês/Ano
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilterType('period')}
                                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                        filterType === 'period'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Período
                                </button>
                            </div>
                        </div>

                        {/* Filtros Rápidos de Data */}
                        <QuickDateFilters
                            onDateRangeSelect={handleQuickDateFilter}
                            currentStartDate={query.start_date}
                            currentEndDate={query.end_date}
                        />

                        {/* Filtros de Data */}
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            {filterType === 'month' ? (
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mês/Ano
                                    </label>
                                    <select
                                        name="month"
                                        value={query.month}
                                        onChange={(e) => {
                                            setQuery({
                                                ...query,
                                                month: e.currentTarget.value,
                                            });
                                        }}
                                        className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Todos os meses</option>
                                        {months.length > 0 &&
                                            months.map((month, key) => (
                                                <option key={key} value={month.value}>
                                                    {month.label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Data Inicial
                                        </label>
                                        <input
                                            type="date"
                                            value={query.start_date}
                                            onChange={(e) => {
                                                setQuery({
                                                    ...query,
                                                    start_date: e.currentTarget.value,
                                                });
                                            }}
                                            className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Data Final
                                        </label>
                                        <input
                                            type="date"
                                            value={query.end_date}
                                            onChange={(e) => {
                                                setQuery({
                                                    ...query,
                                                    end_date: e.currentTarget.value,
                                                });
                                            }}
                                            className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Filtro de Status */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    name="list"
                                    value={query.list}
                                    onChange={(e) => {
                                        setQuery({
                                            ...query,
                                            list: e.currentTarget.value,
                                        });
                                    }}
                                    className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Todos</option>
                                    <option value="pay">A Pagar</option>
                                    <option value="paid">Pagas</option>
                                    <option value="partial">Parcialmente Pagas</option>
                                </select>
                            </div>

                            {/* Busca */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pesquisar
                                </label>
                                <input
                                    type="text"
                                    value={query.term}
                                    onChange={(e) => {
                                        setQuery({
                                            ...query,
                                            term: e.currentTarget.value,
                                        });
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            filter();
                                        }
                                    }}
                                    className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Fornecedor, documento..."
                                />
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={filter}
                                    disabled={isLoading}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Filtrando...
                                        </>
                                    ) : (
                                        'Filtrar'
                                    )}
                                </button>
                                
                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery({
                                                month: "",
                                                term: "",
                                                list: "",
                                                start_date: "",
                                                end_date: "",
                                            });
                                            setFilterType('month');
                                        }}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Limpar Filtros
                                    </button>
                                )}
                            </div>

                            {/* Indicador de Filtros Ativos */}
                            {hasActiveFilters && (
                                <div className="flex items-center text-sm text-blue-600">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                    </svg>
                                    Filtros ativos
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                
                {/* Paginação */}
                <section className="flex justify-end mb-4">
                    <SimplePagination
                        total={expenses.total}
                        last_page={expenses.last_page}
                        current_page={expenses.current_page}
                        url={expenses.path}
                        params={query}
                    />
                </section>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="p-1">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    # Identificador
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Vencimento
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Fornecedor
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Qtd Parcelas
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    V. Pagar
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    V. Pago
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Data
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {formattedExpenses.length > 0 ? (
                                            formattedExpenses.map(
                                                (expense, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    expense.id
                                                                )
                                                            }
                                                            className={`${handleBg(
                                                                expense.due_date,
                                                                expense.status
                                                            )} cursor-pointer hover:bg-opacity-80 transition-opacity`}
                                                        >
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {expense.doc ===
                                                                        ""
                                                                        ? "S/N"
                                                                        : expense.doc}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-bold text-gray-800">
                                                                    {moment(
                                                                        expense.due_date
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {
                                                                        expense
                                                                            .supplier
                                                                            .name
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    {
                                                                        expense.parcel
                                                                    }{" "}
                                                                    de{" "}
                                                                    {
                                                                        expense.qtd
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium">
                                                                    {expense.formattedPayable}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {expense
                                                                        .formattedTransactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : expense.formattedTransactions.map(
                                                                            (
                                                                                transaction,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <p
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="text-sm"
                                                                                    >
                                                                                        {transaction.formattedReceived}
                                                                                    </p>
                                                                                );
                                                                            }
                                                                        )}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {expense
                                                                        .formattedTransactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : expense.formattedTransactions.map(
                                                                            (
                                                                                transaction,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <p
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="text-sm"
                                                                                    >
                                                                                        {transaction.formattedDate}
                                                                                    </p>
                                                                                );
                                                                            }
                                                                        )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <NoTableData colSpan={7} />
                                        )}
                                        <tr className="bg-yellow-300">
                                            <td
                                                colSpan={4}
                                                className="h-11 font-bold text-lg uppercase"
                                            >
                                                Total Referente ao Período
                                            </td>
                                            <td className="h-11 font-bold text-lg">
                                                {total && formatCurrency(total)}
                                            </td>
                                            <td
                                                colSpan={2}
                                                className="h-11 font-bold text-lg"
                                            >
                                                {paid && formatCurrency(paid)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ExpenseIndex;
