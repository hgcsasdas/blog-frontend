import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CommentCUDResponse } from '../responses/CommentCUDResponse';
import { LoginService } from '../auth/login.service';
interface CommentDto {
  author: string;
  content: string;
  token: string;
}

interface CommentUpdateDto {
  content: string;
  author: string;
  blogId: string;
  token: string;

}

interface CommentDeleteDto {
  author: string;
  blogId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = environment.urlApi + 'users/api/blogs/comments';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  addCommentToBlog(
    blogId: string,
    commentDto: CommentDto
  ): Observable<CommentCUDResponse> {


    return this.http
      .post<CommentCUDResponse>(`${this.baseUrl}/${blogId}`, commentDto)
      .pipe(catchError(this.handleError));
  }

  updateComment(
    commentId: string,
    content:string,
    author: string,
    blogId: string,
  ): Observable<CommentCUDResponse> {
    const commentUpdateDto: CommentUpdateDto = {
      content: content,
      author: author,
      blogId: blogId,
      token: sessionStorage.getItem('token') || '',
    };
    return this.http
      .put<CommentCUDResponse>(`${this.baseUrl}/${commentId}`, commentUpdateDto)
      .pipe(catchError(this.handleError));
  }

  deleteComment(
    commentId: string,
    author: string,
    blogId: string
  ): Observable<CommentCUDResponse> {
    const commentDeleteDto: CommentDeleteDto = {
      author: author,
      blogId: blogId,
    };
    return this.http
      .delete<CommentCUDResponse>(`${this.baseUrl}/${commentId}`, {
        body: commentDeleteDto,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
