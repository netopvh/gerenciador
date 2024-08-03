import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Card from "@/Components/Card";
import LatestCustomers from "@/Components/LatestCustomers";
import Customer from "@/Interfaces/Customer";
import Header from "@/Components/Header";
import Layout from "@/Layouts/Layout";
import ChartGroupBar from "@/Components/ChartGroupBar";

interface Props {
    auth: any;
    customers: Array<Customer>;
    totalCustomers: number;
    totalIncome: number;
    totalExpenses: number;
    incomeLabel: Array<any>;
}

const Dashboard: React.FC<Props> = ({
    auth,
    customers,
    totalCustomers,
    totalIncome,
    totalExpenses,
    incomeLabel,
}) => {
    // const { customers, totalCustomers } = props;

    return (
        <Layout title="Painel Principal" button={false} auth={auth}>
            <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-6">
                    <Card
                        title="Contas a Pagar"
                        icon={1}
                        currency={true}
                        value={totalExpenses}
                    />
                    <Card
                        title="Contas a Receber"
                        icon={2}
                        currency={true}
                        value={totalIncome}
                    />
                    <Card title="Clientes" icon={3} value={totalCustomers} />
                </div>
                {/**
                 * <div className="grid grid-cols-12 gap-6 mt-3">
                    <ChartGroupBar
                        title="Contas a Receber"
                        labels={incomeLabel}
                        data={[]}
                    />
                    <ChartGroupBar
                        title="Contas a Pagar"
                        labels={[]}
                        data={[]}
                    />
                </div>
                 */}
                <div className="grid grid-cols-12 gap-6 mt-3">
                    <LatestCustomers customers={customers} />
                </div>
            </div>
        </Layout>
    );
};
export default Dashboard;
