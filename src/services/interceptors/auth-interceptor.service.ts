import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize } from 'rxjs';
import { LocationService } from '../api/locations/location.service';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { SpinnerService as LoadingService } from '../../app/ui-components/spinner/spinner.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService,
    private _location: LocationService,
    private loadingService: LoadingService
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this._authService.getToken();
    console.log(authToken);
    let location = '';
    const geoLocation = this._location.data;
    if(geoLocation) {
      location = `${geoLocation.coords.latitude}, ${geoLocation.coords.longitude}`
    }
    this.loadingService.setLoading(true);
    let clonedRequest = request.clone({
      setHeaders: {
        'X-Gps-Coordinates': location,
        'Content-Security-Policy': environment.contentSecurityPolicy,
        'X-Content-Type-Options': environment.contentTypeOptions,
        'X-Frame-Options': environment.frameOptions,
        'X-XSS-Protection': environment.protection,
        'X-Api-Key': environment.secretKey,
        "Authorization": authToken,
      }
    });

    // Log headers after setting
    return next.handle(clonedRequest).pipe(
      finalize(() => {
        // Hide loading indicator after request completes
        this.loadingService.setLoading(false);
      })
    );
  }
}
