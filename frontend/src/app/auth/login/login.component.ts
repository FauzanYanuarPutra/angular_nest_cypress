import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = {
    username: '',
    password: ''
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  Login() {
    this.loginService.login(this.form).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.access_token);
        this.toastr.success('Success', 'Login successful!', {
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



