import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Store } from '@ngrx/store';
import { setUser } from '../store/actions/uer.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private store: Store<{ user: number }>, private router: Router) { }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');


    const result = this.http.get<boolean>(`${environment.URL_BACKEND}/auth/check-token`, { headers: { Authorization: `Bearer ${token}` } });

    result.subscribe(data => {
      this.store.dispatch(setUser({ user: data }));
    })


    return result
  }

}
