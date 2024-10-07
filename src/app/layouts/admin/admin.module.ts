import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { AdminComponent } from './admin.component';
import { DefaultLayoutComponent } from 'src/app/layout/default-layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    AdminComponent,
    HttpClientModule,
    LayoutWrapperComponent,
    DefaultLayoutComponent,
  ]
})
export class AdminModule { }
