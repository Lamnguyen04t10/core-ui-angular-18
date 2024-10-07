import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalConfigService } from '../../../../services/global-config.service';
import { BillService } from '../../../../services/modules/bills.service';
import { PaymentService } from '../../../../services/modules/payment.service';
import { CreatePaymentRequest } from '../../../../services/modules/types';
import { Constants } from '../../../constants';
import { ModalOption } from '../../../ui-components/modal/types';
import { ToastService } from '../../../ui-components/toast/toast.service';
import { UiComponentsModule } from '../../../ui-components/ui-components.module';
import { BankService } from '../../../../services/modules/banks.service';
import { CountdownComponent } from 'ngx-countdown';
export interface OrderSummary {
  id: any;
  item: string;
  priceEncludingST: string;
  priceWithST: string;
}

export type Bank = {
  id: string;
  name: string;
  code?: string;
  logo: string;
  urls?: any
  isSelected: boolean,
  notfound: boolean,
}


@Component({
  selector: 'app-checkouts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiComponentsModule,
    CountdownComponent
  ],
  templateUrl: './checkouts.component.html',
  styleUrl: './checkouts.component.scss'
})
export class CheckoutsComponent implements OnInit {
  hash!: string;
  bill: any;
  ELEMENT_DATA = { id: 1, item: 'Bill Payment', priceExcludingST: 'RM104.94', priceWithST: 'RM104.94' };
  banks: Bank[] = [];
  allBanks: any;
  paymentType = Constants.PaymentType;
  radioPayment: any = 1;
  selectedOption: any;
  expiresOn: number = 30;
  radioOptions = [
    { value: 'RET', label: 'Personal Account' },
    { value: 'COR', label: 'Business Account' },
  ];
  // private location = inject(LocationService);
  constructor(
    private router: Router,
    private toastService: ToastService,
    private paymentService: PaymentService,
    private billService: BillService,
    private route: ActivatedRoute,
    private globalConfigService: GlobalConfigService,
    private bankService: BankService,
    private location: Location
  ) {
    this.route.queryParamMap.subscribe((param : Params) => {
      // console.log(param);
      const encodedId = param['params']['trx'];
      if (encodedId) {
        const decodedId = decodeURIComponent(encodedId);
        this.getBill(encodedId);
        this.hash = decodedId;
        // console.log('Decoded ID:', decodedId);
      }
    });
    // this.route.paramMap.subscribe(params => {
    //   const encodedId = params.get('id');
    //   if (encodedId) {
    //     const decodedId = decodeURIComponent(encodedId);
    //     this.getBill(encodedId);
    //     this.hash = decodedId;
    //     console.log('Decoded ID:', decodedId);
    //   }
    // });
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
     this.route.paramMap.subscribe(params => {
      const merchantId = params.get('merchantId');
      console.log(merchantId);
      this.getBanksAPI(merchantId!);
      this.selectedOption = 'RET';
    });
    
  }


  handleSelectBank(selectedBank: Bank) {
    this.banks = this.banks.map((bank: Bank) => {
      const isSelectedBank = bank.code === selectedBank.code;
      return {
        ...bank,
        isSelected: isSelectedBank ? !bank.isSelected : false
      };
    });
  }

  handlePaymentchange() { 
    this.switchPaymentOption();

  }

  handleModelChange(value: any): void {
    // console.log('Selected Value:', value);
    this.switchPaymentOption();
  }

  switchPaymentOption(){
    if(this.radioPayment == 1){
      if(this.selectedOption === 'RET'){
        this.banks = this.allBanks.duitnow.ret.map((bank: any) => ({
          ...bank,
          logo: '../../../assets/banks/' + bank.logo,
          isSelected: false,
          notfound: false
        }));
      } else if(this.selectedOption === 'COR'){
        this.banks = this.allBanks.duitnow.cor.map((bank: any) => ({
          ...bank,
          logo: '../../../assets/banks/' + bank.logo,
          isSelected: false,
          notfound: false
        }));
      }
    } else if(this.radioPayment == 2){
      if(this.selectedOption === 'RET'){
        this.banks = this.allBanks.fpx.ret.map((bank: any) => ({
          ...bank,
          logo: '../../../assets/banks/' + bank.logo,
          isSelected: false,
          notfound: false
        }));
      } else if(this.selectedOption === 'COR'){
        this.banks = this.allBanks.fpx.cor.map((bank: any) => ({
          ...bank,
          logo: '../../../assets/banks/' + bank.logo,
          isSelected: false,
          notfound: false
        }));
      }
    }
  }

  async handleCheckout() {
    if(this.radioPayment == 1 || this.radioPayment == 2){
      const option: ModalOption = { header: 'Modal Header' };
      const selectedBank = this.banks.find(x => x.isSelected);
      if (!selectedBank) {
        this.toastService.show({ type: 'error', classname: '', message: 'please choose a bank' });
        return;
      }

      const paymentRequest: CreatePaymentRequest = {
        bankCode: selectedBank.code ?? '',
        bankType: this.selectedOption
      }
      this.paymentService.createPayment(this.hash, paymentRequest).subscribe(res => {
        window.location.href=res.redirectUrl;
      }, (err) => {
        this.toastService.show({ type: 'error', classname: '', message: err.error });
        this.location.back();
      })
    } else if(this.radioPayment == 3) {
      this.router.navigate([`qrpay`], { queryParams: { trx: this.hash },
                            state: { data: this.bill } })
    }
    
  }

  private getBill(hash: string) {
    return this.paymentService.get(hash).subscribe((res: any) => {
      this.bill = res;
      if(res.amount > 30000){
        this.radioOptions = [
          { value: 'COR', label: 'Business Account' }
        ];
        this.selectedOption = 'COR';
      }
      // console.log(res);
      if(res.status !== 'New'){
        window.location.href=res.returnUrl;
        return;
      }

      if(res.blockRequest == true){
        window.location.href=res.returnUrl;
        return;
      }

      this.expiresOn = res.expiresOn;
      if(this.expiresOn < 0) {
        this.expiresOn = 0;
      }
    });
  }
  private getBanksAPI(merchantId: string) {
    this.bankService.getBanks(merchantId).subscribe(res => {
      this.allBanks = res;
      // default RET
      this.switchPaymentOption();
    });
  }

  async cancel() {
    if(this.hash){
      this.paymentService.closeBill(this.hash).subscribe((res: any) => {
        window.location.href=res.redirectUrl;
      })
    }
  }

  onImgError(event: any, index: number) {
    this.banks[index].notfound = true;
  }

  async handler(event: any) {
    if(event?.left == 0){
      await this.cancel();
    }
  }
}
