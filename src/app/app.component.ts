import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from '../services/core/core.module';
import { LocationService } from '../services/api/locations/location.service';
import { HttpClientModule } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreModule,
    CountdownModule,
    FontAwesomeModule,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BytePay';
  readonly #iconSetService = inject(IconSetService);
  constructor(private _locationService: LocationService) {
    this.initializeLocation();

    this.#iconSetService.icons = { ...iconSubset };
  }

  async initializeLocation() {
    await this._locationService.getUserLocation().toPromise(); // Assuming getUserLocation returns an Observable
    // The rest of your component initialization logic goes here
  }
}
