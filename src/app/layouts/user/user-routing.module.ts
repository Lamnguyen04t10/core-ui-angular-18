import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'payment',
        loadChildren: () => import('../../features/checkouts/checkouts.module').then(m => m.CheckoutsModule)
      },
      {
        path: 'qrpay',
        loadChildren: () => import('../../features/qr-pay/qr-pay.module').then(m => m.QrPayModule)
      },
      {
        path: 'payment-result',
        loadChildren: () => import('../../features/payments/payments.module').then(m => m.PaymentsModule)
      },
      {
        path: 'payment-result/RPP/MY/Redirect/RTP',
        loadChildren: () => import('../../features/payments/payments.module').then(m => m.PaymentsModule)
      },
      {
        path: 'receipt',
        loadChildren: () => import('../../features/receipts/receipts.module').then(m => m.ReceiptsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
