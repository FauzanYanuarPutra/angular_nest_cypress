import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser } from '../store/actions/uer.actions';
import { Subscription } from 'rxjs';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Perbaikan penulisan styleUrls
})
export class HomeComponent {
  user$: any = 'asik';

  private userSubscription: Subscription;

  constructor(private store: Store<{ user: number }>) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onClick() {
    this.store.dispatch(setUser({ user: { name: 'anjay' } }));
  }
}
