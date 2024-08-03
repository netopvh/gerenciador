import Input from "@/Components/Input";
import InputMask from "@/Components/InputMask";
import Label from "@/Components/Label";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface Props {
    fields?: any;
    isOpen?: boolean;
    processing: boolean;
    editMode?: boolean;
    error?: any;
    errors?: any;
    onSave?: React.MouseEventHandler<HTMLButtonElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
    onFormChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ModalSupplier: React.FC<Props> = ({
    fields,
    isOpen,
    processing,
    editMode,
    error,
    errors,
    onSave,
    onCancel,
    onFormChange,
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={(e) => {
                    console.log(e);
                }}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {editMode
                                    ? "Atualizar de Fornecedor"
                                    : "Cadastro de Fornecedor"}
                            </Dialog.Title>
                            <div className="mt-2">
                                {error && (
                                    <div className="p-1 mb-1 border border-red-500 rounded-sm bg-red-200 italic">
                                        {error}
                                    </div>
                                )}
                                <form action="" className="w-full max-w-full">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                                            <Label
                                                forInput="name"
                                                className="mb-2"
                                                value="Nome"
                                            />

                                            <Input
                                                type="text"
                                                name="name"
                                                value={fields.name}
                                                errors={errors.name}
                                                className="mt-1 block w-full uppercase"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                        <div className="w-full md:w-6/12 px-3">
                                            <Label
                                                forInput="cnpj"
                                                className="mb-3"
                                                value="CNPJ"
                                            />

                                            <InputMask
                                                name="cpf_cnpj"
                                                className="w-full"
                                                value={fields.cpf_cnpj}
                                                onChange={onFormChange}
                                                mask="99.999.999/9999-99"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                                            <Label
                                                forInput="email"
                                                className="mb-2"
                                                value="Email"
                                            />

                                            <Input
                                                type="text"
                                                name="email"
                                                value={fields.email}
                                                errors={errors.email}
                                                className="mt-1 block w-full"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                        <div className="w-full md:w-6/12 px-3">
                                            <Label
                                                forInput="mobile"
                                                className="mb-2"
                                                value="Telefone"
                                            />

                                            <Input
                                                type="text"
                                                name="mobile"
                                                value={fields.mobile}
                                                errors={errors.mobile}
                                                className="mt-1 block w-full"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <Label
                                                forInput="address"
                                                className="mb-2"
                                                value="Endereço"
                                            />

                                            <Input
                                                type="text"
                                                name="address"
                                                value={fields.address}
                                                errors={errors.address}
                                                className="mt-1 block w-full uppercase"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                            <Label
                                                forInput="number"
                                                className="mb-2"
                                                value="Número"
                                            />

                                            <Input
                                                type="text"
                                                name="number"
                                                value={fields.number}
                                                errors={errors.number}
                                                className="mt-1 block w-full uppercase"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                        <div className="w-full md:w-3/4 px-3">
                                            <Label
                                                forInput="district"
                                                className="mb-2"
                                                value="Bairro"
                                            />

                                            <Input
                                                type="text"
                                                name="district"
                                                value={fields.district}
                                                errors={errors.district}
                                                className="mt-1 block w-full uppercase"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <Label
                                                forInput="complement"
                                                className="mb-2"
                                                value="Complemento"
                                            />

                                            <Input
                                                type="text"
                                                name="complement"
                                                value={fields.complement}
                                                errors={errors.complement}
                                                className="mt-1 block w-full uppercase"
                                                handleChange={onFormChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex">
                                        <button
                                            type="button"
                                            className="bg-red-500 ml-2 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            onClick={onCancel}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                                                processing && "opacity-25"
                                            }`}
                                            onClick={onSave}
                                            disabled={processing}
                                        >
                                            {editMode
                                                ? "Atualizar"
                                                : "Cadastrar"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalSupplier;
