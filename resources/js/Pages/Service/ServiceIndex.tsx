import Layout from "@/Layouts/Layout";
import * as React from "react";
import route from "ziggy-js";

interface Props {
    auth: any;
    errors: any;
}

const ServiceIndex: React.FC<Props> = ({ auth, errors }) => {
    return (
        <Layout
            auth={auth}
            errors={errors}
            title="Ordem de Serviço"
            button={true}
            href={route("customer.create")}
            name="Novo"
        >
            <h1>Em desenvolvimento</h1>
        </Layout>
    );
};

export default ServiceIndex;
