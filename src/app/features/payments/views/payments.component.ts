import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiComponentsModule } from '../../../ui-components/ui-components.module';
import { PaymentService } from '../../../../services/modules/payment.service';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiComponentsModule
  ],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  selectedTab: any = '1';
  data: any;
  id: string = '';
  returnUrl: string = '';
  constructor(
    private route: ActivatedRoute,
    private service: PaymentService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param : Params) => {
      // console.log(param);
      this.service.getStatus(param['params']['EndtoEndId']).subscribe(res => {
        this.data = res;
        this.id = param['params']['EndtoEndId'];
        this.returnUrl = res.returnUrl;
        // window.location.href= this.returnUrl;
      }, (error) => {

      });
    });
    
  }

  backToHome(): void {
    window.location.href= this.returnUrl;
  }

  printReceipt(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "data": JSON.stringify(this.data)
      }
    };
    this.router.navigate(["receipt"], {
      state: this.data});
  }
}
