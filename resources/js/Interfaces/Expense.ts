import Supplier from "./Supplier";
import Category from "./Category";
import Transaction from "./Transaction";

interface Expense {
    id: number;
    supplier_id: number;
    supplier: Supplier;
    category_id: number;
    category: Category;
    transactions: Array<Transaction>;
    doc: string;
    due_date: string;
    qtd: string;
    parcel: string;
    payable: number;
    status: string;
}

export default Expense;
