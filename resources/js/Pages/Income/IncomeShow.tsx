import Label from "@/Components/Label";
import NoTableData from "@/Components/NoTableData";
import Income from "@/Interfaces/Income";
import SelectOption from "@/Interfaces/SelectOption";
import Transaction from "@/Interfaces/Transaction";
import Layout from "@/Layouts/Layout";
import { XCircleIcon } from "@heroicons/react/solid";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import React, { useState, useEffect } from "react";
import route from "ziggy-js";
import FormReceive from "./Modal/FormReceive";

type parameters = {
    month?: string;
    term?: string;
    list?: string;
};

interface Props {
    auth: any;
    errors: any;
    error?: string;
    success: any;
    income: Income;
    paymentMethods: Array<SelectOption>;
    transactionReceived: number;
    queryParams: parameters;
}

const IncomeShow: React.FC<Props> = ({
    auth,
    errors,
    error,
    success,
    income,
    paymentMethods,
    transactionReceived,
    queryParams,
}) => {
    const defaultValueState = {
        income_id: income.id,
        type: "I",
        date_payment: "",
        payment_method_id: "",
        received: "",
        obs: "",
    };

    const receiptValueState = {
        observations: ""
    }

    const [values, setValues] = useState(defaultValueState);
    const [receiptValues, setReceiptValues] = useState(receiptValueState);
    const [modalOpen, setModalOpen] = useState(false);

    const [query, setQuery] = useState({
        month: queryParams.month,
        term: queryParams.term,
        list: queryParams.list
    });

    useEffect(() => {
        if (success != null) {
            setModalOpen(false);
            setValues(defaultValueState);
        }
    }, [success]);

    const handleSave = () => {
        Inertia.post(route("transaction.store"), values);
    };

    const handleBack = () => {

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

        Inertia.get(route('income.index', params));
    }

    const handleCancel = () => {
        setValues(defaultValueState);
        setModalOpen(false);
    };

    const handleEdit = () => {
        Inertia.get(route("income.edit", { id: income.id }));
    };

    const handleReceipt = () => {
        Inertia.post(route("receipt.show", { id: income.id, type: 'income' }), receiptValues);
    };

    const handleTransactionRemove = (transaction: Transaction) => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        Inertia.delete(route("transaction.destroy", { id: transaction.id }));
    };

    const handleDelete = () => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        Inertia.delete(route("income.destroy", { id: income.id }));
    };

    const handleModalChange = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectOption
    ) => {
        if ("value" in event) {
            setValues({
                ...values,
                ["payment_method_id"]: event.value,
            });
        } else {
            setValues({
                ...values,
                [event.target.name]: event.target.value,
            });
        }
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            success={success}
            title="Contas a Receber"
            button={false}
            action={true}
            onClick={handleBack}
            name="Voltar"
        >
            <FormReceive
                fields={values}
                error={error}
                paymentMethods={paymentMethods}
                isOpen={modalOpen}
                onSave={handleSave}
                onCancel={handleCancel}
                onFormChange={handleModalChange}
            />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="flex items-center justify-start mb-4">
                                <button
                                    className={`bg-blue-500 text-white hover:bg-blue-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    onClick={handleEdit}
                                >
                                    Editar
                                </button>
                                <button
                                    className={`bg-green-500 text-white hover:bg-green-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Baixar
                                </button>
                                {income.status == "T" && (
                                    <button
                                        className={`bg-indigo-500 text-white hover:bg-indigo-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                        type="button"
                                        onClick={handleReceipt}
                                    >
                                        Recibo
                                    </button>
                                )}
                                <button
                                    className={`bg-red-500 text-white hover:bg-red-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                        {income.status == "T" && !income.receipt && (
                            <div className="flex-auto px-4 lg:px-10 py-4 pt-0">
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Informações do Recibo
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full px-4">
                                        <div className="relative w-full mb-3">
                                            <Label
                                                forInput="observations"
                                                value="Informações básicas"
                                                className="mb-2"
                                            />
                                            <textarea name="observations" value={receiptValues.observations} onChange={(e) => {
                                                setReceiptValues({
                                                    ...receiptValues,
                                                    observations: e.target.value,
                                                });
                                            }} className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm "></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Informações do Lançamento
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Código do Cliente"
                                            className="mb-2"
                                        />
                                        <p>{income.customer.cod}</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Nome do Cliente"
                                            className="mb-2"
                                        />
                                        <p>{income.customer.name}</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Vecimento"
                                            className="mb-2"
                                        />
                                        <p>
                                            {moment(income.due_date).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Centro de Custo"
                                            className="mb-2"
                                        />
                                        <p>{income.category.title}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Valor a Receber"
                                            className="mb-2"
                                        />
                                        <p>R$ {income.receive}</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Status"
                                            className="mb-2"
                                        />
                                        <p>
                                            {income.transactions.length == 0
                                                ? "EM ABERTO"
                                                : income.status == "T"
                                                    ? "PAGO TOTAL"
                                                    : "PAGO PARCIAL"}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="pendente"
                                            value="Valor Pendente"
                                            className="mb-2"
                                        />
                                        <p>
                                            R${" "}
                                            {income.receive -
                                                transactionReceived}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-4">
                                <div className="w-full lg:w-full border border-gray-300 shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">
                                                            Data do Pagamento
                                                        </div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">
                                                            Valor
                                                        </div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">
                                                            Forma de Pagamento
                                                        </div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">
                                                            Observação
                                                        </div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">
                                                            Ação
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {income.transactions.length >
                                                    0 ? (
                                                    income.transactions.map(
                                                        (
                                                            transaction: Transaction,
                                                            index
                                                        ) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left font-bold text-gray-800">
                                                                            {moment(
                                                                                transaction.date_payment
                                                                            ).format(
                                                                                "DD/MM/YYYY"
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left font-medium text-gray-800">
                                                                            {"R$ " +
                                                                                transaction.received}
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left font-medium text-gray-800">
                                                                            {
                                                                                transaction
                                                                                    .payment_method
                                                                                    .name
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left font-medium text-gray-800">
                                                                            {
                                                                                transaction.obs
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left font-medium text-gray-800">
                                                                            <button
                                                                                className="p-1 border border-red-500 bg-red-500 rounded-md"
                                                                                onClick={() =>
                                                                                    handleTransactionRemove(
                                                                                        transaction
                                                                                    )
                                                                                }
                                                                            >
                                                                                <XCircleIcon className="h-3 w-3 text-white" />
                                                                            </button>
                                                                        </div>
                                                                    </td>
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
                </div>
            </div>
        </Layout>
    );
};

export default IncomeShow;
