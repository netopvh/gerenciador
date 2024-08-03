import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import route from "ziggy-js";
import { Inertia } from "@inertiajs/inertia";
import PaginationData from "@/Interfaces/PaginationData";
import NoTableData from "@/Components/NoTableData";
import SimplePagination from "@/Components/SimplePagination";
import { PencilAltIcon, EyeIcon } from "@heroicons/react/solid";
import Receipt from "@/Interfaces/Receipt";

type parameters = {
    term?: string;
};

interface Props {
    auth: any;
    errors: any;
    queryParams: parameters;
    receipts: PaginationData;
}

const ReceiptIndex: React.FC<Props> = ({
    auth,
    errors,
    queryParams,
    receipts,
}) => {

    const [query, setQuery] = useState({
        term: queryParams.term,
    });

    const filter = () => {
        let params: parameters = query;

        if (params.term === "") {
            delete params.term;
        }

        Inertia.get(route("receipt.index"), params, {
            replace: true,
            preserveState: true,
        });
    };

    const handleShow = (receipt: Receipt) => {
        Inertia.get(route("receipt.show", { id: receipt.id }));
    };

    const handleEdit = (receipt: Receipt) => {
        Inertia.get(route("income.show", { id: receipt.id }));
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Recibos"
            button={true}
            href={route("receipt.create")}
            name="Novo"
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <section className="flex flex-col p-4 mb-4 space-y-4 bg-white shadow sm:rounded lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:p2">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
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
                        <button
                            type="button"
                            onClick={filter}
                            className="inline-flex items-center px-4 h-11 font-medium text-gray-700 bg-white rounded border border-gray-300 shadow-md lg:h-9 lg:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Filtrar
                        </button>
                    </div>
                </section>
                <section className="flex flex-col mb-4 lg:flex-row lg:justify-between">
                    <SimplePagination
                        total={receipts.total}
                        last_page={receipts.last_page}
                        current_page={receipts.current_page}
                        url={receipts.path}
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
                                                    Cliente
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Descrição
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Tipo
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Valor
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Ação
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {receipts.data.length > 0 ? (
                                            receipts.data.map(
                                                (receipt: Receipt, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className={`cursor-pointer`}
                                                        >
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {
                                                                        receipt.observations
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left uppercase font-medium text-gray-800">
                                                                    {
                                                                        receipt.observations
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {
                                                                        receipt.observations
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    R$ {
                                                                        receipt.observations
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    <button
                                                                        className="p-1 border border-blue-500 bg-blue-500 rounded-md"
                                                                        onClick={() =>
                                                                            handleShow(
                                                                                receipt
                                                                            )
                                                                        }
                                                                    >
                                                                        <EyeIcon className="h-3 w-3 text-white" />
                                                                    </button>
                                                                    <button
                                                                        className="p-1 border border-blue-500 bg-blue-500 rounded-md ml-2"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                receipt
                                                                            )
                                                                        }
                                                                    >
                                                                        <PencilAltIcon className="h-3 w-3 text-white" />
                                                                    </button>
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

export default ReceiptIndex;
