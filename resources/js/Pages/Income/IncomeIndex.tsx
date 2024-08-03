import SimplePagination from "@/Components/SimplePagination";
import Income from "@/Interfaces/Income";
import PaginationData from "@/Interfaces/PaginationData";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import route from "ziggy-js";
import moment from "moment";
import NoTableData from "@/Components/NoTableData";
import Layout from "@/Layouts/Layout";

type parameters = {
    month?: string;
    term?: string;
    list?: string;
};

interface Props {
    auth: any;
    errors: any;
    success: any;
    incomes: PaginationData;
    months: Array<any>;
    queryParams: parameters;
    total: string;
    received: string;
}

const IncomeIndex: React.FC<Props> = ({
    auth,
    errors,
    success,
    incomes,
    months,
    queryParams,
    total,
    received,
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

        Inertia.get(route("income.index"), params, {
            replace: true,
            preserveState: true,
        });
    };

    const handleClick = (income: number) => {

        let params: parameters = query;

        Inertia.get(route("income.show", { id: income }), params);
    };

    const handleBg = (date: string, status: string) => {
        if (moment().isBefore(date, "day") && status === null) {
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
            title="Contas a Receber"
            button={true}
            href={route("income.create")}
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
                            <option value="receive">Exibir a Receber</option>
                            <option value="received">Exibir Recebidos</option>
                            <option value="partial">
                                Exibir Recebidos Parcial
                            </option>
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
                        total={incomes.total}
                        last_page={incomes.last_page}
                        current_page={incomes.current_page}
                        url={incomes.path}
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
                                                    Vencimento
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Código
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Cliente
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    V. a Receber
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    V. Recebido
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    F. de Pagamento
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Data
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Obs
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* Table body */}
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {incomes.data.length > 0 ? (
                                            incomes.data.map(
                                                (
                                                    income: Income,
                                                    index: any
                                                ) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    income.id
                                                                )
                                                            }
                                                            className={`${handleBg(
                                                                income.due_date,
                                                                income.status
                                                            )} cursor-pointer`}
                                                        >
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-bold text-gray-800">
                                                                    {moment(
                                                                        income.due_date
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {
                                                                        income
                                                                            .customer
                                                                            .cod
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    {
                                                                        income
                                                                            .customer
                                                                            .name
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium">
                                                                    {"R$ " +
                                                                        income.receive}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {income
                                                                        .transactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : income.transactions.map(
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
                                                                                        R${" "}
                                                                                        {
                                                                                            transaction.received
                                                                                        }
                                                                                    </p>
                                                                                );
                                                                            }
                                                                        )}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {income
                                                                        .transactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : income.transactions.map(
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
                                                                                        {
                                                                                            transaction
                                                                                                .payment_method
                                                                                                .name
                                                                                        }
                                                                                    </p>
                                                                                );
                                                                            }
                                                                        )}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {income
                                                                        .transactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : income.transactions.map(
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
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-medium text-left">
                                                                    {income
                                                                        .transactions
                                                                        .length ===
                                                                        0
                                                                        ? ""
                                                                        : income.transactions.map(
                                                                            (
                                                                                transaction,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <p
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="text-sm break-words"
                                                                                    >
                                                                                        {
                                                                                            transaction.obs
                                                                                        }
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
                                            <NoTableData colSpan={8} />
                                        )}
                                        <tr className="bg-yellow-300">
                                            <td
                                                colSpan={3}
                                                className="h-11 font-bold text-lg uppercase"
                                            >
                                                Total Referente ao Período
                                            </td>
                                            <td className="h-11 font-bold text-lg">
                                                {total && "R$ " + total}
                                            </td>
                                            <td
                                                colSpan={4}
                                                className="h-11 font-bold text-lg"
                                            >
                                                {received && "R$ " + received}
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

export default IncomeIndex;
