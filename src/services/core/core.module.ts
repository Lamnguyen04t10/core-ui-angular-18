import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coreInterceptors } from '../interceptors';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    coreInterceptors
  ]
})
export class CoreModule { }
