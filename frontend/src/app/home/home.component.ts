import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser } from '../store/actions/uer.actions';
import { Subscription } from 'rxjs';
import { environment } from '../environment/environment';
import { BlogService } from '../dashboard/blog/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Perbaikan penulisan styleUrls
})
export class HomeComponent {
  user$: any = 'asik';
  blogs$: any = [];

  private userSubscription: Subscription;
  private blogSubscription: Subscription;

  constructor(private store: Store<{ user: number }>, private blogService: BlogService) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
    this.blogSubscription = blogService.getBlogs().subscribe(blogs => {
      console.log(blogs);
    })
  }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs$ = blogs;
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.blogSubscription.unsubscribe();
  }

  onClick() {
    this.store.dispatch(setUser({ user: { name: 'anjay' } }));
  }
}
