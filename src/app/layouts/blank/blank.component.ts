import { Component } from '@angular/core';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gid-blank',
  templateUrl: './blank.component.html',
  standalone: true,
  imports: [
    UiComponentsModule,
    LayoutWrapperComponent,
    RouterModule
  ],
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
