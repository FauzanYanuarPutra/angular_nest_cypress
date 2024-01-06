import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user$: any = {
    id: 0,
    username: '',
    password: '',
  };

  private userSubscription: Subscription;

  constructor(private store: Store<{ user: number }>) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
