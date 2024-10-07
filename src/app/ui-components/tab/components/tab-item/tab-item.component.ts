import { Component, Input } from '@angular/core';

@Component({
  selector: 'rfr-tab-item',
  standalone: true,
  imports: [],
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.scss'
})
export class TabItemComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() active: boolean = false;
}