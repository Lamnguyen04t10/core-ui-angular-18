import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrPayComponent } from './qr-pay.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
  {
    path: '',
    component: QrPayComponent
  },
  {
    path: 'payment-list',
    component: PaymentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrPayRoutingModule { }
