import { Component, Input } from '@angular/core';

@Component({
  selector: 'rfr-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() fill: string = ''
  @Input() class: string = ''
  @Input() style: string = ''
}
