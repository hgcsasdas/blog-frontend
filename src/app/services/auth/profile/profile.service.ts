import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.urlApi + 'users/api/blogs';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserBlogs(user: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${user}`);
  }
}
