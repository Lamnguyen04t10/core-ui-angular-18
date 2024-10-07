import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rfr-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  @Input() class: string = '';
  @Input() size: '' | 'sm' | 'lg' = '';
  @Input() variant: '' | 'outline' = '';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() color: 'primary' | 'success' | 'danger' = 'primary';
  @Input() disabled: string = 'false';

  @Output() click: EventEmitter<any> = new EventEmitter();
  btClasses: string = 'btn';

  ngOnInit() {
    const classes = new Array(this.btClasses);
    let btnColor = ``
    if (this.variant) {
      btnColor += `btn-${this.variant}-${this.color}`
    } else {
      btnColor += `btn-${this.color}`
    }

    classes.push(btnColor)
    if (this.size) {
      classes.push(`btn-${this.size}`)
    }
    classes.push(this.class)
    this.btClasses = classes.join(' ');
  }

  handleButtonClick() {
    // this.click.emit();
  }
}
