import Customer from "@/Interfaces/Customer";
import React from "react";

interface Props {
    customers: Array<Customer>;
}

const LatestCustomers: React.FC<Props> = ({ customers }) => {
    return (
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                    Últimos Clientes Cadastrados
                </h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
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
                                        CPF/CNPJ
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm divide-y divide-gray-100">
                            {customers.length > 0 &&
                                customers.map((customer: Customer, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-gray-800">
                                                    {customer.name}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">
                                                    {customer.email === ""
                                                        ? "Não informado"
                                                        : customer.email}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium">
                                                    {customer.mobile === ""
                                                        ? "Não informado"
                                                        : customer.mobile}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-medium text-left">
                                                    {customer.cpfcnpj === ""
                                                        ? "Não informado"
                                                        : customer.cpfcnpj}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LatestCustomers;
