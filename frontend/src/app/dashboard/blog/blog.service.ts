import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getBlogs(): Observable<any> {
    return this.httpClient.get(`${environment.URL_BACKEND}/blogs`);
  }

  create(formData: FormData): Observable<any> {
    return this.httpClient.post(`${environment.URL_BACKEND}/blogs`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }
}


