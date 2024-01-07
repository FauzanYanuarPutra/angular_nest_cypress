import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { setBlogs } from '../../store/actions/blogs.actions';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ user: number }>,
  ) { }

  getBlogs(): Observable<any> {
    const data = this.httpClient.get(`${environment.URL_BACKEND}/blogs`);

    data.subscribe(
      data => {
        this.store.dispatch(setBlogs({ blogs: data }));
      }
    )


    return data
  }

  create(formData: FormData): Observable<any> {
    return this.httpClient.post(`${environment.URL_BACKEND}/blogs`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  update(formData: FormData): Observable<any> {
    return this.httpClient.patch(`${environment.URL_BACKEND}/blogs/${formData.get('id')}`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  getBlogById(id: number) {
    return this.httpClient.get(`${environment.URL_BACKEND}/blogs/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.URL_BACKEND}/blogs/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).pipe(
      switchMap(() => this.getBlogs())
    );
  }
}


