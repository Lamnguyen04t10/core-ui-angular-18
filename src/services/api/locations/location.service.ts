// user-location.service.ts
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  data!: GeolocationPosition;
  constructor() { }
  getUserLocation(): Observable<GeolocationPosition> {
    return new Observable((observer: Observer<GeolocationPosition>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next(position);
            this.data = position;
            observer.complete();
          },
          (error: GeolocationPositionError) => {
            observer.error(error);
          }
        );
      } else {
        
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  requestPermission(): Promise<PermissionStatus> {
    return navigator.permissions.query({ name: 'geolocation' });
  }
}