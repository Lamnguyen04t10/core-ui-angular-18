import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOption } from './types';
import { ModalConstant as modalConstant } from './constants';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('content') content!: ElementRef<any>;
  @Input() component!: any;
  @Input() option!: ModalOption;

  header: string = modalConstant.DEFAULT_HEADER;

  activeModal = inject(NgbActiveModal);
  close() {
    this.activeModal.close();
  }

  ngOnInit(): void {
    if (this.option?.header) {
      this.header = this.option.header;
    }
  }
}
