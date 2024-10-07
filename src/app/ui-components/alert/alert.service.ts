import { Injectable } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];
  constructor() { }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  show(alert: Alert) {
    this.alerts.push(alert);
  }
}
