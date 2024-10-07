export type CreatePaymentRequest = {
  bankCode: string;
  bankType: string;
}

import { BillCustomerModel, CreateBillRequestModel } from "./bill.types";

export {
  BillCustomerModel,
  CreateBillRequestModel
}