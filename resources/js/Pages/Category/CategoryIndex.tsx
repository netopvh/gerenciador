import NoTableData from "@/Components/NoTableData";
import SimplePagination from "@/Components/SimplePagination";
import Category from "@/Interfaces/Category";
import PaginationData from "@/Interfaces/PaginationData";
import Layout from "@/Layouts/Layout";
import * as React from "react";
import route from "ziggy-js";

interface Props {
    auth: any;
    errors: any;
    categories: PaginationData;
}

const CategoryIndex: React.FC<Props> = ({ auth, errors, categories }) => {
    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Centro de Custos"
            button={true}
            href={route("category.create")}
            name="Novo"
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <section className="flex flex-col mb-4 lg:flex-row lg:justify-between">
                    <SimplePagination
                        total={categories.total}
                        last_page={categories.last_page}
                        current_page={categories.current_page}
                        url={categories.path}
                    />
                </section>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="p-1">
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    {/* Table header */}
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    ID
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Nome
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Tipo
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    Ação
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* Table body */}
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {categories.data.length > 0 ? (
                                            categories.data.map(
                                                (
                                                    category: Category,
                                                    index: any
                                                ) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-bold text-gray-800">
                                                                    {
                                                                        category.id
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {
                                                                        category.title
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    {category.type ==
                                                                    "E"
                                                                        ? "CONTAS A PAGAR"
                                                                        : "CONTAS A RECEBER"}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap"></td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <NoTableData colSpan={4} />
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

export default CategoryIndex;
