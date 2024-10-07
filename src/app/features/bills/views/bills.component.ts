import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { UiComponentsModule } from '../../../ui-components/ui-components.module';
import { BillService } from '../../../../services/modules/bills.service';
import { BillCustomerModel, CreateBillRequestModel } from '../../../../services/modules/types';
import { Router } from '@angular/router';
import { ToastService } from '../../../ui-components/toast/toast.service';
import { AlertService } from '../../../ui-components/alert/alert.service';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [
    CommonModule,
    UiComponentsModule
  ],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent {

  constructor(
    private billService: BillService,
    private router: Router,
    private toastService: ToastService,
    private alertService: AlertService
  ) {

  }

  showSuccess() {
    // this.toastService.show({ type: 'error', classname: '', text: ' ahihihi' });
    this.toastService.show({ type: 'success', message: "bill is created" })
  }


  handleCreateBill() {
    const customer: BillCustomerModel = {
      email: 'jim@rfrweb.com',
      name: 'JIM',
      phone: '0869920410'
    }
    const billRequestModel: CreateBillRequestModel = {
      amount: 123.00,
      customer: customer,
      description: 'fake create bill',
      name: 'billName'
    }
    this.billService.create(billRequestModel).subscribe(res => {
      this.showSuccess();
      window.location.href = res.returnUrl;
    })
  }
}
