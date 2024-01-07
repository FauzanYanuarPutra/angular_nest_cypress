import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../environment/environment';
import { setUser } from '../store/actions/uer.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store<{ user: number }>, private router: Router) { }

  isAuthenticated(): any {
    const token = localStorage.getItem('token');

    const result = this.http.get<boolean>(`${environment.URL_BACKEND}/auth/check-token`, { headers: { Authorization: `Bearer ${token}` } });


    result.subscribe(data => {
      this.store.dispatch(setUser({ user: data }));
    })
  }
}
