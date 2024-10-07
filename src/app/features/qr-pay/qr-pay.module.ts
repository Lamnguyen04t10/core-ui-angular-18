import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrPayRoutingModule } from './qr-pay-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QrPayRoutingModule,
    NgxDatatableModule
  ]
})
export class QrPayModule { }
