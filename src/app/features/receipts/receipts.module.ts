import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptsComponent } from './receipts.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReceiptsRoutingModule,
    ReceiptsComponent,
    FontAwesomeModule
  ],
  exports:[
    ReceiptsComponent
  ]
})
export class ReceiptsModule { }
