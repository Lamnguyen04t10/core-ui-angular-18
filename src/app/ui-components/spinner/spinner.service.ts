import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading: boolean = false
  constructor() { }

  setLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  public get isLoading() {
    return this._isLoading;
  }
}
