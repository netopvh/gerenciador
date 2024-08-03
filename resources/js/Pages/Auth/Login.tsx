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
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email" className="mb-2" />

                    <InputIcon
                        name="email"
                        value={data.email}
                        placeholder="Seu Email"
                        onChange={onHandleChange}
                        errors={errors.email}
                        icon={
                            <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                            </svg>
                        }
                    />

                    {/**
                     * <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        errors={errors.email}
                        handleChange={onHandleChange}
                    />
                     */}
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Senha" />

                    <InputIcon
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Senha"
                        onChange={onHandleChange}
                        errors={errors.password}
                        icon={
                            <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                            </svg>
                        }
                    />

                    {/* <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        errors={errors.password}
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    /> */}
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Lembrar-me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <InertiaLink
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Esqueceu a senha?
                        </InertiaLink>
                    )}

                    <Button className="ml-4" processing={processing}>
                        Entrar
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
