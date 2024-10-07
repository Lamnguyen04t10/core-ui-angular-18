import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'rfr-radio-group',
  standalone: true,
  imports: [
    CommonModule,
    RadioButtonComponent,
  ],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements OnInit {
  @Input() options: { value: any, label: string }[] = [];
  @Input() name!: string;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  value: any;
  onChange = (_: any) => { };
  onTouched = () => { };

  ngOnInit() {
    if (this.options && this.options.length) {
      this.value = this.options[0].value;
      this.onChange(this.value);
    }
  }

  writeValue(value: any): void {
    // console.log(value)
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if necessary
  }

  onRadioChange(event: any) {
    this.value = event.target?.value;
    this.onChange(this.value);
    this.onTouched();
    this.modelChange.emit(event.target?.value);
  }
}
