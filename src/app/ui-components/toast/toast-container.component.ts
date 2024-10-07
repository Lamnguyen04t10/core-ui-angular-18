import { Component, inject } from '@angular/core';

import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgbAlertModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast.service';

@Component({
  selector: 'rfr-toasts-container',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet, CommonModule, NgbAlertModule],
  templateUrl: './toast.component.html',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
  toastService = inject(ToastService);
}