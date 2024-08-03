import React from "react";
import Layout from "@/Layouts/Layout";
import route from "ziggy-js";
import ReportLogo from "@/Components/ReportLogo";
import Assinatura from '@/Components/Assinatura'
import Income from "@/Interfaces/Income";
import Transaction from "@/Interfaces/Transaction";
import NoTableData from "@/Components/NoTableData";
import moment from "moment";
import Receipt from "@/Interfaces/Receipt";

interface Props {
    auth: any;
    errors: any;
    income: Income;
    receipt: Receipt;
    transactionReceived: number;
    dateReceipt: string;
}

const ReceiptShow: React.FC<Props> = ({ auth, errors, income, receipt, transactionReceived, dateReceipt }) => {

    const mascaraDoc = (valor: string) => {
        if (valor.length > 11) {
            return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
        } else {
            return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
        }
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Exibir Recibo"
            button={true}
            name="Voltar"
            href={route("income.show", { id: income.id })}
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-4">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full p-6 xl:col-span-12 bg-white">
                        <div className="px-4 mx-auto shadow-md">
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
                                        <p className="font-medium text-md">CPF/CNPJ: {mascaraDoc(income.customer.cpfcnpj)}</p>
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
                                                            <div className="text-left uppercase font-medium">{income.category.title}</div>
                                                        </td>
                                                        <td className="p-2 w-36">
                                                            <div className="text-right">R$ {transaction.received}</div>
                                                        </td>
                                                        <td className="p-2 w-36">
                                                            <div className="text-right">1</div>
                                                        </td>
                                                        <td className="p-2 w-36">
                                                            <div className="text-right">R$ {transaction.received}</div>
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
                                        <div className="font-semibold text-sm">R$ {income.receive}</div>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-gray-200 w-full mt-4">
                                        <div className="font-extrabold text-sm">Valor Pago</div>
                                        <div className="font-extrabold text-sm">R$ {transactionReceived}</div>
                                    </div>
                                    <div className="flex justify-between border-b-2 border-black w-full mt-4">
                                        <div className="font-extrabold text-md">Valor Pendente</div>
                                        <div className="font-extrabold text-md">R$ {income.receive -
                                            transactionReceived}</div>
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
                                <p className="font-extrabold text-sm">Porto Velho, {moment().format("DD/MM/YYYY")}</p>
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
