import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import route from "ziggy-js";
import { PlusCircleIcon } from "@heroicons/react/solid";

interface Props {
    auth: any;
    errors: any;
    customers: Array<any>;
}

const ReceiptCreate: React.FC<Props> = ({ auth, errors, customers }) => {
    const [state, setState] = useState({
        customer_id: "",
        receipt_date: "",
        observations: "",
        payment_methods: "",
    });
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setProcessing(false);
    }, [errors]);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            ...state,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setProcessing(true);
        Inertia.post(route("receipt.store", state));
    };

    const handleRow = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // var tbl = document.getElementById("tblProducts") as HTMLTableElement;
        // var x = tbl.tBodies[0];
        // let node = x.rows[0].cloneNode(true);
        // x.appendChild(node);

        var table = document.getElementById("tblProducts") as HTMLTableElement;
        var body = table.getElementsByTagName('tbody')[0];

        var row = body.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = "NEW CELL1";
        cell2.innerHTML = "NEW CELL2";
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Criar Novo Recibo"
            button={true}
            name="Voltar"
            href={route("receipt.index")}
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="p-3">
                            <form
                                onSubmit={submit}
                                className="w-full max-w-full"
                            >
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-4/5 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="cod"
                                            value="Cliente"
                                            className="mb-2"
                                        />

                                        <ReactSelect
                                            className="block shadow-sm uppercase"
                                            options={customers}
                                            name="cod"
                                            placeholder="Selecione o Cliente"
                                            aria-errormessage={
                                                errors.customer_id
                                            }
                                            onChange={(e) => {
                                                setState({
                                                    ...state,
                                                    ["customer_id"]: e.value,
                                                });
                                            }}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/5 px-3">
                                        <Label
                                            forInput="receipt_date"
                                            value="Data"
                                            className="mb-1"
                                        />

                                        <Input
                                            type="date"
                                            name="receipt_date"
                                            value={state.receipt_date}
                                            className="mt-1 block w-full uppercase"
                                            autoComplete="name"
                                            errors={errors.receipt_date}
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="observations"
                                            value="Observações"
                                            className="mb-2"
                                        />

                                        <textarea name="observations" className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full" value={state.observations} onChange={onHandleChange}></textarea>

                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="payment_methods"
                                            value="Formas de Pagamento"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="text"
                                            name="payment_methods"
                                            value={state.payment_methods}
                                            className="mt-1 block w-full uppercase"
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <table className="table-auto w-full" id="tblProducts">
                                            <thead>
                                                <tr>
                                                    <th className="p-2">
                                                        <div className="text-left">
                                                            Serviço
                                                        </div>
                                                    </th>
                                                    <th className="p-2 w-36">Preço unitário</th>
                                                    <th className="p-2 w-36">Quantidade</th>
                                                    <th className="p-2 w-36">Total</th>
                                                    <th className="w-14"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="p-2">
                                                        <Input
                                                            type="text"
                                                            name="receipt_date"
                                                            value={state.receipt_date}
                                                            className="mt-1 block w-full uppercase"
                                                            autoComplete="name"
                                                            errors={errors.receipt_date}
                                                            handleChange={onHandleChange}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="text"
                                                            name="receipt_date"
                                                            value={state.receipt_date}
                                                            className="mt-1 block w-full uppercase"
                                                            autoComplete="name"
                                                            errors={errors.receipt_date}
                                                            handleChange={onHandleChange}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="text"
                                                            name="receipt_date"
                                                            value={state.receipt_date}
                                                            className="mt-1 block w-full uppercase"
                                                            autoComplete="name"
                                                            errors={errors.receipt_date}
                                                            handleChange={onHandleChange}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="text"
                                                            name="receipt_date"
                                                            value={state.receipt_date}
                                                            className="mt-1 block w-full uppercase"
                                                            autoComplete="name"
                                                            errors={errors.receipt_date}
                                                            handleChange={onHandleChange}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">
                                                            <button
                                                                type="button"
                                                                className="p-1 border border-blue-500 bg-blue-500 rounded-md ml-2"
                                                                onClick={handleRow}
                                                            >
                                                                <PlusCircleIcon className="h-3 w-3 text-white" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex items-center justify-start mt-4">
                                    <Button
                                        className="ml-0"
                                        processing={processing}
                                    >
                                        Cadastrar
                                    </Button>

                                    <InertiaLink
                                        className="bg-red-500 ml-2 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        href={route("customer.index")}
                                    >
                                        Cancelar
                                    </InertiaLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ReceiptCreate;
