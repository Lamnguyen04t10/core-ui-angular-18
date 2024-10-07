import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaymentService } from '../../../services/modules/payment.service';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
@Component({
  selector: 'app-qr-pay',
  standalone: true,
  imports: [
    CommonModule,
    UiComponentsModule
  ],
  templateUrl: './qr-pay.component.html',
  styleUrl: './qr-pay.component.scss'
})
export class QrPayComponent implements OnInit{
  selectedFile: File | null = null;
  base64String: string = '';
  trxn: any;
  trxId: any;
  hash!: string;
  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    this.trxn = navigation?.extras.state?.['data'];
    this.route.queryParamMap.subscribe((param : Params) => {
      // console.log(param);
      const encodedId = param['params']['trx'];
      if (encodedId) {
        const decodedId = decodeURIComponent(encodedId);
        this.hash = decodedId;
        if(this.trxn == null){
          this.getBill(this.hash);
        }
        //console.log('Decoded ID:', decodedId);
      }
    });
  }

  private getBill(hash: string) {
    return this.paymentService.get(hash).subscribe((res: any) => {
      // console.log(res);
      if(res.status !== 'New'){
        window.location.href=res.returnUrl;
        return;
      }

      if(res.blockRequest == true){
        window.location.href=res.returnUrl;
        return;
      }
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    
    reader.onload = () => {
      this.base64String = reader.result as string;
      //console.log('Base64 string:', this.base64String);
    };

    reader.onerror = (error) => {
      // console.error('Error: ', error);
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.base64String) {
      // console.log('Submitting Base64 data...');
      this.paymentService.createQrPay(this.hash, {file : this.base64String}).subscribe(res =>{
        console.log(res);
      }, error => {
        console.log(error);
      });
      // You can post the base64String to your server here
    } else {
      console.error('No file selected or base64 conversion failed');
    }
  }
}
