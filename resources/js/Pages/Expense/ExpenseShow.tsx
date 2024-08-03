import Label from "@/Components/Label";
import NoTableData from "@/Components/NoTableData";
import Expense from "@/Interfaces/Expense";
import SelectOption from "@/Interfaces/SelectOption";
import Transaction from "@/Interfaces/Transaction";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import route from "ziggy-js";
import ModalParcels from "./Modal/ModalParcels";
import ModalPayment from "./Modal/ModalPayment";
import { XCircleIcon } from "@heroicons/react/solid";

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
    expense: Expense;
    parcels: Array<Expense>;
    paymentMethods: Array<SelectOption>;
    transactionPaid: number;
    queryParams: parameters;
}

const ExpenseShow: React.FC<Props> = ({
    auth,
    errors,
    error,
    success,
    expense,
    parcels,
    paymentMethods,
    transactionPaid,
    queryParams,
}) => {
    const defaultValueState = {
        due_date: expense.due_date,
        qtd: expense.qtd,
    };

    const defaultPaymentState = {
        expense_id: expense.id,
        type: "E",
        date_payment: "",
        payment_method_id: "",
        received: "",
        obs: "",
    };

    const [values, setValues] = useState(defaultValueState);
    const [payment, setPayment] = useState(defaultPaymentState);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPayOpen, setModalPayOpen] = useState(false);

    const [query, setQuery] = useState({
        month: queryParams.month,
        term: queryParams.term,
        list: queryParams.list
    });

    useEffect(() => {
        if (success != null) {
            setModalOpen(false);
            setModalPayOpen(false);
            setPayment(defaultPaymentState);
        }
    }, [success]);

    const handleEdit = () => {
        Inertia.get(route("expense.edit", { id: expense.id }));
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

        Inertia.get(route('expense.index', params));
    }

    const handleTransactionRemove = (transaction: Transaction) => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        Inertia.delete(route("transaction.destroy", { id: transaction.id }));
    };

    const handleSave = () => {
        Inertia.post(route("expense.parcels", { id: expense.id }), values, {
            onSuccess: () => {
                setModalOpen(false);
                setValues(defaultValueState);
            },
        });
    };

    const handleCancel = () => {
        setValues(defaultValueState);
        setModalOpen(false);
    };

    const handleModalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handlePaySave = () => {
        Inertia.post(route("transaction.store"), payment);
    };

    const handlePayCancel = () => {
        setPayment(defaultPaymentState);
        setModalPayOpen(false);
    };

    const handleModalPayChange = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectOption
    ) => {
        if ("value" in event) {
            setPayment({
                ...payment,
                ["payment_method_id"]: event.value,
            });
        } else {
            setPayment({
                ...payment,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleDelete = () => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        Inertia.delete(route("expense.destroy", { id: expense.id }));
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            success={success}
            title="Contas a Pagar"
            button={false}
            action={true}
            onClick={handleBack}
            name="Voltar"
        >
            <Fragment>
                <ModalParcels
                    fields={values}
                    isOpen={modalOpen}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onFormChange={handleModalChange}
                />
            </Fragment>
            <Fragment>
                <ModalPayment
                    fields={payment}
                    error={error}
                    pendingValue={expense.payable}
                    paymentMethods={paymentMethods}
                    isOpen={modalPayOpen}
                    onSave={handlePaySave}
                    onCancel={handlePayCancel}
                    onFormChange={handleModalPayChange}
                />
            </Fragment>
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
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
                                    onClick={(e) => setModalPayOpen(true)}
                                >
                                    Baixar
                                </button>
                                <button
                                    className={`bg-yellow-700 text-white hover:bg-green-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Parcelas
                                </button>
                                <button
                                    className={`bg-red-500 text-white hover:bg-red-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Informações do Lançamento
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="doc"
                                            value="Identificador"
                                            className="mb-2"
                                        />
                                        <p>
                                            {expense.doc == ""
                                                ? "S/N"
                                                : expense.doc}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Nome do Cliente"
                                            className="mb-2"
                                        />
                                        <p>{expense.supplier.name}</p>
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
                                            {moment(expense.due_date).format(
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
                                        <p>{expense.category.title}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="parcel"
                                            value="Parcela"
                                            className="mb-2"
                                        />
                                        <p>
                                            {expense.parcel +
                                                " de " +
                                                expense.qtd}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="Cliente"
                                            value="Valor a Pagar"
                                            className="mb-2"
                                        />
                                        <p>R$ {expense.payable}</p>
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
                                            {expense.transactions.length == 0
                                                ? "EM ABERTO"
                                                : expense.status == "T"
                                                    ? "PAGO TOTAL"
                                                    : "PAGO PARCIAL"}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/5 px-4">
                                    <div className="relative w-full mb-3">
                                        <Label
                                            forInput="saldo"
                                            value="Saldo Devedor"
                                            className="mb-2"
                                        />
                                        <p>
                                            R${" "}
                                            {expense.payable - transactionPaid}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {parcels && (
                                <div className="flex flex-wrap mt-4">
                                    <p className="font-sans text-sm p-1">
                                        Demais Parcelas
                                    </p>
                                    <div className="w-full lg:w-full border border-gray-300 shadow-sm">
                                        <div className="overflow-x-auto">
                                            <table className="table-auto w-full">
                                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                    <tr>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Parcela
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Valor a Pagar
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Vencimento
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Status
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {parcels.length > 0 ? (
                                                        parcels.map(
                                                            (
                                                                parcel: Expense,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-left font-bold text-gray-800">
                                                                                {parcel.parcel +
                                                                                    " de " +
                                                                                    parcel.qtd}
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-left font-medium text-gray-800">
                                                                                {"R$ " +
                                                                                    parcel.payable}
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-left font-medium text-gray-800">
                                                                                {moment(
                                                                                    parcel.due_date
                                                                                ).format(
                                                                                    "DD/MM/YYYY"
                                                                                )}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <NoTableData
                                                            colSpan={3}
                                                        />
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-wrap mt-4">
                                <p className="font-sans text-sm p-1">
                                    Registro de Pagamentos
                                </p>
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
                                                {expense.transactions.length >
                                                    0 ? (
                                                    expense.transactions.map(
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
                                                                            R${" "}
                                                                            {
                                                                                transaction.received
                                                                            }
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

export default ExpenseShow;
