import Income from "./Income";

interface Receipt {
    id: number;
    income_id: number;
    income: Income;
    observations: string;
}

export default Receipt;
