import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PaymentService } from '../../../../services/modules/payment.service';
import { ToastService } from '../../../ui-components/toast/toast.service';
import { ButtonLayoutDisplay, ButtonMaker, DialogInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { BlankComponent } from '../../../layouts/blank/blank.component';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule
  ],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.scss'
})
export class PaymentDetailComponent {

  data: any;
  id: any;
  isDialogVisible: boolean = false;
  type = '';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private location: Location,
    private toastService: ToastService,
    private router: Router)
  {}

  handleConfirm(): void {
    if(this.type === 'Approved' || this.type === 'Rejected'){
      this.paymentService.verifyPurchase(this.id, this.type).subscribe(res => {
        this.toastService.show({ type: 'success', message: "Your transaction have been saved." });
        this.getDetail();
      }, (err) => {
        this.toastService.show({ type: 'error', message: err});
      });
    }
    console.log('Action confirmed!');
    this.isDialogVisible = false;
  }

  back(){

  }

  ngOnInit(): void {
    // Subscribe to the route parameters
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // Get the 'id' parameter
      this.getDetail();
    });
  }

  getDetail() {
    this.paymentService.getQrPayment(this.id).subscribe(res => {
      this.data = res;
    });
  }

  verifyPurchase(stt: string) {
    // Instance of DialogInitializer includes any valid angular component as argument.
      const dialogPopup = new DialogInitializer(BlankComponent);
          
      // Any data can be sent to AnyAngularComponent.
      dialogPopup.setCustomData({name: 'Jean-Luc', surname: 'Picard', id: 1}); // optional
      
      // Set some configuration.
      dialogPopup.setConfig({
          width     : '500px',
          layoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
      });
      
      // Set some custom buttons as list.
      // SUCCESS | INFO | NONE | DANGER | WARNING | PRIMARY | SECONDARY | LINK | DARK | LIGHT
      dialogPopup.setButtons([
          new ButtonMaker('Edit', 'edit', ButtonLayoutDisplay.WARNING), 
          new ButtonMaker('Submit', 'submit', ButtonLayoutDisplay.SUCCESS),
          new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
      ]);

      // Simply open the popup and observe which button is clicked and, 
      // receive optional payload from AnyAngularComponent.
      dialogPopup.openDialog$().subscribe(resp => {
          console.log('dialog response: ', resp);
      });
  }
}
