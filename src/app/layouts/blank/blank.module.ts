import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { AuthInterceptor } from '../../../services/interceptors/auth-interceptor.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    HttpClientModule,
    LayoutWrapperComponent,
    BlankRoutingModule
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
export class BlankModule { }
