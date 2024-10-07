import { Component, Input } from '@angular/core';

@Component({
  selector: 'rfr-header-text',
  standalone: true,
  imports: [],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss'
})
export class HeaderTextComponent {
  @Input() class: string = '';
}
