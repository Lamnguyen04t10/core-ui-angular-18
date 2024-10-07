import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BillsRoutingModule,
    CountdownModule 
  ]
})
export class BillsModule { }
