import React, { useCallback, useMemo, useState } from "react";
import Layout from "@/Layouts/Layout";
import route from "ziggy-js";
import ReportLogo from "@/Components/ReportLogo";
import Assinatura from '@/Components/Assinatura'
import Income from "@/Interfaces/Income";
import Transaction from "@/Interfaces/Transaction";
import NoTableData from "@/Components/NoTableData";
import moment from "moment";
import Receipt from "@/Interfaces/Receipt";
import { ArrowLeftIcon, DocumentDownloadIcon, PrinterIcon } from "@heroicons/react/solid";
import { formatCurrency } from "@/utils/currency";

interface Props {
    auth: any;
    errors: any;
    income: Income;
    receipt: Receipt;
    transactionReceived: number;
    dateReceipt: string;
}

const ReceiptShow: React.FC<Props> = ({ auth, errors, income, receipt, transactionReceived, dateReceipt }) => {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const mascaraDoc = useCallback((valor: string) => {
        if (!valor) return '';
        if (valor.length > 11) {
            return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
        } else {
            return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
        }
    }, []);

    const handleBack = useCallback(() => {
        window.history.back();
    }, []);

    const handleGeneratePDF = useCallback(() => {
        setIsGeneratingPDF(true);
        
        // Gerar PDF via backend
        const pdfUrl = route('receipt.pdf', { id: income.id });
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `recibo-${income.customer.name}-${moment().format('YYYY-MM-DD')}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => setIsGeneratingPDF(false), 2000);
    }, [income.id, income.customer.name]);

    // Memoizar dados formatados
    const formattedData = useMemo(() => {
        const received = transactionReceived || 0;
        const total = parseFloat(income.receive.toString()) || 0;
        const pending = total - received;
        
        return {
            formattedReceive: formatCurrency(income.receive),
            formattedReceived: formatCurrency(received.toString()),
            formattedPending: formatCurrency(pending.toString()),
            formattedCpfCnpj: mascaraDoc(income.customer.cpfcnpj || ''),
            formattedDate: moment().format("DD/MM/YYYY"),
            formattedDueDate: moment(income.due_date).format("DD/MM/YYYY"),
        };
    }, [income, transactionReceived, mascaraDoc]);

    // Memoizar transações formatadas
    const formattedTransactions = useMemo(() => {
        return (income.transactions || []).map(transaction => ({
            ...transaction,
            formattedReceived: formatCurrency(transaction.received),
        }));
    }, [income.transactions]);

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Recibo de Pagamento"
            button={false}
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-4">
                {/* Header com Botões de Ação */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
                    <div className="flex items-center justify-between">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <button
                                onClick={handleBack}
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                                Voltar
                            </button>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">Recibo de Pagamento</span>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex items-center space-x-3">
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => {
                                    const receiptContent = document.getElementById('receipt-content');
                                    if (receiptContent) {
                                        const printWindow = window.open('', '_blank');
                                        if (printWindow) {
                                            printWindow.document.write(`
                                                <!DOCTYPE html>
                                                <html>
                                                <head>
                                                    <title>Recibo - ${income.customer.name}</title>
                                                    <style>
                                                        @page {
                                                            size: A4;
                                                            margin: 20mm;
                                                        }
                                                        body {
                                                            font-family: Arial, sans-serif;
                                                            font-size: 12px;
                                                            line-height: 1.4;
                                                            color: #000;
                                                            margin: 0;
                                                            padding: 0;
                                                        }
                                                        .receipt-container {
                                                            max-width: 100%;
                                                            margin: 0 auto;
                                                        }
                                                        .header {
                                                            display: flex;
                                                            justify-content: space-between;
                                                            margin-bottom: 20px;
                                                        }
                                                        .company-info {
                                                            text-align: right;
                                                        }
                                                        .title {
                                                            font-size: 18px;
                                                            font-weight: bold;
                                                            text-transform: uppercase;
                                                            margin-bottom: 10px;
                                                        }
                                                        .subtitle {
                                                            font-size: 14px;
                                                            font-weight: bold;
                                                            text-transform: uppercase;
                                                            margin-bottom: 5px;
                                                        }
                                                        .text {
                                                            font-size: 12px;
                                                            margin-bottom: 3px;
                                                        }
                                                        .text-bold {
                                                            font-weight: bold;
                                                        }
                                                        .text-uppercase {
                                                            text-transform: uppercase;
                                                        }
                                                        .divider {
                                                            border-top: 1px solid #000;
                                                            margin: 15px 0;
                                                        }
                                                        .customer-info {
                                                            margin: 15px 0;
                                                        }
                                                        .services-table {
                                                            width: 100%;
                                                            border-collapse: collapse;
                                                            margin: 15px 0;
                                                        }
                                                        .services-table th,
                                                        .services-table td {
                                                            border: 1px solid #000;
                                                            padding: 8px;
                                                            text-align: left;
                                                        }
                                                        .services-table th {
                                                            background-color: #f5f5f5;
                                                            font-weight: bold;
                                                        }
                                                        .services-table .text-right {
                                                            text-align: right;
                                                        }
                                                        .totals {
                                                            margin-top: 20px;
                                                            text-align: right;
                                                        }
                                                        .totals-row {
                                                            display: flex;
                                                            justify-content: space-between;
                                                            margin-bottom: 5px;
                                                            padding-bottom: 5px;
                                                            border-bottom: 1px solid #ccc;
                                                        }
                                                        .totals-row.final {
                                                            border-bottom: 2px solid #000;
                                                            font-weight: bold;
                                                            font-size: 14px;
                                                        }
                                                        .signatures {
                                                            display: flex;
                                                            justify-content: space-between;
                                                            margin-top: 40px;
                                                        }
                                                        .signature-box {
                                                            width: 45%;
                                                            text-align: center;
                                                        }
                                                        .signature-line {
                                                            border-bottom: 2px solid #000;
                                                            margin-bottom: 10px;
                                                            height: 40px;
                                                        }
                                                        .date {
                                                            text-align: center;
                                                            margin: 20px 0;
                                                            font-weight: bold;
                                                        }
                                                    </style>
                                                </head>
                                                <body>
                                                    <div class="receipt-container">
                                                        ${receiptContent.innerHTML}
                                                    </div>
                                                </body>
                                                </html>
                                            `);
                                            printWindow.document.close();
                                            printWindow.print();
                                            printWindow.close();
                                        }
                                    }
                                }}
                                title="Imprimir recibo"
                            >
                                <PrinterIcon className="w-4 h-4 mr-2" />
                                Imprimir
                            </button>
                            
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={handleGeneratePDF}
                                disabled={isGeneratingPDF}
                                title="Gerar PDF do recibo"
                            >
                                <DocumentDownloadIcon className="w-4 h-4 mr-2" />
                                {isGeneratingPDF ? 'Gerando...' : 'Gerar PDF'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full p-6 xl:col-span-12 bg-white">
                        <div id="receipt-content" className="px-4 mx-auto shadow-md">
                            {/* Começo de linha */}
                            <div className="flex justify-between">
                                <div className="relative w-1/5 bg-center px-1 py-1">
                                    <div className="flex-1 mx-auto w-full">
                                        <div className="mb-4">
                                            <div className="mb-4 md:mr-2 md:mb-0">
                                                <ReportLogo className="block w-48 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 mx-auto">
                                    <div className="mb-2">
                                        <p className="font-extrabold uppercase text-xl">anti-roubo monitoramento 24 horas</p>
                                    </div>
                                    <div className="mb-1">
                                        <p className="font-extrabold uppercase text-xs">B.J. FONTOURA DE SOUZA MONITORAMENTO E SERVIÇOS</p>
                                    </div>
                                    <div className="mb-1">
                                        <p className="font-extrabold uppercase text-xs">31.805.452/0001-74</p>
                                    </div>
                                    <div className="mb-1">
                                        <p className="font-extrabold text-xs">Rua Anízio Gorayeb, 1172</p>
                                    </div>
                                    <div className="mb-1">
                                        <p className="font-extrabold text-xs">São João Bosco, Porto Velho - RO</p>
                                    </div>
                                    <div className="mb-1">
                                        <p className="font-extrabold uppercase text-xs">CEP 76803-724</p>
                                    </div>
                                </div>
                            </div>
                            {/* Começo de linha */}
                            <div className="flex flex-row">
                                <div className="flex-1 mx-auto">
                                    <div className="mb-2 mt-1">
                                        <p className="font-medium uppercase text-md">SUA SEGURANÇA É A NOSSA PROFISSÃO</p>
                                    </div>
                                </div>
                            </div>
                            {/* Começo de linha */}
                            <div className="flex justify-between">
                                <div className="flex-1 mx-auto">
                                    <div className="mb-0">
                                        <p className="font-extrabold uppercase text-xl">Fatura {income.id}-{moment(income.due_date, "YYYY-MM-DD").year()}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="font-medium uppercase text-sm">MENSALIDADE DE {dateReceipt}</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border border-black" />
                            {/* Começo de linha */}
                            <div className="flex justify-between">
                                <div className="flex-1 mx-auto mt-2">
                                    <div className="mb-0">
                                        <p className="font-extrabold text-md">Cliente: {income.customer.name}</p>
                                    </div>
                                    <div className="mb-2 mt-2">
                                        <p className="font-medium text-md">CPF/CNPJ: {formattedData.formattedCpfCnpj}</p>
                                    </div>
                                    <div className="mb-2 mt-2">
                                        <div className="flex justify-between mb-2">
                                            <div className="font-medium text-md uppercase">{income.customer.address}, {income.customer.number}</div>
                                            <div className="flex items-center justify-center">
                                                <div className="flex-1">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <p className="ml-1">{income.customer.mobile}</p>
                                            </div>

                                        </div>
                                        <div className="flex justify-between">
                                            <div className="font-medium text-md uppercase">{income.customer.district}, PORTO VELHO - RO</div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 mb-1 text-xl font-extrabold">Informações Básicas</p>
                            <hr className="border border-black" />
                            {/* Começo de linha */}
                            <div className="flex justify-between mt-3">
                                <div className="flex-1 mx-auto">
                                    <div className="mb-2">
                                        <p className="font-semibold text-sm">Observações</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="font-medium uppercase text-sm">{receipt.observations}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 mb-1 text-xl font-extrabold">Serviços</p>
                            <hr className="border border-black" />
                            <table className="table-auto w-full mt-2">
                                <thead>
                                    <tr>
                                        <th className="p-2">
                                            <div className="text-left">
                                                Serviço
                                            </div>
                                        </th>
                                        <th className="p-2">Preço unitário</th>
                                        <th className="p-2">Quantidade</th>
                                        <th className="p-2">Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formattedTransactions.length > 0 ? (
                                        formattedTransactions.map(
                                            (
                                                transaction,
                                                index
                                            ) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left uppercase font-medium">{income.category.title}</div>
                                                        </td>
                                                        <td className="p-2 w-36">
                                                            <div className="text-right">{transaction.formattedReceived}</div>
                                                        </td>
                                                        <td className="p-2 w-36">
                                                            <div className="text-right">1</div>
                                                        </td>
                                                        <td className="p-2 w-36">
                                                            <div className="text-right">{transaction.formattedReceived}</div>
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
                            <div className="flex justify-end mt-6 mb-2">
                                <div className="w-1/2">
                                    <div className="flex justify-between border-b-2 border-gray-200 w-full">
                                        <div className="font-extrabold text-md border-b-2 border-black w-2/5">Subtotal</div>
                                        <div></div>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-gray-200 w-full mt-4">
                                        <div className="font-semibold text-sm">Serviços</div>
                                        <div className="font-semibold text-sm">{formattedData.formattedReceive}</div>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-gray-200 w-full mt-4">
                                        <div className="font-extrabold text-sm">Valor Pago</div>
                                        <div className="font-extrabold text-sm">{formattedData.formattedReceived}</div>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-black w-full mt-4">
                                        <div className="font-extrabold text-md">Valor Pendente</div>
                                        <div className="font-extrabold text-md">{formattedData.formattedPending}</div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 mb-1 text-xl font-extrabold">Meios de pagamento</p>
                            <hr className="border border-black" />
                            <div className="flex justify-between mt-3">
                                <div className="flex-1 mx-auto">
                                    <div className="mb-2">
                                        <p className="font-medium text-sm">Transferencia bancária, dinheiro ou pix.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center my-6">
                                <p className="font-extrabold text-sm">Porto Velho, {formattedData.formattedDate}</p>
                            </div>
                            <div className="flex justify-between my-8 mt-10">
                                <div className="flex justify-center w-1/2">
                                    <div className="flex justify-between">
                                        <div className="flex-1 mx-auto text-center">
                                            <div className="w-full flex items-center mt-7">
                                                <Assinatura className="mx-auto w-28" />
                                            </div>
                                            <div className="mb-1 border-b-2 border-black"></div>
                                            <div className="mb-1">
                                                <p className="font-extrabold uppercase text-sm">ANTI-ROUBO MONITORAMENTO 24 HORAS</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/2">
                                    <div className="flex justify-between w-4/5">
                                        <div className="flex-1 mx-auto text-center">
                                            <div className="mt-24"></div>
                                            <div className="mb-1 border-b-2 border-black"></div>
                                            <div className="mb-1">
                                                <p className="font-extrabold uppercase text-sm">{income.customer.name}</p>
                                            </div>
                                        </div>
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

export default ReceiptShow;
