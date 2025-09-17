import Label from "@/Components/Label";
import NoTableData from "@/Components/NoTableData";
import Expense from "@/Interfaces/Expense";
import SelectOption from "@/Interfaces/SelectOption";
import Transaction from "@/Interfaces/Transaction";
import Layout from "@/Layouts/Layout";
import { XCircleIcon, PencilIcon, DownloadIcon, DocumentTextIcon, TrashIcon, ArrowLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import React, { Fragment, useEffect, useState, useCallback, useMemo } from "react";
import route from "ziggy-js";
import ModalParcels from "./Modal/ModalParcels";
import ModalPayment from "./Modal/ModalPayment";
import { formatCurrency } from "@/utils/currency";

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
    const [isLoading, setIsLoading] = useState(false);

    const [query, setQuery] = useState({
        month: queryParams.month || "",
        term: queryParams.term || "",
        list: queryParams.list || "",
        start_date: queryParams.start_date || "",
        end_date: queryParams.end_date || "",
    });

    useEffect(() => {
        if (success != null) {
            setModalOpen(false);
            setModalPayOpen(false);
            setPayment(defaultPaymentState);
        }
    }, [success]);

    const handleEdit = useCallback(() => {
        Inertia.get(route("expense.edit", { id: expense.id }));
    }, [expense.id]);

    const handleBack = useCallback(() => {
        let params: parameters = { ...query };
        
        // Limpar parâmetros vazios
        Object.keys(params).forEach(key => {
            if (params[key as keyof parameters] === "") {
                delete params[key as keyof parameters];
            }
        });

        Inertia.get(route('expense.index', params));
    }, [query]);

    const handleTransactionRemove = useCallback((transaction: Transaction) => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        setIsLoading(true);
        Inertia.delete(route("transaction.destroy", { id: transaction.id }), {
            onFinish: () => setIsLoading(false),
        });
    }, []);

    const handleSave = useCallback(() => {
        setIsLoading(true);
        Inertia.post(route("expense.parcels", { id: expense.id }), values, {
            onSuccess: () => {
                setModalOpen(false);
                setValues(defaultValueState);
            },
            onFinish: () => setIsLoading(false),
        });
    }, [expense.id, values]);

    const handleCancel = useCallback(() => {
        setValues(defaultValueState);
        setModalOpen(false);
    }, []);

    const handleModalChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }, [values]);

    const handlePaySave = useCallback(() => {
        setIsLoading(true);
        Inertia.post(route("transaction.store"), payment, {
            onFinish: () => setIsLoading(false),
        });
    }, [payment]);

    const handlePayCancel = useCallback(() => {
        setPayment(defaultPaymentState);
        setModalPayOpen(false);
    }, []);

    const handleModalPayChange = useCallback((
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
    }, [payment]);

    const handleDelete = useCallback(() => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        setIsLoading(true);
        Inertia.delete(route("expense.destroy", { id: expense.id }), {
            onFinish: () => setIsLoading(false),
        });
    }, [expense.id]);

    // Memoizar dados formatados e cálculos
    const formattedData = useMemo(() => {
        const paid = transactionPaid || 0;
        const total = parseFloat(expense.payable.toString()) || 0;
        const pending = total - paid;
        
        return {
            formattedPayable: formatCurrency(expense.payable),
            formattedPaid: formatCurrency(paid.toString()),
            formattedPending: formatCurrency(pending.toString()),
            statusText: (expense.transactions || []).length === 0 
                ? "EM ABERTO" 
                : expense.status === "T" 
                    ? "PAGO TOTAL" 
                    : "PAGO PARCIAL",
            statusColor: (expense.transactions || []).length === 0 
                ? "text-red-600" 
                : expense.status === "T" 
                    ? "text-green-600" 
                    : "text-yellow-600",
            isPaid: expense.status === "T",
            isPartial: expense.status === "P",
            isOpen: (expense.transactions || []).length === 0,
        };
    }, [expense, transactionPaid]);

    // Memoizar transações formatadas
    const formattedTransactions = useMemo(() => {
        return (expense.transactions || []).map(transaction => ({
            ...transaction,
            formattedReceived: formatCurrency(transaction.received),
            formattedDate: moment(transaction.date_payment).format("DD/MM/YYYY")
        }));
    }, [expense.transactions]);

    // Memoizar parcelas formatadas
    const formattedParcels = useMemo(() => {
        return parcels?.map(parcel => ({
            ...parcel,
            formattedPayable: formatCurrency(parcel.payable),
            formattedDate: moment(parcel.due_date).format("DD/MM/YYYY")
        })) || [];
    }, [parcels]);

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
                        {/* Header com Breadcrumb e Ações */}
                        <div className="bg-white border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                {/* Breadcrumb */}
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                                        Contas a Pagar
                                    </button>
                                    <span>/</span>
                                    <span className="text-gray-900 font-medium">Detalhes</span>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        formattedData.isPaid 
                                            ? 'bg-green-100 text-green-800' 
                                            : formattedData.isPartial 
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                    }`}>
                                        {formattedData.statusText}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="bg-white px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <button
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    onClick={handleEdit}
                                    disabled={isLoading}
                                >
                                    <PencilIcon className="w-4 h-4 mr-2" />
                                    Editar
                                </button>
                                
                                <button
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    onClick={() => setModalPayOpen(true)}
                                    disabled={isLoading || formattedData.isPaid}
                                >
                                    <DownloadIcon className="w-4 h-4 mr-2" />
                                    Baixar
                                </button>
                                
                                <button
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    disabled={isLoading}
                                >
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Parcelas
                                </button>
                                
                                <button
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                >
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    Remover
                                </button>
                            </div>
                        </div>
                        {/* Informações do Lançamento */}
                        <div className="px-6 py-6">
                            <h6 className="text-gray-700 text-lg font-semibold mb-6">
                                Informações do Lançamento
                            </h6>
                            
                            {/* Grid de Informações */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                            forInput="doc"
                                            value="Identificador"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">
                                        {expense.doc === "" ? "S/N" : expense.doc}
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="supplier"
                                        value="Fornecedor"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">{expense.supplier.name}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="vencimento"
                                        value="Data de Vencimento"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">
                                        {moment(expense.due_date).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="categoria"
                                            value="Centro de Custo"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                        />
                                    <p className="text-lg font-semibold text-gray-900">{expense.category.title}</p>
                                </div>
                            </div>

                            {/* Informações de Parcela e Valores */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                        <Label
                                            forInput="parcel"
                                            value="Parcela"
                                        className="mb-2 text-sm font-medium text-blue-600"
                                    />
                                    <p className="text-lg font-semibold text-blue-900">
                                        {expense.parcel} de {expense.qtd}
                                    </p>
                                </div>
                                
                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                        <Label
                                        forInput="valor"
                                            value="Valor a Pagar"
                                        className="mb-2 text-sm font-medium text-red-600"
                                        />
                                    <p className="text-2xl font-bold text-red-900">{formattedData.formattedPayable}</p>
                                </div>
                                
                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                        <Label
                                        forInput="pago"
                                        value="Valor Pago"
                                        className="mb-2 text-sm font-medium text-green-600"
                                    />
                                    <p className="text-2xl font-bold text-green-900">{formattedData.formattedPaid}</p>
                                </div>
                                
                                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                        <Label
                                        forInput="pendente"
                                            value="Saldo Devedor"
                                        className="mb-2 text-sm font-medium text-orange-600"
                                    />
                                    <p className="text-2xl font-bold text-orange-900">{formattedData.formattedPending}</p>
                                </div>
                            </div>
                        </div>
                        {/* Seção de Parcelas */}
                        {parcels && formattedParcels.length > 0 && (
                            <div className="px-6 py-6 border-t border-gray-200">
                                <h6 className="text-gray-700 text-lg font-semibold mb-4">
                                        Demais Parcelas
                                </h6>
                                
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                        <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                    <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Parcela
                                                        </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Valor a Pagar
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Vencimento
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {formattedParcels.map((parcel, index) => (
                                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {parcel.parcel} de {parcel.qtd}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-semibold text-red-600">
                                                                {parcel.formattedPayable}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {parcel.formattedDate}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                (parcel.transactions || []).length === 0 
                                                                    ? 'bg-red-100 text-red-800' 
                                                                    : parcel.status === "T" 
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {(parcel.transactions || []).length === 0 
                                                                    ? "EM ABERTO" 
                                                                    : parcel.status === "T" 
                                                                        ? "PAGO TOTAL" 
                                                                        : "PAGO PARCIAL"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        {/* Tabela de Transações */}
                        <div className="px-6 py-6 border-t border-gray-200">
                            <h6 className="text-gray-700 text-lg font-semibold mb-4">
                                Histórico de Pagamentos
                            </h6>
                            
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Data do Pagamento
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Valor
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Forma de Pagamento
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Observação
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {formattedTransactions.length > 0 ? (
                                                formattedTransactions.map((transaction, index) => (
                                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {transaction.formattedDate}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-semibold text-green-600">
                                                                {transaction.formattedReceived}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {transaction.payment_method.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                                {transaction.obs || '-'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button
                                                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                                onClick={() => handleTransactionRemove(transaction)}
                                                                disabled={isLoading}
                                                                title="Remover pagamento"
                                                            >
                                                                <XCircleIcon className="h-4 w-4 mr-1" />
                                                                Remover
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-12 text-center">
                                                        <div className="text-gray-500">
                                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum pagamento registrado</h3>
                                                            <p className="mt-1 text-sm text-gray-500">Esta conta ainda não possui pagamentos.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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
