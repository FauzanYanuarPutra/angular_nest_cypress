import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { setUser } from '../../../store/actions/uer.actions';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environment/environment';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-create',
  providers: [BlogService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  id: number = 0;
  user$: any = {
    id: 0,
    username: '',
    password: '',
  };
  apiUrl = environment.URL_BACKEND

  formBlog: { id?: number| string, title: string, description: string, image?: File | null } = { title: '', description: '', image: null };
  imagePreview: string | ArrayBuffer | null = null;

  private userSubscription: Subscription;

  constructor(private store: Store<{ user: number }>, private router: Router, private blogService: BlogService, private toastr: ToastrService, private route: ActivatedRoute, private userService: UserService) {
    this.userSubscription = store.select('user').subscribe(user => {
      this.user$ = user;
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id > 0) {
      this.blogService.getBlogById(this.id).subscribe((data: any) => {
        console.log(data, 'asik')
        if (data) {
          data.image = `${this.apiUrl}/${data.image}`
          this.formBlog = data;
          console.log(this.formBlog, 'asik')
        } else {
          this.router.navigate(['/dashboard/create']);
        }
      });

      // if (!this.formBlog.id) {
      //   this.router.navigate(['/dashboard/blog/create']);
      // }
    }
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

    if(this.id > 0) {
      formData.append('id', this.id.toString());
      try {
        this.blogService.update(formData).subscribe((data: any) => {
          this.userService.isAuthenticated();
          this.blogService.getBlogs();

          this.toastr.success('Success', 'Blog updated successfully!', {
            positionClass: 'toast-bottom-left'
          })
          this.router.navigate(['/dashboard']);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.blogService.create(formData).subscribe(data => {
          this.userService.isAuthenticated();
          this.blogService.getBlogs();
          this.toastr.success('Success', 'Blog created successfully!', {
            positionClass: 'toast-bottom-left'
          });
          this.router.navigate(['/dashboard']);
        });
      } catch (error) {
        this.toastr.error('Error', 'Blog not created!', {
          positionClass: 'toast-bottom-left'
        });
        console.log(error, 'asik');
      }
    }

  }
}

