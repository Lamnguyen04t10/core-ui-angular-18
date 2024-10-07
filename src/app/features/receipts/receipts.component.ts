import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaymentService } from '../../../services/modules/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiComponentsModule
  ],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.scss'
})
export class ReceiptsComponent implements OnInit {

  receiptData: any;
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {
    this.receiptData = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.receiptData);
   }

  ngOnInit(): void {

  }

  download(): void {
    this.generatePdf("receipt", this.receiptData.referenceNo)
  }

  public generatePdf(elementId: string, pdfName: string): void {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID '${elementId}' not found!`);
      return;
    }

    html2canvas(element).then((canvas : any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${pdfName}.pdf`);
    });
  }

  backToHome(): void {
    window.location.href= this.receiptData.returnUrl;
  }

}
