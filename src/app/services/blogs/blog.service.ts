import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  map,
  catchError,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { BlogDto } from './DTO/BlogDto';
import { TokenMessageResponse } from '../responses/tokenMessageResponse';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = environment.urlApi + 'users/api/blogs';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  createBlog(blog: BlogDto): Observable<TokenMessageResponse> {

    return this.http.post<TokenMessageResponse>(`${this.baseUrl}`, blog).pipe(
      map((tokenMessageResponse: TokenMessageResponse) => {
        return {
          token: tokenMessageResponse.token,
          message: tokenMessageResponse.message,
          done: tokenMessageResponse.done,
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);
        return throwError(
          () =>
            new Error(
              'Something went wrong with the blog creation; please try again later.'
            )
        );
      })
    );
  }

  getAllBlogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    console.log('Error: ', error);

    return throwError('An error occurred');
  }

  getBlogById(blogId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${blogId}`);
  }

  updateBlog(blogId: string, blog: BlogDto): Observable<TokenMessageResponse> {
    return this.http
      .put<TokenMessageResponse>(`${this.baseUrl}/${blogId}`, blog)
      .pipe(
        map((tokenMessageResponse: TokenMessageResponse) => {
          return {
            token: tokenMessageResponse.token,
            message: tokenMessageResponse.message,
            done: tokenMessageResponse.done,
          };
        }),
        tap((response) => {
          sessionStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  deleteBlog(blogId: string): Observable<TokenMessageResponse> {
    return this.http
      .delete<TokenMessageResponse>(`${this.baseUrl}/${blogId}`)
      .pipe(
        map((tokenMessageResponse: TokenMessageResponse) => {
          return {
            token: tokenMessageResponse.token,
            message: tokenMessageResponse.message,
            done: tokenMessageResponse.done,
          };
        }),
        tap((response) => {
          sessionStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }
}
