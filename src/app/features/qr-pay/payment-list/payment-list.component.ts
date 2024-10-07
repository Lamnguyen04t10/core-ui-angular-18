import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaymentService } from '../../../../services/modules/payment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {
  rows: any;
  showPendingTab: boolean = true;
  showApprovalTab: boolean = true;
  showSuccessTab: boolean = true;
  showRejectTab: boolean = true;

  // Variable to track which tab is selected
  selectedTab: string = 'pending';
  filter = {
    fromDate: '',
    toDate: '',
    keyword: '',
    status: '',
    page: 0,
    size: 10
  };

  total = 0;
  constructor(private paymentService: PaymentService,
    private router: Router
  ){
    this.setDefaultDateRange();
    this.applyFilter();
  }

  // Method to select a tab
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.applyFilter();
  }
  handlePageChange(event: any){

  }

  viewDetail(id: any){
    this.router.navigateByUrl(`admin/payment-detail/${id}`)
  }
  applyFilter(){
    let status = '';
    if(this.selectedTab === 'pending') {
      status = 'Pending';
    } else if(this.selectedTab === 'approval'){
      status = 'Approved';
    } else if(this.selectedTab === 'success'){
      status = 'Success';
    } else if(this.selectedTab === 'reject'){
      status = 'Rejected';
    }
    this.filter.status = status;
    this.paymentService.filterQrPayment(this.filter).subscribe(res => {
      console.log(res);
      this.rows = res.data;
      this.total = res.total;
    })
  }

  setDefaultDateRange() {
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() - 1);

    this.filter.fromDate = oneMonthFromNow.toISOString().split('T')[0]; // Set today's date
    this.filter.toDate = now.toISOString().split('T')[0]; // Set date 1 month from now
  }
}
