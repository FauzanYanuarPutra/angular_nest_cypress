import { Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private registerService: RegisterService
  ) { }

  Register() {
    this.registerService.register(this.form).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
    });
  }
}
