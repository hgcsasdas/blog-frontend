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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserLoginOn.next(sessionStorage.getItem('token') != null);
    this.currentUserData.next(sessionStorage.getItem('token') || '');
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http
      .post<any>(`${environment.urlHost}auth/login`, credentials)
      .pipe(
        tap((userData) => {
          if (userData.logged && userData.token !== '') {
            sessionStorage.setItem('token', userData.token);
            sessionStorage.setItem('username', credentials.user);
            this.currentUserData.next(userData.token);
            this.currentUserLoginOn.next(true);
            this.ping();
          } else {
            this.currentUserLoginOn.next(false);
          }
        }),
        map((userData) => userData.token),
        catchError(this.handleError)
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.currentUserLoginOn.next(false);
    this.router.navigate(['/']);
  }

  ping(): void { // Change return type to void
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('username');

    if (!token || !user) {
      this.logout();
      return; // No need to continue if no token or user
    }

    const pingRequest = { user, token };

    this.http.post<any>(`${environment.urlHost}auth/ping`, pingRequest)
      .subscribe(response => {
        if (response.logout) {
          this.logout();
          this.isLoggedIn.next(false); // Update subject to false
        } else if (response.refresh) {
          sessionStorage.setItem('token', response.token);
          this.currentUserData.next(response.token);
          this.isLoggedIn.next(true); // Update subject to true
        }
      }, this.handleError);
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ha ocurrido un error ' + error.error);
    } else {
      console.error('Backend returned code:', error.status, 'body was:', error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
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
