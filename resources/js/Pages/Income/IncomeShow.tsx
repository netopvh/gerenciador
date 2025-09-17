import Label from "@/Components/Label";
import NoTableData from "@/Components/NoTableData";
import Income from "@/Interfaces/Income";
import SelectOption from "@/Interfaces/SelectOption";
import Transaction from "@/Interfaces/Transaction";
import Layout from "@/Layouts/Layout";
import { XCircleIcon, PencilIcon, DownloadIcon, DocumentTextIcon, TrashIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import route from "ziggy-js";
import FormReceive from "./Modal/FormReceive";
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
            setValues(defaultValueState);
        }
    }, [success]);

    const handleSave = useCallback(() => {
        setIsLoading(true);
        Inertia.post(route("transaction.store"), values, {
            onFinish: () => setIsLoading(false),
        });
    }, [values]);

    const handleBack = useCallback(() => {
        let params: parameters = { ...query };
        
        // Limpar parâmetros vazios
        Object.keys(params).forEach(key => {
            if (params[key as keyof parameters] === "") {
                delete params[key as keyof parameters];
            }
        });

        Inertia.get(route('income.index', params));
    }, [query]);

    const handleCancel = useCallback(() => {
        setValues(defaultValueState);
        setModalOpen(false);
    }, []);

    const handleEdit = useCallback(() => {
        Inertia.get(route("income.edit", { id: income.id }));
    }, [income.id]);

    const handleReceipt = useCallback(() => {
        Inertia.post(route("receipt.show", { id: income.id, type: 'income' }), receiptValues);
    }, [income.id, receiptValues]);

    const handleTransactionRemove = useCallback((transaction: Transaction) => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        setIsLoading(true);
        Inertia.delete(route("transaction.destroy", { id: transaction.id }), {
            onFinish: () => setIsLoading(false),
        });
    }, []);

    const handleDelete = useCallback(() => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        setIsLoading(true);
        Inertia.delete(route("income.destroy", { id: income.id }), {
            onFinish: () => setIsLoading(false),
        });
    }, [income.id]);

    const handleModalChange = useCallback((
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
    }, [values]);

    // Memoizar dados formatados e cálculos
    const formattedData = useMemo(() => {
        const received = transactionReceived || 0;
        const total = parseFloat(income.receive.toString()) || 0;
        const pending = total - received;
        
        return {
            formattedReceive: formatCurrency(income.receive),
            formattedReceived: formatCurrency(received.toString()),
            formattedPending: formatCurrency(pending.toString()),
            statusText: income.transactions.length === 0 
                ? "EM ABERTO" 
                : income.status === "T" 
                    ? "PAGO TOTAL" 
                    : "PAGO PARCIAL",
            statusColor: income.transactions.length === 0 
                ? "text-red-600" 
                : income.status === "T" 
                    ? "text-green-600" 
                    : "text-yellow-600",
            isPaid: income.status === "T",
            isPartial: income.status === "P",
            isOpen: income.transactions.length === 0,
        };
    }, [income, transactionReceived]);

    // Memoizar transações formatadas
    const formattedTransactions = useMemo(() => {
        return income.transactions.map(transaction => ({
            ...transaction,
            formattedReceived: formatCurrency(transaction.received),
            formattedDate: moment(transaction.date_payment).format("DD/MM/YYYY")
        }));
    }, [income.transactions]);

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
                                        Contas a Receber
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
                                    onClick={() => setModalOpen(true)}
                                    disabled={isLoading || formattedData.isPaid}
                                >
                                    <DownloadIcon className="w-4 h-4 mr-2" />
                                    Baixar
                                </button>
                                
                                {formattedData.isPaid && (
                                    <button
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        type="button"
                                        onClick={handleReceipt}
                                        disabled={isLoading}
                                    >
                                        <DocumentTextIcon className="w-4 h-4 mr-2" />
                                        Recibo
                                    </button>
                                )}
                                
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
                        {/* Seção de Recibo */}
                        {formattedData.isPaid && !income.receipt && (
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h6 className="text-gray-700 text-sm font-semibold mb-4">
                                    Informações do Recibo
                                </h6>
                                <div className="max-w-2xl">
                                            <Label
                                                forInput="observations"
                                        value="Observações do Recibo"
                                                className="mb-2"
                                            />
                                    <textarea 
                                        name="observations" 
                                        value={receiptValues.observations} 
                                        onChange={(e) => {
                                                setReceiptValues({
                                                    ...receiptValues,
                                                    observations: e.target.value,
                                                });
                                        }} 
                                        className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                        placeholder="Digite observações para o recibo..."
                                    />
                                </div>
                            </div>
                        )}
                        {/* Informações do Lançamento */}
                        <div className="px-6 py-6">
                            <h6 className="text-gray-700 text-lg font-semibold mb-6">
                                Informações do Lançamento
                            </h6>
                            
                            {/* Grid de Informações */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="codigo"
                                            value="Código do Cliente"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                        />
                                    <p className="text-lg font-semibold text-gray-900">{income.customer.cod}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="cliente"
                                            value="Nome do Cliente"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                        />
                                    <p className="text-lg font-semibold text-gray-900">{income.customer.name}</p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="vencimento"
                                        value="Data de Vencimento"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">
                                        {moment(income.due_date).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label
                                        forInput="categoria"
                                            value="Centro de Custo"
                                        className="mb-2 text-sm font-medium text-gray-600"
                                        />
                                    <p className="text-lg font-semibold text-gray-900">{income.category.title}</p>
                                </div>
                            </div>

                            {/* Valores Financeiros */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                        <Label
                                        forInput="valor"
                                            value="Valor a Receber"
                                        className="mb-2 text-sm font-medium text-blue-600"
                                        />
                                    <p className="text-2xl font-bold text-blue-900">{formattedData.formattedReceive}</p>
                                </div>
                                
                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                        <Label
                                        forInput="recebido"
                                        value="Valor Recebido"
                                        className="mb-2 text-sm font-medium text-green-600"
                                    />
                                    <p className="text-2xl font-bold text-green-900">{formattedData.formattedReceived}</p>
                                </div>
                                
                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                        <Label
                                            forInput="pendente"
                                            value="Valor Pendente"
                                        className="mb-2 text-sm font-medium text-red-600"
                                    />
                                    <p className="text-2xl font-bold text-red-900">{formattedData.formattedPending}</p>
                                </div>
                            </div>
                        </div>
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

export default IncomeShow;
