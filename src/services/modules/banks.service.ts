import { Injectable } from "@angular/core";
import { ApiService } from "../api/http-client/api.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BankService {
  bankController = 'bank';
  constructor(
    private http: ApiService
  ) { }

  getBanks(merchantId: string) {
    return this.http.get(`${this.bankController}/list/${merchantId}`)
  }
}
