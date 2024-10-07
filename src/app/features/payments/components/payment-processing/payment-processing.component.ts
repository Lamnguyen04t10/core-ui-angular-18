import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-payment-processing',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './payment-processing.component.html',
  styleUrl: './payment-processing.component.scss'
})
export class PaymentProcessingComponent implements OnDestroy {
  countdown$!: Observable<number>;

  constructor(
    private activeModal: NgbActiveModal
  ) {
    this.countdown$ = this.countdown(30);
    this.countdown$.subscribe(res => {
      if (res <= 0) {
        activeModal.close(true)
      }
    })
  }

  countdown(seconds: number): Observable<number> {
    return timer(0, 1000).pipe(
      map((tick) => seconds - tick - 1),
      takeWhile((value) => value >= 0)
    );
  }

  ngOnDestroy(): void {
    this.countdown$.subscribe();
    this.activeModal.dismiss();
  }
}
