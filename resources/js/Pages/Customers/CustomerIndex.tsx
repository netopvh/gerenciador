import React, { useState } from "react";
import Customer from "@/Interfaces/Customer";
import PaginationData from "@/Interfaces/PaginationData";
import route from "ziggy-js";
import SimplePagination from "@/Components/SimplePagination";
import { Inertia } from "@inertiajs/inertia";
import NoTableData from "@/Components/NoTableData";
import Layout from "@/Layouts/Layout";

type searchParam = {
    search?: string;
};

interface Props {
    auth: any;
    errors: any;
    customers: PaginationData;
    queryParams: searchParam;
}

const CustomerIndex: React.FC<Props> = ({
    auth,
    errors,
    customers,
    queryParams,
}) => {
    const [query, setQuery] = useState({
        search: queryParams.search,
    });

    const filter = () => {
        let params: searchParam = query;

        if (params.search === "") {
            delete params.search;
        }

        Inertia.get(route("customer.index"), params, {
            replace: true,
            preserveState: true,
        });
    };

    const handleClick = (customer: number) => {
        Inertia.get(route("customer.show", { customer: customer }));
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Clientes"
            button={true}
            href={route("customer.create")}
            name="Novo"
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <section className="flex flex-col mb-4 lg:flex-row lg:justify-between">
                    <div className="flex flex-col m-2 mb-3 lg:flex lg:flex-row lg:mb-0">
                        <input
                            type="search"
                            name="search"
                            value={query.search}
                            onChange={(e) => {
                                setQuery({
                                    ...query,
                                    search: e.target.value,
                                });
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    filter();
                                }
                            }}
                            className="w-full uppercase h-11 border-gray-300 focus:border-indigo-300 lg:h-9 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={filter}
                            className="inline-flex items-center text-center px-4 h-11 mt-1 font-medium lg:ml-2 lg:mt-0 lg:font-bold lg:h-9 text-gray-700 bg-white rounded border border-gray-300 shadow-sm lg:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Pesquisar
                        </button>
                    </div>
                    <SimplePagination
                        total={customers.total}
                        last_page={customers.last_page}
                        current_page={customers.current_page}
                        url={customers.path}
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
                                                    Código
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Nome
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Email
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Contato
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    CPF / CNPJ
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* Table body */}
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {customers.data.length > 0 ? (
                                            customers.data.map(
                                                (
                                                    customer: Customer,
                                                    index: any
                                                ) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    customer.id
                                                                )
                                                            }
                                                            className="cursor-pointer hover:bg-gray-50"
                                                        >
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-bold text-gray-800">
                                                                    {
                                                                        customer.cod
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {
                                                                        customer.name
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    {customer.email ===
                                                                    ""
                                                                        ? "Não informado"
                                                                        : customer.email}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium">
                                                                    {customer.mobile ===
                                                                    ""
                                                                        ? "Não informado"
                                                                        : customer.mobile}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="font-medium text-left">
                                                                    {customer.cpfcnpj ===
                                                                    ""
                                                                        ? "Não informado"
                                                                        : customer.cpfcnpj}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <NoTableData colSpan={5} />
                                        )}
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

export default CustomerIndex;
