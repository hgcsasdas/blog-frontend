import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './requests/loginRequest';
import {
  Observable,
  throwError,
  BehaviorSubject,
  tap,
  map,
  catchError,
} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient) {
    this.currentUserLoginOn.next(sessionStorage.getItem('token') != null);
    this.currentUserData.next(sessionStorage.getItem('token') || '');
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http
      .post<any>(`${environment.urlHost}auth/login`, credentials)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('token', userData.token);
          sessionStorage.setItem('username', credentials.user);
          this.currentUserData.next(userData.token);
          this.currentUserLoginOn.next(true);
        }),
        map((userData) => userData.token),
        catchError(this.handleError)
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        'Backend returned code:',
        error.status,
        'body was:',
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}
