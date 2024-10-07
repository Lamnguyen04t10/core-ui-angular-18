import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth-interceptor.service";
import { LoadingInterceptor } from "./loading-interceptor.sevice";

export const coreInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
];

export const authInterceptor = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }