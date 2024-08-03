import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Select from "@/Components/Select";
import Layout from "@/Layouts/Layout";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import * as React from "react";
import route from "ziggy-js";

const type = [
    {
        id: 0,
        title: "SELECIONE O TIPO DE CONTA",
    },
    {
        id: "E",
        title: "CONTA A PAGAR",
    },
    {
        id: "I",
        title: "CONTA A RECEBER",
    },
];

interface Props {
    auth: any;
}

const CategoryAdd: React.FC<Props> = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        type: "",
    });

    const submit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(event);
        post(route("category.store"));
    };

    const onHandleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData(e.target.name as "title" | "type", e.target.value);
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Categorias de Contas"
            button={true}
            name="Voltar"
            href={route("category.index")}
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="p-3">
                            <form
                                onSubmit={submit}
                                className="w-full max-w-full"
                            >
                                <div className="flex flex-col mb-4">
                                    <Label
                                        forInput="title"
                                        value="Descrição"
                                        className="mb-2"
                                    />

                                    <Input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full uppercase"
                                        autoComplete="title"
                                        isFocused={true}
                                        errors={errors.title}
                                        handleChange={onHandleChange}
                                    />
                                </div>

                                <div className="flex flex-col mb-4">
                                    <Select
                                        data={type}
                                        name="type"
                                        label="Tipo de Categoria"
                                        onChange={onHandleChange}
                                        errors={errors.type}
                                    />
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
                                        href={route("category.index")}
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

export default CategoryAdd;
