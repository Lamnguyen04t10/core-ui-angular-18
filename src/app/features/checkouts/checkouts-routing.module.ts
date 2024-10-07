import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutsComponent } from './views/checkouts.component';

const routes: Routes = [
  {
    path: ':merchantId',
    component: CheckoutsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutsRoutingModule { }
