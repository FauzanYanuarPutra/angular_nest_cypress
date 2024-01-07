import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setUser } from '../store/actions/uer.actions';
import { Router } from '@angular/router';
import { BlogService } from './blog/blog.service';

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

  formBlog: { title: string, description: string, image?: File | null } = { title: '', description: '', image: null };
  imagePreview: string | ArrayBuffer | null = null;

  private userSubscription: Subscription;

  constructor(private store: Store<{ user: number }>, private router: Router, private blogService: BlogService) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  Logout() {
    localStorage.removeItem('token');
    this.store.dispatch(setUser({ user: null }));
    this.router.navigate(['/']);
  }


  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.formBlog.image = fileInput.files[0];

      // Display image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.formBlog.image as Blob);
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('title', this.formBlog.title);
    formData.append('description', this.formBlog.description);
    formData.append('image', this.formBlog.image as File);

    try {
      this.blogService.create(formData).subscribe(data => {
        console.log(data, 'asik');
      });
    } catch (error) {
      console.log(error, 'asik');
    }
  }
}
