import { Component, inject } from '@angular/core';

import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgbAlertModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './alert.service';

@Component({
  selector: 'rfr-alert-component',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet, CommonModule, NgbAlertModule],
  templateUrl: './alert.component.html',
  host: { class: 'position-fixed top-0 end-0 p-3', style: 'z-index: 8000' },
})
export class AlertContainer {
  alertService = inject(AlertService);
}