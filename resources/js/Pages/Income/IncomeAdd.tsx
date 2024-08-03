import Button from "@/Components/Button";
import Header from "@/Components/Header";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import ReactSelect, { SingleValue } from "react-select";
import React, { useEffect, useState } from "react";
import route from "ziggy-js";
import InputCurrency from "@/Components/InputCurrency";
import Layout from "@/Layouts/Layout";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    auth: any;
    errors: any;
    categories: Array<any>;
    customers: Array<any>;
}

const IncomeAdd: React.FC<Props> = ({
    auth,
    errors,
    categories,
    customers,
}) => {
    const [values, setValues] = React.useState({
        customer_id: "",
        category_id: "",
        due_date: "",
        parcels: "",
        receive: "",
    });
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (errors != null) {
            setProcessing(false);
        }
    }, [errors]);

    const submit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setProcessing(true);
        Inertia.post(route("income.store", values));
    };

    const onHandleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setValues({
            ...values,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Contas a Receber"
            button={true}
            name="Voltar"
            href={route("income.index")}
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 md:col-span-12 sm:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="p-3">
                            <form
                                onSubmit={submit}
                                className="w-full max-w-full"
                            >
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="cod"
                                            className="mb-3"
                                            value="Código / Nome do Cliente"
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
                                                setValues({
                                                    ...values,
                                                    ["customer_id"]: e.value,
                                                });
                                            }}
                                        />
                                    </div>

                                    <div className="w-full md:w-2/6 px-3">
                                        <Label
                                            forInput="cod"
                                            className="mb-3"
                                            value="Centro de Custo"
                                        />

                                        <ReactSelect
                                            className="block shadow-sm uppercase"
                                            options={categories}
                                            name="category_id"
                                            placeholder="Selecione"
                                            aria-errormessage={
                                                errors.category_id
                                            }
                                            onChange={(e) => {
                                                // console.log(e.value);
                                                setValues({
                                                    ...values,
                                                    ["category_id"]: e.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="w-full md:w-2/12 px-3">
                                        <Label
                                            forInput="name"
                                            className="mb-2"
                                            value="Vencimento"
                                        />

                                        <Input
                                            type="date"
                                            name="due_date"
                                            value={values.due_date}
                                            className="mt-1 block w-full uppercase"
                                            autoComplete="due_date"
                                            errors={errors.due_date}
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="name"
                                            className="mb-2"
                                            value="Parcelas"
                                        />

                                        <Input
                                            type="number"
                                            name="parcels"
                                            value={values.parcels}
                                            className="mt-1 block w-full"
                                            errors={errors.parcels}
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5 px-3">
                                        <Label
                                            forInput="name"
                                            className="mb-2"
                                            value="Valor a Receber"
                                        />

                                        <InputCurrency
                                            name="receive"
                                            value={values.receive}
                                            className="mt-1"
                                            onChange={onHandleChange}
                                            errors={errors.receive}
                                        />
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
                                        href={route("income.index")}
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

export default IncomeAdd;
