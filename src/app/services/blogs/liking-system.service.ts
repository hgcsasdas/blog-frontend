import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikingSystemService {
  private baseUrl = environment.urlApi + 'users/api/blogs/likes';

  constructor(private http: HttpClient) {}

  likeBlog(username: string, blogId: string): Observable<string> {
    console.log('likeBlog', username, blogId);

    return this.http.post(`${this.baseUrl}/like`, { username, blogId }, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  unlikeBlog(username: string, blogId: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/unlike`, { username, blogId }, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  dislikeBlog(username: string, blogId: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/dislike`, { username, blogId }, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  undislikeBlog(username: string, blogId: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/undislike`, { username, blogId }, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
