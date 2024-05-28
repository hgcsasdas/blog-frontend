import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface CommentDto {
  author: string;
  content: string;
}

interface CommentUpdateDto {
  content: string;
}

interface CommentDeleteDto {
  author: string;
}

interface CommentCUDResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = environment.urlApi + 'users/api/blogs/comments';

  constructor(private http: HttpClient) {}

  addCommentToBlog(blogId: string, commentDto: CommentDto): Observable<CommentCUDResponse> {
    console.log('Adding comment:', commentDto);
    console.log('Blog ID:', blogId);

    return this.http.post<CommentCUDResponse>(`${this.baseUrl}/${blogId}`, commentDto).pipe(
      catchError(this.handleError)
    );
  }

  updateComment(commentId: string, commentUpdateDto: CommentUpdateDto): Observable<CommentCUDResponse> {
    return this.http.put<CommentCUDResponse>(`${this.baseUrl}/${commentId}`, commentUpdateDto).pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(commentId: string, commentDeleteDto: CommentDeleteDto): Observable<CommentCUDResponse> {
    return this.http.request<CommentCUDResponse>('delete', `${this.baseUrl}/${commentId}`, { body: commentDeleteDto }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
