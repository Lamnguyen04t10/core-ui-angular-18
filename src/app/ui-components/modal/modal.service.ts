import { Injectable, inject } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { ModalOption } from './types';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen = false;
  ngModal = inject(NgbModal);
  config = inject(NgbModalConfig)

  constructor() {
    // customize default values of modals used by this component tree

  }
  async open(content: any, option: ModalOption, configParam?: any) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.config.size = configParam?.size ?? 'xl';

    this.config = { ...this.config, ...configParam };
    const modal = this.ngModal.open(ModalComponent);
    modal.componentInstance.component = content;
    modal.componentInstance.option = option;

    return await modal.result;
  }
  async confirmation(content: any, option: ModalOption, configParam?: any) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.config.size = configParam?.size ?? 'md';

    this.config = { ...this.config, ...configParam };
    const modal = this.ngModal.open(ConfirmationComponent);
    modal.componentInstance.message = content;
    modal.componentInstance.option = option;

    return await modal.result;
  }
}