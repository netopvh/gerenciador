import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import React, { useEffect } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import InputIcon from "@/Components/InputIcon";

interface Props {
    status: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(
            event.target.name as "email" | "password" | "remember",
            event.target.type === "checkbox"
                ? event.target.checked + ""
                : event.target.value
        );
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Guest>
            {/* Header do formulário */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Bem-vindo de volta
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Faça login em sua conta para continuar
                </p>
            </div>

            {/* Mensagem de status */}
            {status && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            {status}
                        </span>
                    </div>
                </div>
            )}

            {/* Erros de validação */}
            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="space-y-6">
                {/* Campo Email */}
                <div>
                    <Label 
                        forInput="email" 
                        value="Email" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
                    />

                    <InputIcon
                        name="email"
                        value={data.email}
                        placeholder="Digite seu email"
                        onChange={onHandleChange}
                        errors={errors.email}
                        icon={
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                        }
                    />
                </div>

                {/* Campo Senha */}
                <div>
                    <Label 
                        forInput="password" 
                        value="Senha" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" 
                    />

                    <InputIcon
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Digite sua senha"
                        onChange={onHandleChange}
                        errors={errors.password}
                        icon={
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        }
                    />
                </div>

                {/* Checkbox Lembrar-me e Link Esqueceu a senha */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Lembrar-me
                        </span>
                    </label>

                    {canResetPassword && (
                        <InertiaLink
                            href={route("password.request")}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                            Esqueceu a senha?
                        </InertiaLink>
                    )}
                </div>

                {/* Botão de Login */}
                <div>
                    <Button 
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" 
                        processing={processing}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Entrando...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Entrar
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
