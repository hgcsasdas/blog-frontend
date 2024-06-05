import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.urlApi + 'users/api/blogs';
  private urlHost = environment.urlHost + 'api/v1/user';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http
      .post<any>(`${this.urlHost}/find-user`, {
        usernameToSearch: sessionStorage.getItem('username') || '',
        usernameSearching: sessionStorage.getItem('username') || '',
      })
      .pipe((response) => {
        response.subscribe((data) => {
          sessionStorage.setItem('token', data.token);
          return data.dto;
        });
        return response;
      });
  }

  getUserBlogs(user: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${user}`).pipe((blogs) => {
      return blogs;
    });
  }
}
