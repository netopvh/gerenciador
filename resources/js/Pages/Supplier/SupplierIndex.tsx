import Supplier from "@/Interfaces/Supplier";
import NoTableData from "@/Components/NoTableData";
import SimplePagination from "@/Components/SimplePagination";
import PaginationData from "@/Interfaces/PaginationData";
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect, useState } from "react";
import route from "ziggy-js";
import ModalSupplier from "./Modal/ModalSupplier";
import { PencilAltIcon } from "@heroicons/react/solid";
import Layout from "@/Layouts/Layout";

type searchParam = {
    search?: string;
};

interface Props {
    auth: any;
    errors: any;
    success: any;
    suppliers: PaginationData;
    queryParams: searchParam;
}

const SupplierIndex: React.FC<Props> = ({
    auth,
    errors,
    success,
    suppliers,
    queryParams,
}) => {
    const formInitialState = {
        id: 0,
        name: "",
        cpf_cnpj: "",
        email: "",
        mobile: "",
        address: "",
        number: "",
        district: "",
        complement: "",
    };

    const [processing, setProcessing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [values, setValues] = useState(formInitialState);
    const [query, setQuery] = useState({
        search: queryParams.search,
    });

    useEffect(() => {
        if (errors != null) {
            setProcessing(false);
        }
    }, [errors]);

    const filter = () => {
        let params: searchParam = query;

        if (params.search === "") {
            delete params.search;
        }

        Inertia.get(route("supplier.index"), params, {
            replace: true,
            preserveState: true,
        });
    };

    const handleCreate = () => {
        setModalOpen(true);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setValues(formInitialState);
        setEditMode(false);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleEdit = (supplier: Supplier) => {
        setValues(supplier);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleSave = () => {
        if (editMode) {
            console.log(values);
            setProcessing(true);
            Inertia.put(route("supplier.update", { id: values.id }), values, {
                onSuccess: (e) => {
                    setModalOpen(false);
                    setValues(formInitialState);
                    setProcessing(false);
                },
            });
        } else {
            setProcessing(true);
            Inertia.post(route("supplier.store"), values, {
                onSuccess: (e) => {
                    setModalOpen(false);
                    setValues(formInitialState);
                    setProcessing(false);
                },
            });
        }
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            success={success}
            title="Fornecedores"
            button={false}
            action={true}
            onClick={handleCreate}
            name="Novo"
        >
            <ModalSupplier
                fields={values}
                isOpen={modalOpen}
                errors={errors}
                processing={processing}
                editMode={editMode}
                onFormChange={handleFormChange}
                onCancel={handleCancel}
                onSave={handleSave}
            />
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
                            className="w-full h-11 uppercase border-gray-300 focus:border-indigo-300 lg:h-9 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                        total={suppliers.total}
                        last_page={suppliers.last_page}
                        current_page={suppliers.current_page}
                        url={suppliers.path}
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
                                                    Nome
                                                </div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">
                                                    CPF / CNPJ
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
                                                    Ação
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {suppliers.data.length < 1 ? (
                                            <NoTableData colSpan={5} />
                                        ) : (
                                            suppliers.data.map(
                                                (supplier: Supplier, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-bold text-gray-800">
                                                                    {
                                                                        supplier.name
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-gray-800">
                                                                    {supplier.cpf_cnpj ===
                                                                    ""
                                                                        ? "Não informado"
                                                                        : supplier.cpf_cnpj}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    {supplier.email ===
                                                                    ""
                                                                        ? "Não informado"
                                                                        : supplier.email}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium">
                                                                    {supplier.mobile ===
                                                                    ""
                                                                        ? "Não informado"
                                                                        : supplier.mobile}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">
                                                                    <button
                                                                        className="p-1 border border-blue-500 bg-blue-500 rounded-md"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                supplier
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

export default SupplierIndex;
