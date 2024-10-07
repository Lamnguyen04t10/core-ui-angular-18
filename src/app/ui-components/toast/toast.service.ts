import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  delay?: number;
  type: 'success' | 'error',
  message: string,
  classname?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  toasts: Toast[] = [];
  toast!: Toast | null;

  show(toast: Toast) {
    this.toast = toast;
    this.toasts.push(toast);
  }

  remove(toast: Toast) {
    this.toast = null;
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
