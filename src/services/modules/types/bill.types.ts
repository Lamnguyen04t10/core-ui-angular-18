export type CreateBillRequestModel = {
    amount: number;
    name: string;
    description: string;
    customer: BillCustomerModel
}

export type BillCustomerModel = {
    name: string;
    email: string;
    phone: string
}