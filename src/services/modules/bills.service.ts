import { Injectable } from "@angular/core";
import { ApiService } from "../api/http-client/api.service";
import { CreateBillRequestModel } from "./types";

@Injectable({
  providedIn: 'root'
})
export class BillService {
  paymentController = 'bills';
  constructor(
    private http: ApiService
  ) { }

  create(model: CreateBillRequestModel) {
    return this.http.post(`${this.paymentController}/create`, model);
  }

  get(hash: string) {
    return this.http.get(`${this.paymentController}/${hash}`);
  }
}
