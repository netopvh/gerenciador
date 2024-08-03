import Category from "./Category";
import Customer from "./Customer";
import Receipt from "./Receipt";
import Transaction from "./Transaction";

interface Income {
    id: number;
    due_date: string;
    customer_id: number;
    customer: Customer;
    receive: number;
    status: string;
    received: string;
    parcels: string;
    transactions: Array<Transaction>;
    receipt: Receipt;
    category_id: number;
    category: Category;
    date_payment: string;
    obs: string;
}

export default Income;
