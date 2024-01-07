import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setUser } from '../store/actions/uer.actions';
import { Router } from '@angular/router';
import { BlogService } from './blog/blog.service';
import { environment } from '../environment/environment';
import { setBlogs } from '../store/actions/blogs.actions';
import { UserService } from '../auth/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  providers: [BlogService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  user$: any = {
    id: 0,
    username: '',
    password: '',
  };
  apiUrl = environment.URL_BACKEND;


  formBlog: { title: string, description: string, image?: File | null } = { title: '', description: '', image: null };
  imagePreview: string | ArrayBuffer | null = null;

  private userSubscription: Subscription;

  constructor(private store: Store<{ user: number }>, private router: Router,  private toastr: ToastrService, private blogService: BlogService, private userService: UserService) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


  DeleteBlog(id: number) {
    this.blogService.delete(id).subscribe((data: any) => {
      this.userService.isAuthenticated();
      this.toastr.success('Success', 'Blog deleted successfully!', {
        positionClass: 'toast-bottom-left'
      })
      this.router.navigate(['/dashboard']);
    });
  }

}
