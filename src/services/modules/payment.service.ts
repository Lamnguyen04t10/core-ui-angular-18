import { Injectable } from "@angular/core";
import { ApiService } from "../api/http-client/api.service";
import { CreatePaymentRequest } from "./types";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentController = 'payment';
  constructor(
    private http: ApiService
  ) { }
  
  createPayment(hash: string, paymentRequest: CreatePaymentRequest,) {
    return this.http.post(`${this.paymentController}/create?trx=${hash}`, paymentRequest)
  }

  get(hash: string) {
    return this.http.get(`${this.paymentController}/detail?trx=${hash}`);
  }

  getStatus(endToEndId: string) {
    return this.http.get(`${this.paymentController}/status?endToEndId=${endToEndId}`)
  }

  closeBill(hash: string) {
    return this.http.put(`${this.paymentController}/close?trx=${hash}`)
  }

  createQrPay(hash: string, data: any): Observable<any> {
    return this.http.post(`${this.paymentController}/qrpay?trx=${hash}`, data)
  }

  filterQrPayment(data: any): Observable<any> {
    return this.http.post(`${this.paymentController}/qrpay/list`, data)
  }

  verifyPurchase(id: string, status: string): Observable<any> {
    return this.http.post(`${this.paymentController}/qrpay/verify/${id}?status=${status}`);
  }

  getQrPayment(id: any): Observable<any> {
    return this.http.get(`${this.paymentController}/qrpay/detail/${id}`)
  }

}
