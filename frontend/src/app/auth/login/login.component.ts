import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private loginService: LoginService
  ) { }

  Login() {
    this.loginService.login(this.form).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
    });
  }
}
