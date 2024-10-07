import { Component } from '@angular/core';
import { ToastsContainer } from '../../ui-components/toast/toast-container.component';
import { AlertContainer } from '../../ui-components/alert/alert.component';

@Component({
  selector: 'rfr-layout-wrapper',
  standalone: true,
  imports: [
    ToastsContainer,
    AlertContainer
  ],
  templateUrl: './layout-wrapper.component.html',
  styleUrl: './layout-wrapper.component.scss'
})
export class LayoutWrapperComponent {

}
