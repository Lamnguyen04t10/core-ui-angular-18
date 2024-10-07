import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './views/payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    PaymentsComponent,
  ],
  exports: [
    PaymentsComponent
  ]
})
export class PaymentsModule { }
