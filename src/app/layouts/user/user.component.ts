import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { BankService } from '../../../services/modules/banks.service';
import { GlobalConfigService } from '../../../services/global-config.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UiComponentsModule,
    LayoutWrapperComponent,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  constructor(
    private bankService: BankService,
    private globalConfigService: GlobalConfigService
  ) { }

  ngOnInit(): void {
    // this.initialData();
  }

  // private async initialData() {
  //   await this.getBanksAPI();
  // }
  // private async getBanksAPI() {
  //   this.globalConfigService.getBanks();
  // }
}
