import { Component, Input } from '@angular/core';

@Component({
  selector: 'rfr-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
@Input() class: string = '';
}
