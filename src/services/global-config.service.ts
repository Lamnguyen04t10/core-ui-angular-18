import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankService } from './modules/banks.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  public _banks: any;
  private _banksSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  banks$: Observable<any> = this._banksSubject.asObservable();
  constructor(private bankService: BankService) { }

  getBanks() {
    this.bankService.getBanks('').subscribe(res => {
      const banks = res;
      this._banks = banks;
      this._banksSubject.next(banks);
    })
  }
}
