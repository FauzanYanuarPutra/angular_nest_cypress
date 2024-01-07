import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) { }

    Register() {
    this.registerService.register(this.form).subscribe(
      (data: any) => {
        console.log(data.access_token);
        localStorage.setItem('token', data.access_token);
        console.log(data);
        this.toastr.success('Success', 'Register successful!', {
          positionClass: 'toast-bottom-left'
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 0);
      },
      (error) => {
        this.toastr.error('Error', 'Email Or Password', {
          positionClass: 'toast-bottom-left'
        });
        console.error(error);
      }
    );
  }

}


