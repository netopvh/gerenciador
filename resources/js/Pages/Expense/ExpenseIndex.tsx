import NoTableData from "@/Components/NoTableData";
import SimplePagination from "@/Components/SimplePagination";
import Expense from "@/Interfaces/Expense";
import PaginationData from "@/Interfaces/PaginationData";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import React, { useState } from "react";
import route from "ziggy-js";

type parameters = {
    month?: string;
    term?: string;
    list?: string;
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
        month: queryParams.month,
        term: queryParams.term,
        list: queryParams.list,
    });

    const filter = () => {
        let params: parameters = query;

        if (params.month === "") {
            delete params.month;
        }
        if (params.term === "") {
            delete params.term;
        }
        if (params.list === "") {
            delete params.list;
        }

        Inertia.get(route("expense.index"), params, {
            replace: true,
            preserveState: true,
        });
    };

    const handleClick = (expense: number) => {

        let params: parameters = query;

        Inertia.get(route("expense.show", { id: expense }), params);
    };

    const handleBg = (date: string, status: string) => {
        if (moment().isBefore(date, "day") && status === "O") {
            return "bg-green-300";
        } else if (status === "P") {
            return "bg-yellow-600 bg-opacity-70";
        } else if (status === "T") {
            return "bg-blue-400";
        } else {
            return "bg-red-300";
        }
    };

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
                <section className="flex flex-col p-4 mb-4 space-y-4 bg-white shadow sm:rounded lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:p2">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <select
                            name="month"
                            value={query.month}
                            onChange={(e) => {
                                setQuery({
                                    ...query,
                                    month: e.currentTarget.value,
                                });
                            }}
                            className="pr-10 pl-3 w-full h-11 rounded border-gray-300 shadow-sm lg:h-9 lg:text-sm sm:w-44 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {months.length > 0 &&
                                months.map((month, key) => {
                                    return (
                                        <option key={key} value={month.value}>
                                            {month.label}
                                        </option>
                                    );
                                })}
                        </select>
                        <button
                            type="button"
                            onClick={filter}
                            className="inline-flex items-center px-4 h-11 font-medium text-gray-700 bg-white rounded border border-gray-300 shadow-md lg:h-9 lg:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Filtrar
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="search"
                            className="text-sm font-medium text-gray-700 sr-only"
                        >
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
                            className="w-full uppercase h-11 rounded border-gray-300 shadow-sm lg:h-9 lg:text-sm lg:w-64 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Pesquisar por"
                        />
                    </div>
                </section>
                <section className="flex flex-col mb-4 lg:flex-row lg:justify-between">
                    <div className="inline-flex justify-center items-center space-x-2 mb-3 lg:flex lg:mb-0">
                        <select
                            aria-label="Action"
                            name="list"
                            value={query.list}
                            onChange={(e) => {
                                setQuery({
                                    ...query,
                                    list: e.currentTarget.value,
                                });
                            }}
                            className="pr-10 pl-3 w-full h-11 rounded border-gray-300 shadow-sm lg:h-9 lg:text-sm sm:w-48 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option>Exibir todos</option>
                            <option value="paid">Exibir Pagos</option>
                            <option value="partial">
                                Exibir Pagos Parcial
                            </option>
                            <option value="pay">Exibir a pagar</option>
                        </select>

                        <button
                            type="button"
                            onClick={filter}
                            className="inline-flex items-center px-4 h-11 font-medium text-gray-700 bg-white rounded border border-gray-300 shadow-sm lg:h-9 lg:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Aplicar
                        </button>
                    </div>
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
                                        {expenses.data.length > 0 ? (
                                            expenses.data.map(
                                                (expense: Expense, index) => {
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
                                                            )} cursor-pointer`}
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
                                                                    R${" "}
                                                                    {
                                                                        expense.payable
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {expense
                                                                        .transactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : expense.transactions.map(
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
                                                                                        {"R$ " +
                                                                                            transaction.received}
                                                                                    </p>
                                                                                );
                                                                            }
                                                                        )}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {expense
                                                                        .transactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : expense.transactions.map(
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
                                                                                        {moment(
                                                                                            transaction.date_payment
                                                                                        ).format(
                                                                                            "DD/MM/YYYY"
                                                                                        )}
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
                                                {total && "R$ " + total}
                                            </td>
                                            <td
                                                colSpan={2}
                                                className="h-11 font-bold text-lg"
                                            >
                                                {paid && "R$ " + paid}
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
