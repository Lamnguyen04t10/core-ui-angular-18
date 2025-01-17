import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPayComponent } from './qr-pay.component';

describe('QrPayComponent', () => {
  let component: QrPayComponent;
  let fixture: ComponentFixture<QrPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
