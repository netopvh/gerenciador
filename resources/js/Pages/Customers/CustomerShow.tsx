import * as React from "react";
import Customer from "@/Interfaces/Customer";
import route from "ziggy-js";
import InputEdit from "@/Components/InputEdit";
import Button from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";
import Layout from "@/Layouts/Layout";

interface Props {
    auth: any;
    errors: any;
    error: any;
    success: any;
    customer: Customer;
}

const CustomerShow: React.FC<Props> = ({
    auth,
    errors,
    error,
    success,
    customer,
}) => {
    const [state, setState] = React.useState({
        id: customer.id,
        cod: customer.cod,
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile,
        cpfcnpj: customer.cpfcnpj,
        address: customer.address,
        number: customer.number,
        district: customer.district,
    });

    const [readOnly, setReadOnly] = React.useState(true);
    const [processing, setProcessing] = React.useState(false);

    React.useEffect(() => {
        setProcessing(false);
        setReadOnly(true);
        Inertia.reload({ only: ["customer"] });
    }, [success]);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessing(true);
        Inertia.post(route("customer.update", state));
    };

    const handleDelete = () => {
        if (!confirm("Deseja realmente excluir o registro?")) return;
        Inertia.delete(route("customer.destroy", { id: customer.id }));
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            success={success}
            title="Clientes"
            button={true}
            href={route("customer.index")}
            name="Voltar"
        >
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="flex items-center justify-start mb-4">
                                <button
                                    className={`${
                                        !readOnly && "hidden"
                                    } bg-blue-500 text-white hover:bg-blue-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    disabled={!readOnly}
                                    onClick={() => setReadOnly(false)}
                                >
                                    Editar
                                </button>
                                {/**
                                 * <button
                                    className={`${
                                        !readOnly && "opacity-0"
                                    } bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    disabled={!readOnly}
                                    type="button"
                                >
                                    Transações
                                </button>
                                 */}
                                <button
                                    className={`${
                                        !readOnly && "opacity-0"
                                    } bg-red-500 text-white hover:bg-red-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                                    disabled={!readOnly}
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            {error && (
                                <div className="w-full p-2 border border-red-500 bg-red-300 italic">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Informações do Cliente
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-1/4 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="cod"
                                                label="Código"
                                                className="uppercase"
                                                value={state.cod}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="name"
                                                label="Nome /Razão Social"
                                                className="uppercase"
                                                value={state.name}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/4 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="email"
                                                label="E-mail"
                                                value={state.email}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="mobile"
                                                label="Contato"
                                                value={state.mobile}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="cpfcnpj"
                                                label="CPF / CNPJ"
                                                value={state.cpfcnpj}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Informações de Localização
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="address"
                                                label="Endereço"
                                                className="uppercase"
                                                value={state.address}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="number"
                                                name="number"
                                                label="Número"
                                                value={state.number}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <InputEdit
                                                type="text"
                                                name="district"
                                                label="Bairro"
                                                className="uppercase"
                                                value={state.district}
                                                handleChange={onHandleChange}
                                                disabled={readOnly}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <Button
                                        className={`${
                                            readOnly && "hidden"
                                        } ml-4`}
                                        processing={processing}
                                    >
                                        Atualizar
                                    </Button>

                                    <button
                                        className={`${
                                            readOnly && "hidden"
                                        } bg-red-500 ml-2 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
                                        type="button"
                                        onClick={() => setReadOnly(true)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CustomerShow;
