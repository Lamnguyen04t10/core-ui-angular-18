import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rfr-radio-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() name!: string;
  @Input() value!: any;
  @Input() label!: string;
  @Input() checked: boolean = false;

  @Output() change = new EventEmitter<any>();

  private onChangeFn: (value: any) => void = () => { };
  private onTouchedFn: () => void = () => { };

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    // console.log(input.value)
    this.onChangeFn(input.value);
    // this.change.emit(input.value);
  }

  writeValue(value: any): void {
    this.checked = value === this.value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state here if needed
  }
}
