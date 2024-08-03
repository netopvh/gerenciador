import Label from "@/Components/Label";
import ReactSelect from "react-select";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import route from "ziggy-js";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Expense from "@/Interfaces/Expense";
import Layout from "@/Layouts/Layout";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    auth: any;
    errors: any;
    categories: Array<any>;
    suppliers: Array<any>;
    expense: Expense;
}

const ExpenseEdit: React.FC<Props> = ({
    auth,
    errors,
    categories,
    suppliers,
    expense,
}) => {
    const initialState = {
        supplier_id: expense.supplier_id,
        category_id: expense.category_id,
        doc: expense.doc,
        due_date: expense.due_date,
        qtd: expense.qtd,
        payable: expense.payable,
    };

    const selectedSup = expense.supplier_id - 1;
    const selectedCat = expense.category_id - 1;

    const [values, setValues] = React.useState(initialState);
    const [processing, setProcessing] = React.useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(selectedSup);
    const [selectedCategory, setSelectedCategory] = useState(selectedCat);

    React.useEffect(() => {
        if (errors != null) {
            setProcessing(false);
        }
    }, [errors]);

    const submit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setProcessing(true);
        Inertia.put(route("expense.update", { id: expense.id }), values, {
            onSuccess: () => {
                setProcessing(false);
            },
        });
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
            title="Contas a Pagar"
            button={true}
            name="Voltar"
            href={route("expense.show", { id: expense.id })}
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
                                            value="Fornecedor"
                                        />

                                        <ReactSelect
                                            classNamePrefix="select"
                                            className="block shadow-sm uppercase"
                                            options={suppliers}
                                            name="supplier_id"
                                            defaultValue={
                                                suppliers[selectedSupplier]
                                            }
                                            placeholder="Selecione o Fornecedor"
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    ["supplier_id"]: e.value,
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
                                            classNamePrefix="select"
                                            className="block shadow-sm uppercase"
                                            options={categories}
                                            name="category_id"
                                            placeholder="Selecione"
                                            defaultValue={
                                                categories[selectedCategory]
                                            }
                                            onChange={(e) => {
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
                                            className="mt-1 block w-full"
                                            autoComplete="due_date"
                                            errors={errors.due_date}
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="doc"
                                            className="mb-2"
                                            value="Documento"
                                        />

                                        <Input
                                            type="text"
                                            name="doc"
                                            value={values.doc}
                                            className="mt-1 block w-full"
                                            errors={errors.doc}
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5 px-3">
                                        <Label
                                            forInput="payable"
                                            className="mb-2"
                                            value="Valor a Pagar"
                                        />

                                        <Input
                                            type="text"
                                            name="payable"
                                            value={values.payable}
                                            className="mt-1 block w-full"
                                            errors={errors.payable}
                                            handleChange={onHandleChange}
                                        />
                                        {/**
                                                 * <InputCurrency
                                                    name="payable"
                                                    value={values.payable}
                                                    onChange={onHandleChange}
                                                    errors={errors.payable}
                                                    className="mt-1"
                                                />
                                                 */}
                                    </div>
                                </div>
                                <div className="flex items-center justify-start mt-4">
                                    <Button
                                        type="submit"
                                        processing={processing}
                                    >
                                        Alterar
                                    </Button>

                                    <InertiaLink
                                        className="bg-red-500 ml-2 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        href={route("expense.show", {
                                            id: expense.id,
                                        })}
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

export default ExpenseEdit;
