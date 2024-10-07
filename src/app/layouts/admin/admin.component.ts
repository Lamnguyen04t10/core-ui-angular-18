import { Component } from '@angular/core';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/layout/default-layout';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    UiComponentsModule,
    LayoutWrapperComponent,
    RouterModule,
    DefaultLayoutComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
