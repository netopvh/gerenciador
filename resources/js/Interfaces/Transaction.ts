import PaymentMethod from "./PaymentMethod";

interface Transaction {
    id: number;
    payment_method: PaymentMethod;
    received: string;
    date_payment: string;
    status: string;
    obs: string;
}

export default Transaction;
