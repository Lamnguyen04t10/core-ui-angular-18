import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ModalOption } from '../types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  @ViewChild('content') content!: ElementRef<any>;
  @Input() message!: any;
  @Input() option!: ModalOption;
  header: any;

  activeModal = inject(NgbActiveModal);

  constructor() {
  }

  ngOnInit(): void {
    if (this.option?.header) {
      this.header = this.option.header;
    }
  }

  ok() {
    this.activeModal.close(true);
  }

  close() {
    this.activeModal.close();
  }
}
