import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputMask from "@/Components/InputMask";
import Label from "@/Components/Label";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import route from "ziggy-js";

interface Props {
    auth: any;
    errors: any;
}

const CustomerNew: React.FC<Props> = ({ auth, errors }) => {
    const [state, setState] = useState({
        cod: "",
        name: "",
        email: "",
        mobile: "",
        cpfcnpj: "",
        address: "",
        number: "",
        district: "",
    });
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setProcessing(false);
    }, [errors]);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setProcessing(true);
        Inertia.post(route("customer.store", state));
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Clientes"
            button={true}
            name="Voltar"
            href={route("customer.index")}
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-9 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="p-3">
                            <form
                                onSubmit={submit}
                                className="w-full max-w-full"
                            >
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="cod"
                                            value="Código"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="text"
                                            name="cod"
                                            value={state.cod}
                                            className="mt-1 block w-full uppercase"
                                            autoComplete="cod"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />
                                    </div>

                                    <div className="w-full md:w-3/4 px-3">
                                        <Label
                                            forInput="name"
                                            value="Nome / Razão Social"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="text"
                                            name="name"
                                            value={state.name}
                                            className="mt-1 block w-full uppercase"
                                            autoComplete="name"
                                            errors={errors.name}
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="email"
                                            value="E-mail"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="email"
                                            name="email"
                                            value={state.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            handleChange={onHandleChange}
                                            errors={errors.email}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-3">
                                        <Label
                                            forInput="mobile"
                                            value="Telefone"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="text"
                                            name="mobile"
                                            value={state.mobile}
                                            className="mt-1 block w-full"
                                            autoComplete="mobile"
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3">
                                        <Label
                                            forInput="cpfcnpj"
                                            value="CNPJ"
                                            className="mb-2"
                                        />
                                        <InputMask
                                            name="cpfcnpj"
                                            className="block w-full"
                                            value={state.cpfcnpj}
                                            mask="99.999.999/9999-99"
                                            onChange={onHandleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="address"
                                            value="Endereço"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="text"
                                            name="address"
                                            value={state.address}
                                            className="mt-1 block w-full uppercase"
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                        <Label
                                            forInput="number"
                                            value="Número"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="number"
                                            name="number"
                                            value={state.number}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-2/5 px-3">
                                        <Label
                                            forInput="district"
                                            value="Bairro"
                                            className="mb-2"
                                        />

                                        <Input
                                            type="text"
                                            name="district"
                                            value={state.district}
                                            className="mt-1 block w-full uppercase"
                                            handleChange={onHandleChange}
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

export default CustomerNew;
