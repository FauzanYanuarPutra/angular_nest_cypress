import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setUser } from './store/actions/uer.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'router-example';

  user$: any = {
    id: 0,
    username: '',
    password: '',
  };

  formBlog: { title: string, description: string, image?: File | null } = { title: '', description: '', image: null };
  imagePreview: string | ArrayBuffer | null = null;

  private userSubscription: Subscription;

  constructor(private store: Store<{ user: number }>, private router: Router) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(setUser({ user: null }));
    this.router.navigate(['/']);
  }
}

