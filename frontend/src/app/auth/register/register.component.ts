import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  Register() {
    this.registerService.register(this.form).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
    });
    this.router.navigate(['/dashboard']);
  }
}


