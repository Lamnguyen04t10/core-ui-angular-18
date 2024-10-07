import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode'
import { isPlatformBrowser } from '@angular/common';
import { IAuth } from './types';
import { ApiService } from '../api/http-client/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly tokenKey: string = 'auth';

  session: IAuth;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService) {
    this.session = this.initSession();
  }

  public getTokenInfo() {
    let data: { CurrentRole?: string } | null = null;
    data = jwtDecode(this.session.token);
    return data;
  }

  public getToken(): string {

    return this.session.token;
  }

  public isAuthenticated() {
    if (!this.session || !(this.session && this.session.token)) {
      return false;
    }

    return true;
  }

  public logIn(userName: string, password: string): Observable<IAuth> {
    return this
      .apiService
      .post("authentication/login", { userName, password })
  }

  public logout(): Observable<boolean> {
    this.removeSession();

    return of(true);
  }

  /**Khởi tạo session. Sử dụng những giá trị đã lưu từ trình duyệt */
  private initSession() {
    var session: IAuth = {} as IAuth;
    if (isPlatformBrowser(this.platformId)) {
      session.token = localStorage.getItem(this.tokenKey) ?? '';
    }
    return session;
  }

  /**Làm mới session hiện tại*/
  public setSession(session: IAuth) {
    this.session = session;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, session.token);
    }
  }

  /**Xóa session hiện tại */
  private removeSession() {
    this.session = { token: '' };
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }
}
