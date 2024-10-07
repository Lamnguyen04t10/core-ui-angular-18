import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from '../../../services/interceptors/loading-interceptor.sevice';
import { AuthInterceptor } from '../../../services/interceptors/auth-interceptor.service';
import { UserComponent } from './user.component';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    UserComponent,
    UserRoutingModule,
    HttpClientModule,
    LayoutWrapperComponent
  ],
  exports: [
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
})
export class UserModule { }
